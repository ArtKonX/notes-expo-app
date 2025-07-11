import ListActions from "@/components/ListActions/ListActions";
import { TypeStorageContext } from "@/components/TypeStorageContext/TypeStorageContext";
import ContentInputField from "@/components/ui/buttons/input-fields/ContentInputField/ContentInputField";
import TitleInputField from "@/components/ui/buttons/input-fields/TitleInputField/TitleInputField";
import SelectActionWithNoteBtn from "@/components/ui/buttons/SelectActionWithNoteBtn/SelectActionWithNoteBtn";
import DateTimePicker from "@/components/ui/DateTimePicker/DateTimePicker";
// eslint-disable-next-line import/no-unresolved
import { createNote } from "@/notes-storage/NotesStorage";
import { useRouter } from "expo-router";
import { useContext, useState } from "react";
import { ScrollView, Text, View } from "react-native";

interface NoteState {
    title: string,
    note: string,
    date: Date
}

const Create = () => {
    const [note, setNote] = useState<NoteState>({ title: '', note: '', date: new Date() });
    const [isShowActionMenu, setIsShowActionMenu] = useState(false);
    const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
    const [isFadeMenu, setIsFadeMenu] = useState(false);

    const { typeStorage } = useContext(TypeStorageContext);

    const router = useRouter();

    const showDatePicker = () => {
        setIsShowActionMenu(false)
        setIsDatePickerVisible(!isDatePickerVisible);
    };

    const handleDatePick = (date: Date | undefined) => {
        if (date) {
            setNote({ ...note, date: date })
        }
        showDatePicker();
    };

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

    const onSubmit = () => {
        if (note.title.trim() && note.title.trim()) {
            (async () => {
                const createData = await createNote(note.title, note.note, note.date, typeStorage);

                if (createData?.status === 'ok') {
                    setNote({ title: '', note: '', date: new Date() })
                    router.push('/home')
                }
            })()
        }
    }

    const dataActions = [
        {
            id: 1,
            text: 'Сохранить',
            action: 'save',
            actionMethod: onSubmit
        }, {
            id: 2,
            text: 'Дата и время',
            action: 'delate',
            actionMethod: showDatePicker
        }
    ]

    return (
        <View className="bg-[#d0d0c0] dark:bg-[#98988d] h-[100%]">
            <ScrollView
                className="relative px-[15px] mt-[65px]"
                contentContainerStyle={{
                    height: "100%",
                }}
            >
                <View>
                    <Text className='text-start w-full text-4xl font-bold'>
                        Создать заметку
                    </Text>
                    <View className="absolute right-0 top-0 max-w-[40px] w-[45%]">
                        <SelectActionWithNoteBtn showActionMenu={showActionMenu} isShowActionMenu={isShowActionMenu} text='...' />
                        {isShowActionMenu && (
                            <ListActions colorBorder='border-[#AE0001]' dataActions={dataActions} isFadeMenu={isFadeMenu}/>
                        )}
                    </View>
                </View>
                <View className="mt-6">
                    <DateTimePicker isDatePickerVisible={isDatePickerVisible} showDatePicker={showDatePicker} selectedDate={note.date} handleDatePick={handleDatePick} />
                </View>
                <View className="relative">
                    <TitleInputField onChange={onChangeNote} title={note.title} name='title' />
                    <ContentInputField onChange={onChangeNote} note={note.note} name='note' />
                </View>
            </ScrollView>
        </View>
    )
}

export default Create