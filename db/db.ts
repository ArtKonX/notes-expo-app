import * as SQLite from 'expo-sqlite';

interface NoteData {
    id: string,
    title: string,
    content: string,
    createdAt: Date
}

const dbPromise = SQLite.openDatabaseAsync('notes.db');

export const initDB = async () => {
    const db = await dbPromise;

    try {

        // Для удаления всех заметок из SQLite
        // await db.runAsync('DELETE FROM notes;')

        await db.execAsync(`
            PRAGMA journal_mode = WAL;
            CREATE TABLE IF NOT EXISTS notes (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT,
                content TEXT,
                createdAt TIMESTAMP
            );
        `);

        console.log('Иницилизация БД прошла успешно!')

        return {
            status: 'ok',
            message: 'Иницилизация БД прошла успешно!'
        }

    } catch (error) {
        console.error('Ошибка инициализации БД:', error);
    }
};

export const createNoteDB = async (title: string, node: string, date: Date) => {
    const db = await dbPromise;

    try {
        const addedNote = await db.runAsync(`INSERT INTO notes (title, content, createdAt)
            VALUES (?, ?, ?);`, [title, node, String(date)]);


        if (addedNote) {
            console.log('Успешное добавление заметки в БД!', addedNote)

            return {
                status: 'ok',
                message: 'Успешное добавление заметки в БД!'
            }
        }

    } catch (error) {
        console.error('Ошибка добавления заметки:', error);
    }
};

export const getNotesDB = async () => {
    const db = await dbPromise;

    try {
        const allNotes = await db.getAllAsync(
            'SELECT * FROM notes ORDER BY createdAt DESC'
        );

        if (allNotes) {
            console.log('Успешное получение заметок!')

            return {
                data: allNotes as NoteData[],
                status: 'ok',
                message: 'Успешное получение заметок!'
            }
        }

    } catch (error) {
        console.error('Ошибка получения заметок:', error);
    }
};

export const getNotesFromSearchDB = async (searchQuery: string) => {
    const db = await dbPromise;
    try {
        const allRowsFromSearch = await db.getAllAsync(
            `SELECT * FROM notes
             WHERE id LIKE ?
             OR title LIKE ?
             OR content LIKE ?
             OR createdAt LIKE ?
             ORDER BY createdAt DESC;`,
            [`%${searchQuery}%`, `%${searchQuery}%`, `%${searchQuery}%`, `%${searchQuery}%`]
        );

        if (allRowsFromSearch) {

            console.log('Успешное получение заметок по запросу!')

            return {
                data: allRowsFromSearch as NoteData[],
                status: 'ok',
                message: 'Успешное получение заметок по запросу!'
            }
        }

    } catch (error) {
        console.error('Ошибка поиска заметок:', error);
    }
};

export const updateNoteDB = async (id: string, title: string, content: string, date: Date) => {
    const db = await dbPromise;
    try {
        const updatedNote = await db.runAsync(
            'UPDATE notes SET title = ?, content = ?, createdAt = ? WHERE id = ?;',
            [title, content, String(date), id]
        );

        if (updatedNote) {
            console.log('Успешное изменение заметки!')

            return {
                status: 'ok',
                message: 'Успешное изменение заметки!'
            }
        }

    } catch (error) {
        console.error('Ошибка обновления заметки:', error);
    }
};

export const deleteNoteDB = async (id: string) => {
    const db = await dbPromise;

    try {
        const delatedNote = await db.runAsync(
            'DELETE FROM notes WHERE id = ?;',
            [id]
        );

        if (delatedNote) {
            console.log('Успешное удаление заметки!')

            return {
                status: 'ok',
                message: 'Успешное удаление заметки!'
            }
        }
    } catch (error) {
        console.error('Ошибка удаления заметки:', error);
    }
};