import * as FileSystem from 'expo-file-system';
import uuid from 'react-native-uuid';

interface NoteData {
    id: string;
    title: string;
    content: string;
    createdAt: Date;
}

const NOTES_DIRECTORY = FileSystem.documentDirectory + 'notes/';

export const initFS = async () => {
    try {

        const directoryNotes = await FileSystem.getInfoAsync(NOTES_DIRECTORY);

        if (!directoryNotes.isDirectory) {
            await FileSystem.makeDirectoryAsync(NOTES_DIRECTORY, { intermediates: true });
            console.log('Директория создана');
        }

        console.log('Успешная инициализация файловой системы');

        return {
            status: 'ok',
            message: 'Успешная инициализация файловой системы'
        };
    } catch (err) {
        console.error('Ошибка инициализации файловой системы', err);
    }
};

export const createNoteFS = async (title: string, content: string, date: Date) => {
    try {

        const directoryNotes = await FileSystem.getInfoAsync(NOTES_DIRECTORY);

        if (directoryNotes.isDirectory) {
            const noteId = uuid.v4();

            const notePath = `${NOTES_DIRECTORY}${noteId}.json`;

            const note = {
                id: noteId,
                title,
                content,
                createdAt: date
            };

            await FileSystem.writeAsStringAsync(notePath, JSON.stringify(note));

            console.log('Успешное создание заметки');
            return {
                status: 'ok',
                message: 'Успешное создание заметки'
            };
        }

    } catch (err) {
        console.error('Ошибка создания заметки', err);
    }
};

export const getNotesFS = async () => {
    try {

        const directoryNotes = await FileSystem.getInfoAsync(NOTES_DIRECTORY);

        if (directoryNotes.isDirectory) {
            const filesPaths = await FileSystem.readDirectoryAsync(NOTES_DIRECTORY);
            const notes = [] as NoteData[];

            for (const filePath of filesPaths) {
                const fullPathFile = `${NOTES_DIRECTORY}${filePath}`;

                if (filePath.endsWith('.json')) {
                    try {
                        const noteContent = await FileSystem.readAsStringAsync(fullPathFile);
                        const note = JSON.parse(noteContent);
                        notes.push(note);
                    } catch (error) {
                        console.error(`Ошибка чтения файла ${filePath}:`, error);
                    }
                }
            }

            const sortedNotes = notes.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

            return {
                status: 'ok',
                data: sortedNotes,
                message: 'Успешное получение всех заметок'
            };
        }

    } catch (err) {
        console.error('Ошибка получения заметок', err);
    }
};

export const getNotesOnSearchFS = async (search: string) => {
    try {

        const directoryNotes = await FileSystem.getInfoAsync(NOTES_DIRECTORY);

        if (directoryNotes.isDirectory) {

            const filePaths = await FileSystem.readDirectoryAsync(NOTES_DIRECTORY);
            const filterNotes = [] as NoteData[];

            for (const filePath of filePaths) {
                const fullPath = `${NOTES_DIRECTORY}${filePath}`;

                if (filePath.endsWith('.json')) {
                    try {
                        const noteContent = await FileSystem.readAsStringAsync(fullPath);
                        const note = JSON.parse(noteContent);

                        if (
                            note.id === search ||
                            note.title.includes(search) ||
                            note.content.includes(search) ||
                            note.createdAt.includes(search)
                        ) {
                            filterNotes.push(note);
                        }
                    } catch (error) {
                        console.error(`Ошибка чтения файла ${filePath}:`, error);
                    }
                }
            }

            return {
                status: 'ok',
                data: filterNotes,
                message: 'Успешное получение заметок по запросу'
            };
        }
    } catch (err) {
        console.error('Ошибка поиска заметок', err);
    }
};

export const updateNoteFS = async (id: string, title: string, content: string, date: Date) => {
    try {

        const directoryNotes = await FileSystem.getInfoAsync(NOTES_DIRECTORY);

        if (directoryNotes.isDirectory) {

            const filePath = `${NOTES_DIRECTORY}${id}.json`;

            const noteContent = await FileSystem.readAsStringAsync(filePath);
            const note = JSON.parse(noteContent);

            const updatedNote: NoteData = {
                id: note.id,
                title: title,
                content: content,
                createdAt: date
            };

            await FileSystem.writeAsStringAsync(filePath, JSON.stringify(updatedNote));

            console.log('Успешное изменение заметки');
            return {
                status: 'ok',
                message: 'Успешное изменение заметки'
            };
        }
    } catch (err) {
        console.error('Ошибка изменение заметки', err);
    }
};

export const deleteNoteFS = async (id: string) => {
    try {

        const directoryNotes = await FileSystem.getInfoAsync(NOTES_DIRECTORY);

        if (directoryNotes.isDirectory) {

            const filePath = `${NOTES_DIRECTORY}${id}.json`;

            await FileSystem.deleteAsync(filePath);

            console.log('Успешное удаление заметки');

            return {
                status: 'ok',
                message: 'Успешное удаление заметки'
            };
        }
    } catch (err) {
        console.error('Ошибка удаления заметки', err);
    }
};