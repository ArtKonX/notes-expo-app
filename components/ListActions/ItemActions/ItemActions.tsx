import { Text, TouchableOpacity } from "react-native"

interface ItemActionsProps<T> {
    colorBorder: string,
    text: string;
    action?: (action: string) => void;
    actionText?: string;
    actionMethod?: () => void,
    isLast: boolean,
    isActive?: boolean
}

const ItemActions = <T,>(
    { colorBorder, text, actionText, actionMethod, isLast, isActive, action }: ItemActionsProps<T>) => {

    return (
        <TouchableOpacity
            onPress={() => action && actionText ? action(actionText) : actionMethod && actionMethod()}
            activeOpacity={0.7}
            className={`w-full py-3 border-b-2 ${colorBorder} ${isLast && 'border-b-transparent'}`}
        >
            <Text className={`${isActive && 'opacity-20'} text-[18px] text-[#740001] font-bold text-center`}>
                {text}
            </Text>
        </TouchableOpacity>
    )
}

export default ItemActions