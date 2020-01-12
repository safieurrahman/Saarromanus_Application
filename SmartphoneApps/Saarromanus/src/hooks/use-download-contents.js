import * as sqlite from 'expo-sqlite';
import * as FileSystem from 'expo-file-system';

export const SIGHT_TABLE = 'sights';
export const SIGHT_CATEGORIES_TABLE = 'sight_categories';
export const SIGHTS_BY_CATEGORY_TABLE = 'sights_by_category';
export const SIGHT_LIST_TABLE = 'sight_list';
export const ROUTE_TABLE = 'routes';
export const ROUTE_LIST_TABLE = 'route_list';

const DB = sqlite.openDatabase('saarromanus-dev-db', '0.1');

export const createTable = tableName => {
	DB.transaction(tx => {
		tx.executeSql(
			`CREATE TABLE IF NOT EXISTS ${tableName} (id VARCHAR PRIMARY KEY NOT NULL, object TEXT NOT NULL);`
		);
	});
};

export const insertNewRow = (tableName, id, object) => {
	DB.transaction(tx => {
		tx.executeSql(
			`INSERT OR REPLACE INTO ${tableName} (id, object) VALUES (?, ?)`,
			[id, object],
			() => {
				console.log('Successfully Inserted Data Into', tableName);
			},
			err => {
				console.log(`INSERTION_ERROR: Table Name: ${tableName}`);
			}
		);
	});
};

export function findOneById(
	tableName,
	id,
	setStatus = () => {},
	populate = () => {}
) {
	try {
		DB.transaction(tx => {
			tx.executeSql(
				`SELECT object FROM ${tableName} WHERE id = ? LIMIT 1`,
				// `SELECT object FROM ${tableName}`,
				[id],
				(_, { rows }) => {
					try {
						const data = rows._array[0];
						if (data) {
							const result = JSON.parse(data.object);
							// console.log('resul:', result);
							setStatus(true);
							populate(result);
						} else {
							console.log('no data..');
							setStatus(false);
						}
					} catch (error) {
						setStatus(false);
						console.log('Data corrupted');
					}
				}
			);
		});
	} catch (error) {
		console.log('something weired just happend');
	}
}

const downloadFileAsync = async (uri, localPath, ind) => {
	const pos = uri.lastIndexOf('/') + 1;
	const fileName = uri.substring(pos);
	const fileUri = await FileSystem.downloadAsync(
		uri,
		FileSystem.documentDirectory + localPath + '/' + ind + fileName
	)
		.then(({ uri }) => uri)
		.catch(error => {
			console.error(error);
		});
	return fileUri;
};

const createLocalFolderAsync = async localPath => {
	await FileSystem.makeDirectoryAsync(
		FileSystem.documentDirectory + localPath
	);
};

const mapSightAsync = async sight => {
	const localPath = 'sight-' + sight.id;
	try {
		await createLocalFolderAsync(localPath);
	} catch (error) {
		console.log('Could not create folder, probably already exists.');
	}
	try {
		const mappedResourcesPromises = [];
		sight.resources.map(async (resource, ind) => {
			mappedResourcesPromises.push(
				(async () => {
					const localUri = await downloadFileAsync(
						resource.url,
						localPath,
						ind
					).catch(err => console.log('something went wrong.'));
					return { ...resource, url: localUri };
				})()
			);
		});
		const mappedResources = await Promise.all(mappedResourcesPromises);
		const newSight = { ...sight, resources: mappedResources };
		return newSight;
	} catch (error) {
		console.log(
			"Could not download the resources. This sight is probably already downloaded.\nIf that's not the case, remove Saarromanus App cache and the try to download again."
		);
	}
};

export const mapSightsWithoutDownload = sightList => {
	const localPath = 'thumbnails';
	const mappedSights = sightList.map((sight, ind) => {
		const pos = sight.thumbnail.lastIndexOf('/') + 1;
		const fileName = sight.thumbnail.substring(pos);
		return {
			...sight,
			thumbnail:
				FileSystem.documentDirectory + localPath + '/' + ind + fileName,
		};
	});
	return mappedSights;
};

const mapSightListAsync = async sightList => {
	const localPath = 'thumbnails';
	try {
		await createLocalFolderAsync(localPath);
	} catch (error) {
		console.log('Could not create folder, probably already exists.');
	}
	try {
		const mappedSightListPromises = [];
		sightList.map(async (sight, ind) => {
			mappedSightListPromises.push(
				(async () => {
					const localUri = await downloadFileAsync(
						sight.thumbnail,
						localPath,
						ind
					).catch(err => console.log('something went wrong.'));
					return { ...sight, thumbnail: localUri };
				})()
			);
		});
		const mappedSightList = await Promise.all(mappedSightListPromises);
		return mappedSightList;
	} catch (error) {
		console.log(
			"Could not download the resources. This sight is probably already downloaded.\nIf that's not the case, remove Saarromanus App cache and the try to download again."
		);
	}
};

export const storeSightsByCategoryAsync = async (
	categoryId,
	sights,
	populateSights
) => {
	const localSights = await mapSightListAsync(sights);
	// console.log('local sights', localSights);
	insertNewRow(
		SIGHTS_BY_CATEGORY_TABLE,
		categoryId,
		JSON.stringify(localSights)
	);
	populateSights(localSights);
};

export const storeSightAsync = async sight => {
	const localSight = await mapSightAsync(sight);
	insertNewRow(SIGHT_TABLE, sight.id, JSON.stringify(localSight));
};
