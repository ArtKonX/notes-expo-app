import { usePathname } from 'expo-router';
import { useContext, useEffect, useState } from 'react';
import { Text, TouchableWithoutFeedback, View } from "react-native";

import ListActions from '@/components/ListActions/ListActions';
import ListNotes from '@/components/ListNotes/ListNotes';
import { TypeStorageContext } from '@/components/TypeStorageContext/TypeStorageContext';
import SearchInputField from '@/components/ui/buttons/input-fields/SearchInputField/SearchInputField';
import SaveSelectStorageBtn from '@/components/ui/buttons/SaveSelectStorageBtn/SaveSelectStorageBtn';
import useDebounce from '@/hooks/useDebounce';
import {
  getAllNotes, getNotesOnSearch,
  initializeStorage
} from '../../notes-storage/NotesStorage';

interface NoteData {
  id: string,
  title: string,
  content: string,
  createdAt: Date
}

export default function Notes() {
  const href = usePathname();
  const [search, setSearch] = useState('');
  const [notes, setNotes] = useState<NoteData[]>([]);
  const [createRender, setCreateRender] = useState(false);
  const [isShowActionMenu, setIsShowActionMenu] = useState(false);
  const [isFadeNotes, setIsFadeNotes] = useState(false);
  const [isFadeMenu, setIsFadeMenu] = useState(false);

  const valueState = useDebounce(search, 400);

  const { typeStorage, setTypeStorage } = useContext(TypeStorageContext);

  const onChangeSearch = (e: string) => {
    setSearch(e);
  };

  useEffect(() => {
    const fetchNotesOnSearch = async () => {
      try {
        setIsFadeNotes(true)
        const notesOnSearchData = await getNotesOnSearch(valueState, typeStorage);

        if (notesOnSearchData?.status === 'ok') {
          setNotes(notesOnSearchData.data || []);
          setTimeout(() => {
            setIsFadeNotes(false)
          }, 500)
        }
      } catch (err) {
        console.log(err)
      }
    }

    fetchNotesOnSearch()
  }, [valueState])

  useEffect(() => {
    if (href.includes('/home')) {
      setCreateRender(!createRender)
    }
  }, [href])

  useEffect(() => {
    const fetchInitStorage = async () => {
      try {
        const init = await initializeStorage(typeStorage);

        if (init?.status === 'ok') {
          console.log(init.message)
        }
      } catch (err) {
        console.log(err)
      }
    }

    fetchInitStorage();
  }, [typeStorage]);

  useEffect(() => {
    const fetchAllNotes = async () => {
      setIsFadeNotes(true)
      const allNotes = await getAllNotes(typeStorage);
      if (allNotes?.status === 'ok') {
        setNotes(allNotes.data || []);
        setTimeout(() => {
          setIsFadeNotes(false)
        }, 500)
      }
    }

    const fetchAllNotesOnSearch = async () => {
      const notesSearch = await getNotesOnSearch(valueState, typeStorage);

      if (notesSearch?.status === 'ok') {
        setNotes(notesSearch.data || []);
        setTimeout(() => {
          setIsFadeNotes(false)
        }, 500)
      }
    }

    fetchAllNotes();

    if (search.trim()) {
      fetchAllNotesOnSearch()
    }
  }, [href, typeStorage]);

  const showActionMenu = () => {
    if (isShowActionMenu) {
      setIsFadeMenu(false)
      setTimeout(() => {
        setIsShowActionMenu(false)
        setIsFadeMenu(true)
      }, 200)
    }

    if (!isShowActionMenu) {
      setIsFadeMenu(false)
      setIsShowActionMenu(true)
      setTimeout(() => {
        setIsFadeMenu(true)
      }, 200)
    }
  }

  const dataSave = [
    {
      id: 1,
      text: 'AsyncStorage',
      action: 'local',
      isActive: typeStorage === 'local'
    }, {
      id: 2,
      text: 'SQLite',
      action: 'sqlite',
      isActive: typeStorage === 'sqlite'
    }, {
      id: 3,
      text: 'В Файлах',
      action: 'files',
      isActive: typeStorage === 'files'
    }
  ]

  return (
    <TouchableWithoutFeedback
      style={{ flex: 1 }}
      onPress={() => setIsShowActionMenu(false)} >
      <View className='bg-[#d0d0c0] dark:bg-[#98988d]'>
        <View className='mx-[12px] py-[65px]'>
          <View className="flex w-full flex-row justify-between relative mb-[10px]">
            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Заметки</Text>
            <SaveSelectStorageBtn showActionMenu={showActionMenu} isShowActionMenu={isShowActionMenu} text='💾' />
            {isShowActionMenu && (
              <ListActions colorBorder='black' action={setTypeStorage} dataActions={dataSave} isFadeMenu={isFadeMenu} />
            )}
          </View>
          <SearchInputField onChangeSearch={onChangeSearch} search={search} />
          <View style={{ marginBlockStart: 0 }}>
            <Text className='text-2xl mt-5 mb-5 text-black font-bold'>
              {notes.length === 0 ? `Список заметок пуст...`
                : `Всего заметок: ${notes.length}`}
            </Text>
            <View className={`${isFadeNotes ? 'opacity-0' : 'opacity-100'} transition-opacity duration-50`}>
              <ListNotes dataNotes={notes} />
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}