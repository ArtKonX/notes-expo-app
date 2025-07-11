import { Text, TouchableOpacity } from "react-native"

interface SelectActionWithNoteBtnProps {
    showActionMenu: () => void,
    isShowActionMenu: boolean,
    text: string
}

const SelectActionWithNoteBtn = (
    { showActionMenu, isShowActionMenu, text }: SelectActionWithNoteBtnProps) => {

    return (
        <TouchableOpacity
            onPress={showActionMenu}
            activeOpacity={0.7}
            className={`bg-[#AE0001] h-11 rounded-full ${isShowActionMenu ? 'opacity-50' : 'opacity-100'}
                                                }`}
        >
            <Text className={`text-[23px] text-[#D3A625] font-bold text-center`}>
                {text}
            </Text>
        </TouchableOpacity>
    )
}

export default SelectActionWithNoteBtn