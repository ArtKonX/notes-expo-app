import ListActions from "@/components/ListActions/ListActions";
import { TypeStorageContext } from "@/components/TypeStorageContext/TypeStorageContext";
import ContentInputField from "@/components/ui/buttons/input-fields/ContentInputField/ContentInputField";
import TitleInputField from "@/components/ui/buttons/input-fields/TitleInputField/TitleInputField";
import SelectActionWithNoteBtn from "@/components/ui/buttons/SelectActionWithNoteBtn/SelectActionWithNoteBtn";
import DateTimePicker from "@/components/ui/DateTimePicker/DateTimePicker";
// eslint-disable-next-line import/no-unresolved
import { deleteNote, getNotesOnSearch, updateNote } from "@/notes-storage/NotesStorage";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import { ScrollView, Text, TouchableWithoutFeedback, View } from "react-native";

interface NoteData {
    id: string,
    title: string,
    content: string,
    createdAt: Date
}

const Note = () => {

    const { query } = useLocalSearchParams();

    const [note, setNote] = useState({ id: '0', title: '', note: '', date: new Date() });
    const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
    const [noteData, setNoteData] = useState<NoteData[]>([]);
    const [isShowActionMenu, setIsShowActionMenu] = useState(false);
    const [isFadeMenu, setIsFadeMenu] = useState(false);

    const { typeStorage } = useContext(TypeStorageContext);

    const router = useRouter();

    useEffect(() => {
        const fetchCurrentNote = async () => {
            try {
                const queryTyped = query as string;

                const currentNote = await getNotesOnSearch(queryTyped, typeStorage);

                if (currentNote?.status === 'ok') {
                    setNoteData(currentNote.data || []);
                }
            } catch (err) {
                console.log(err)
            }
        }

        fetchCurrentNote();

    }, [query])

    useEffect(() => {
        setNote({
            id: noteData[0]?.id,
            title: noteData[0]?.title,
            note: noteData[0]?.content,
            date: new Date()
        })
    }, [noteData])

    const onChangeNote = (e: string, name: string) => {
        setNote({ ...note, [name]: e })
    }

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

    const onSaveNote = () => {

        const fetchUpdateNote = async () => {
            try {
                const updateData = await updateNote(note.id, note.title, note.note, note.date, typeStorage);

                if (updateData?.status === 'ok') {
                    showActionMenu()
                    router.push('/home')
                }
            } catch (err) {
                console.log(err)
            }
        }

        fetchUpdateNote();
    }

    const onDelateNote = () => {
        const fetchDelateNote = async () => {
            try {
                const delateData = await deleteNote(note.id, typeStorage);

                if (delateData?.status === 'ok') {
                    showActionMenu()
                    router.push('/home')
                }
            } catch (err) {
                console.log(err)
            }
        }

        fetchDelateNote();
    }

    const showDatePicker = () => {
        setIsShowActionMenu(false)
        setIsDatePickerVisible(!isDatePickerVisible);
    };

    const handleDatePick = (date: Date | undefined) => {
        if (date) {
            setNote({ ...note, date: date })
        }
        showDatePicker()
    };

    const dataActions = [
        {
            id: 1,
            text: 'Сохранить',
            action: 'save',
            actionMethod: onSaveNote
        },
        {
            id: 2,
            text: 'Дата и время',
            action: 'delate',
            actionMethod: showDatePicker
        },
        {
            id: 3,
            text: 'Удалить',
            action: 'delate',
            actionMethod: onDelateNote
        }
    ]

    return (
        <TouchableWithoutFeedback
            style={{ flex: 1 }}
            onPress={() => setIsShowActionMenu(false)}
        >
            <View className="bg-[#d0d0c0] dark:bg-[#98988d] h-[100%]">
                <ScrollView
                    contentContainerStyle={{
                        height: "92%",
                    }}
                >
                    <View className="mt-[70px] px-[15px]">
                        <View className="w-[100%]">
                            <View className="flex flex-row justify-between items-start">
                                <Link href={'/home'} className="bg-[#AE0001] px-3 pt-2 c rounded-xl max-w-[20%] mb-3">
                                    <Text className={`text-5xl text-[#D3A625] font-bold flex items-center w-full h-full`}>
                                        ☜
                                    </Text>
                                </Link>
                                <Text className='text-start text-3xl font-bold'>
                                    Изменить заметку
                                </Text>
                                <View className="max-w-[40px] w-[100%]">
                                    <SelectActionWithNoteBtn showActionMenu={showActionMenu} isShowActionMenu={isShowActionMenu} text='...' />
                                    {isShowActionMenu && (
                                        <ListActions colorBorder='border-[#AE0001]' dataActions={dataActions} isFadeMenu={isFadeMenu} />
                                    )}
                                </View>
                            </View>
                        </View>
                        <View className="mt-6">
                            <DateTimePicker isDatePickerVisible={isDatePickerVisible} showDatePicker={showDatePicker} selectedDate={note.date} handleDatePick={handleDatePick} />
                        </View>
                    </View>
                    <View className="px-[15px]">
                        <TitleInputField onChange={onChangeNote} title={note.title} name='title' />
                        <ContentInputField onChange={onChangeNote} note={note.note} name='note' />
                    </View>
                </ScrollView>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default Note