import * as SQLite from 'expo-sqlite';
import { StateStorage } from 'zustand/middleware';

// Initialize the database synchronously (or handle async init if using newer expo-sqlite versions)
// For expo-sqlite logic, we typically open the database and use transaction methods.
// Note: zustand's persist middleware expects synchronous `getItem`/`setItem` if not using `createJSONStorage` with an async interface.
// However, `createJSONStorage` handles async storages (like AsyncStorage) by returning promises.
// SQLite operations are async.

// We will use the proper async storage interface compatible with Zustand.

let db: SQLite.SQLiteDatabase | null = null;

const getDb = async () => {
    if (!db) {
        db = await SQLite.openDatabaseAsync('auth.db');
        await db.execAsync(`
            CREATE TABLE IF NOT EXISTS kv (
                key TEXT PRIMARY KEY NOT NULL,
                value TEXT
            );
        `);
    }
    return db;
};

export const sqliteStorage: StateStorage = {
    getItem: async (name: string): Promise<string | null> => {
        try {
            const database = await getDb();
            const result = await database.getFirstAsync<{ value: string }>(
                'SELECT value FROM kv WHERE key = ?;',
                [name]
            );
            return result?.value || null;
        } catch (error) {
            console.error('SQLite getItem error:', error);
            return null;
        }
    },
    setItem: async (name: string, value: string): Promise<void> => {
        try {
            const database = await getDb();
            await database.runAsync(
                'INSERT OR REPLACE INTO kv (key, value) VALUES (?, ?);',
                [name, value]
            );
        } catch (error) {
            console.error('SQLite setItem error:', error);
        }
    },
    removeItem: async (name: string): Promise<void> => {
        try {
            const database = await getDb();
            await database.runAsync('DELETE FROM kv WHERE key = ?;', [name]);
        } catch (error) {
            console.error('SQLite removeItem error:', error);
        }
    },
};
