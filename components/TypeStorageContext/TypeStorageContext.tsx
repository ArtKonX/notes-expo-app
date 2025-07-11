import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useState, useEffect, ReactNode } from 'react';

interface TypeStorageProviderProps {
    children: ReactNode
}

type TypeStorage = 'local' | 'sqlite' | 'files'

interface TypeStorageContextType {
    typeStorage: TypeStorage | null | string | undefined;
    setTypeStorage: React.Dispatch<React.SetStateAction<TypeStorage | null | string | undefined>>;
}

export const TypeStorageContext = createContext<TypeStorageContextType>({ typeStorage: null, setTypeStorage: () => { } });

export const TypeStorageProvider = ({ children }: TypeStorageProviderProps) => {

    const [typeStorage, setTypeStorage] = useState<TypeStorage | null | string | undefined>(null)

    useEffect(() => {
        const fetchGetStorageType = async () => {
            try {
                // Удаление из LS типа сохранений
                // await AsyncStorage.removeItem('storageType')

                const type = await AsyncStorage.getItem('storageType') as TypeStorage;

                if (type) {
                    setTypeStorage(type)
                }
            } catch (err) {
                console.error(err)
            }
        }

        fetchGetStorageType()

    }, []);

    useEffect(() => {
        const fetchSetStorageType = async () => {
            try {
                if (typeStorage) {
                    await AsyncStorage.setItem('storageType', typeStorage);
                }

            } catch (err) {
                console.error(err)
            }
        }

        fetchSetStorageType()
    }, [typeStorage, setTypeStorage])

    return (
        <TypeStorageContext.Provider
            value={{
                typeStorage,
                setTypeStorage
            }}
        >
            {children}
        </TypeStorageContext.Provider>
    );
};