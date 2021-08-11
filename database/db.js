import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('userGeo.db');

// Initialisation
export const sqliteInit = () => {
    const initPromise = new Promise((resolve, reject) => {
        // tx.executeSql(sqlStatement, arguments, success, error)
        db.transaction(tx => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS userGeo (id INTEGER KEY NOT NULL, latitude REAL NOT NULL, longitude REAL NOT NULL);',
                [],
                () => {
                    resolve();
                },
                (_, error) => {
                    reject(error)
                }
            );
        });
    });

    return initPromise;
}

// Enregistrer les datas de géolocalisation
export const addUserGeo = (latitude, longitude) => {
    const insertPromise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'INSERT INTO userGeo (latitude, longitude) VALUES (?, ?)',
                [latitude, longitude],
                (_, result) => {
                    resolve(result);
                },
                (_, error) => {
                    reject(error)
                }
            );
        });
    });

    return insertPromise;
}

// récupérer la data
export const fetchInSQLite = () => {
    const fetchedPromise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM userGeo',
                [],
                (_, result) => {
                    resolve(result);
                },
                (_, error) => {
                    reject(error)
                }
            );
        });
    });

    return fetchedPromise;
}
