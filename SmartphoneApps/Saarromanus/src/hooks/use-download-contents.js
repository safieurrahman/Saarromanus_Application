import * as sqlite from 'expo-sqlite';
import * as FileSystem from 'expo-file-system';

export const SIGHT_TABLE = 'sights';
export const ROUTE_TABLE = 'routes';

const DB = sqlite.openDatabase('saarromanus-dev-db', '0.1');

export const createTable = tableName => {
	DB.transaction(tx => {
		tx.executeSql(
			`CREATE TABLE IF NOT EXISTS ${tableName} (id VARCHAR PRIMARY KEY NOT NULL, object TEXT NOT NULL);`
		);
	});
};

const insertNewRow = (tableName, id, object) => {
	DB.transaction(tx => {
		tx.executeSql(
			`INSERT INTO ${tableName} (id, object) VALUES (?, ?)`,
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

export function findOneById(tableName, id, setStatus, populate) {
	try {
		DB.transaction(tx => {
			tx.executeSql(
				`SELECT object FROM ${tableName} WHERE id = ? LIMIT 1`,
				// `SELECT object FROM ${tableName}`,
				[id],
				(_, { rows }) => {
					try {
						const data = rows._array[0];
						// console.log('data:', data);
						if (data) {
							const result = JSON.parse(data.object);
							// console.log('resul:', result);
							setStatus(true);
							populate(result);
						} else {
							setStatus(false);
						}
					} catch (error) {
						console.log('Data corrupted');
					}
				}
			);
		});
	} catch (error) {
		console.log('some shit just happend');
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
					);
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

export const storeSightAsync = async sight => {
	createTable(SIGHT_TABLE);
	const localSight = await mapSightAsync(sight);
	insertNewRow(SIGHT_TABLE, sight.id, JSON.stringify(localSight));
};
