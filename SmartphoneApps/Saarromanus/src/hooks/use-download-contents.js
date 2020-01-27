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
				// console.log('Successfully Inserted Data Into', tableName);
			},
			err => {
				// console.log(`INSERTION_ERROR: Table Name: ${tableName}`);
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
		// console.log('table:', tableName, 'id:', id);
		DB.transaction(tx => {
			tx.executeSql(
				`SELECT object FROM ${tableName} WHERE id = ? LIMIT 1`,
				// `SELECT object FROM ${tableName}`,
				[id],
				(_, { rows }) => {
					try {
						const data = rows._array[0];
						if (data) {
							// console.log('Date Size:', data.object.length * 4);
							const result = JSON.parse(data.object);
							setStatus(true);
							populate(result);
						} else {
							// console.log('No offline data..');
							setStatus(false);
						}
					} catch (error) {
						setStatus(false);
						// console.log('Data corrupted');
					}
				}
			);
		});
	} catch (error) {
		// console.log('something weired just happend');
	}
}

const downloadFileAsync = async (uri, localPath, fileName) => {
	const fileUri = await FileSystem.downloadAsync(
		uri,
		FileSystem.documentDirectory + localPath + '/' + fileName
	)
		.then(({ uri }) => uri)
		.catch(error => {
			console.error('file downlaod issue', fileName);
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
		// console.log('.');
	}
	try {
		const mappedResourcesPromises = [];
		sight.resources.map(async (resource, ind) => {
			mappedResourcesPromises.push(
				(async () => {
					const localUri = await downloadFileAsync(
						resource.url,
						localPath,
						resource.title || resource.resourceName
					).catch(err => {
						// console.log('something went wrong.')
					});
					return { ...resource, url: localUri };
				})()
			);
		});
		const mappedResources = await Promise.all(mappedResourcesPromises);
		const newSight = { ...sight, resources: mappedResources };
		return newSight;
	} catch (error) {
		// console.log('...');
	}
};

export const mapSightWithoutDownload = sight => {
	const localPath = 'sight-' + sight.id;
	const mappedResources = sight.resources.map((resource, ind) => {
		const fileName = resource.title || resource.resourceName;
		return {
			...resource,
			url:
				FileSystem.documentDirectory +
				localPath +
				'/' +
				encodeURIComponent(fileName),
		};
	});
	// console.log(mappedResources);
	return { ...sight, resources: mappedResources };
};

export const mapSightsWithoutDownload = sightList => {
	const localPath = 'thumbnails';
	const mappedSights = sightList.map((sight, ind) => {
		const fileName = sight.resourceName;
		return {
			...sight,
			thumbnail: fileName
				? FileSystem.documentDirectory +
				  localPath +
				  '/' +
				  encodeURIComponent(fileName)
				: null,
		};
	});
	return mappedSights;
};

const mapSightListAsync = async sightList => {
	const localPath = 'thumbnails';
	try {
		await createLocalFolderAsync(localPath);
	} catch (error) {
		// console.log('.');
	}
	try {
		const mappedSightListPromises = [];
		sightList.map(async (sight, ind) => {
			mappedSightListPromises.push(
				(async () => {
					const localUri = sight.resourceName
						? await downloadFileAsync(
								sight.thumbnail,
								localPath,
								sight.resourceName
						  ).catch(err => {
								// console.log(
								// 	'something went wrong while download the file'
								// )
						  })
						: null;
					return { ...sight, thumbnail: localUri };
				})()
			);
		});
		const mappedSightList = await Promise.all(mappedSightListPromises);
		return mappedSightList;
	} catch (error) {
		// console.log('...');
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

export const storeSightAsync = async (
	sight,
	showLoading = () => {},
	hideLoading = () => {}
) => {
	showLoading();
	const localSight = await mapSightAsync(sight);
	// console.log('localSight', localSight);
	insertNewRow(SIGHT_TABLE, sight.id + '', JSON.stringify(localSight));
	hideLoading();
};

export const storeRouteAsync = async (
	route,
	getSight,
	showLoading = () => {},
	hideLoading = () => {}
) => {
	showLoading();
	const localSights = await mapSightListAsync(route.sights);

	insertNewRow(
		ROUTE_TABLE,
		route.id + '',
		JSON.stringify({ ...route, sights: localSights })
	);
	// console.log('stored route details. Now storing sight details');
	const localSightsPromises = [];
	route.sights.map(sight => {
		localSightsPromises.push(
			(async () => {
				// console.log('Now downlaoding sight:', sight.id, sight.en.name);
				const fullSight = await getSight(sight.id).catch(err => {
					// console.log('Server down')
				});
				await storeSightAsync(fullSight.payload);
				// console.log('Stored in DB');
			})()
		);
	});
	await Promise.all(localSightsPromises);
	hideLoading();
	// console.log('This route is now also available in offline mode');
};
