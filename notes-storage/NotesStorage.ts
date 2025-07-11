import { createNoteLS, deleteNoteLS, getNotesLS, getNotesOnSearchLS, initLS, updateNoteLS } from '@/local-storage/localStorage';
import { initDB, createNoteDB, getNotesDB, getNotesFromSearchDB, updateNoteDB, deleteNoteDB } from '../db/db';
import { createNoteFS, deleteNoteFS, getNotesFS, getNotesOnSearchFS, initFS, updateNoteFS } from '@/local-files/localFiles';

type TypeStorage = string | null | undefined

export const initializeStorage = async (typeStorage: TypeStorage) => {
    if (typeStorage === 'sqlite') {
        return await initDB();
    } else if (typeStorage === 'files') {
        return await initFS()
    }
    else {
        return await initLS();
    }
};

export const createNote = async (title: string, content: string, date: Date, typeStorage: TypeStorage) => {
    if (typeStorage === 'sqlite') {
        return await createNoteDB(title, content, date);
    } else if (typeStorage === 'files') {
        return await createNoteFS(title, content, date)
    }
    else {
        return await createNoteLS(title, content, date)
    }
};

export const getAllNotes = async (typeStorage: TypeStorage) => {
    if (typeStorage === 'sqlite') {
        return await getNotesDB();
    } else if (typeStorage === 'files') {
        return await getNotesFS()
    }
    else {
        return await getNotesLS();
    }
}

export const getNotesOnSearch = async (search: string, typeStorage: TypeStorage) => {
    if (typeStorage === 'sqlite') {
        return await getNotesFromSearchDB(search);
    } else if (typeStorage === 'files') {
        return await getNotesOnSearchFS(search)
    }
    else {
        return await getNotesOnSearchLS(search)
    }
}

export const updateNote = async (id: string, title: string, content: string, date: Date, typeStorage: TypeStorage) => {
    if (typeStorage === 'sqlite') {
        console.log(true, id, title, content)
        return await updateNoteDB(id, title, content, date);
    } else if (typeStorage === 'files') {
        return await updateNoteFS(id, title, content, date)
    }
    else {
        return await updateNoteLS(id, title, content, date)
    }
}

export const deleteNote = async (id: string, typeStorage: TypeStorage) => {
    if (typeStorage === 'sqlite') {
        return await deleteNoteDB(id);
    } else if (typeStorage === 'files') {
        return await deleteNoteFS(id)
    }
    else {
        return await deleteNoteLS(id)
    }
}