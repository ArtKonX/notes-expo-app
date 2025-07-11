import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from 'react-native-uuid';

interface NoteData {
    id: string,
    title: string,
    content: string,
    createdAt: Date
}

export const initLS = async () => {

    try {
        const notes = await AsyncStorage.getItem('notes');

        if (notes) {
            console.log('Успешная иницилизация localStorage')

            return {
                status: 'ok',
                message: 'Успешная иницилизация localStorage'
            }
        }

        await AsyncStorage.setItem('notes', JSON.stringify([]));

        console.log('Успешная иницилизация localStorage')

        return {
            status: 'ok',
            message: 'Успешная иницилизация localStorage'
        }
    } catch (err) {
        console.log('Ошибка иницилизации localStorage ', err)
    }
}

export const createNoteLS = async (title: string, content: string, date: Date) => {

    try {
        const notes = await AsyncStorage.getItem('notes');

        if (notes) {
            const notesJS = JSON.parse(notes);

            const note = {
                id: uuid.v4(),
                title: title,
                content: content,
                createdAt: date
            }

            notesJS.push(note);

            await AsyncStorage.setItem('notes', JSON.stringify(notesJS))

            console.log('Успешное создание заметки')

            return {
                status: 'ok',
                message: 'Успешное создание заметки'
            }
        }
    } catch (err) {
        console.log('Ошибка создания заметки ', err)
    }
}

export const getNotesLS = async () => {
    try {
        const notes = await AsyncStorage.getItem('notes');

        if (notes) {
            const notesJS = JSON.parse(notes) as NoteData[];
            const sortedNotes = notesJS.sort((a, b) => (new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()))

            return {
                status: 'ok',
                data: sortedNotes,
                message: 'Успешное получение всех заметок'
            }
        }
    } catch (err) {
        console.log('Ошибка получения заметок ', err)
    }
}

export const getNotesOnSearchLS = async (search: string) => {
    try {
        const notes = await AsyncStorage.getItem('notes');

        if (notes) {
            const notesJS = JSON.parse(notes) as NoteData[];

            const filterNotes = notesJS.filter(note => (note.id === search) || (note.title).includes(search) ||
                (note.content).includes(search) ||
                (String(note.createdAt)).includes(search));

            if (filterNotes) {
                return {
                    status: 'ok',
                    data: filterNotes,
                    message: 'Успешное получение всех заметок по запросу'
                }
            }

        }

    } catch (err) {
        console.log('Ошибка получения записей по запросу ', err)
    }
}

export const updateNoteLS = async (id: string, title: string, content: string, date: Date) => {
    try {
        const notes = await AsyncStorage.getItem('notes');
        if (notes) {
            const notesJS = JSON.parse(notes) as NoteData[];

            const noteIndx = notesJS.findIndex(note => (note.id === id));

            notesJS[noteIndx] = { ...notesJS[noteIndx], title: title, content: content, createdAt: date };

            await AsyncStorage.setItem('notes', JSON.stringify(notesJS));

            return {
                status: 'ok',
                message: 'Успешное изменение заметки'
            }
        }
    } catch (err) {
        console.log('Ошибка изменения записи ', err)
    }
}

export const deleteNoteLS = async (id: string) => {
    try {
        const notes = await AsyncStorage.getItem('notes');
        if (notes) {
            const notesJS = JSON.parse(notes) as NoteData[];

            const filteredNoted = notesJS.filter(note => note.id !== id);

            await AsyncStorage.setItem('notes', JSON.stringify(filteredNoted));

            return {
                status: 'ok',
                message: 'Успешное удаление заметки'
            }
        }
    } catch (err) {
        console.log('Ошибка удаления записи ', err)
    }
}