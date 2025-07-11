import { Text, TouchableOpacity } from "react-native"

interface SaveSelectStorageBtnProps {
    showActionMenu: () => void,
    isShowActionMenu: boolean,
    text: string
}

const SaveSelectStorageBtn = (
    { showActionMenu, isShowActionMenu, text }: SaveSelectStorageBtnProps) => {

    return (
        <TouchableOpacity
            onPress={showActionMenu}
            activeOpacity={0.7}
            className={`bg-white dark:bg-[#d3a625]/65 border-2 border-black h-11 w-11 rounded-full ${isShowActionMenu ? 'opacity-50' : 'opacity-100'}
                                                        }`}
        >
            <Text className={`text-[23px] mt-[3.5px] ml-0.5 text-[#D3A625] font-bold text-center`}>
                {text}
            </Text>
        </TouchableOpacity>
    )
}

export default SaveSelectStorageBtn