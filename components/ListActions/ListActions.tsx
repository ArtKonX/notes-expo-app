
import { View } from "react-native"
import ItemActions from "./ItemActions/ItemActions"

interface DataAction {
    id: number;
    text: string;
    action?: string;
    isActive?: boolean;
    actionMethod?: () => void
}

interface ListActionsProps<T> {
    colorBorder: string;
    action?: (action: T | string) => void;
    dataActions: DataAction[];
    isFadeMenu: boolean
}

const ListActions = <T,>(
    { colorBorder, action, dataActions, isFadeMenu }: ListActionsProps<T>) => {

    return (
        <View className={`border-[2px] dark:bg-[#d3a625] ${colorBorder} w-[200px] z-20 absolute bg-white rounded-xl right-0 top-[45px] ${isFadeMenu ? 'opacity-100' : 'opacity-0'} transition-opacity duration-900`}>
            {dataActions.map(actionData => (
                <ItemActions colorBorder={colorBorder} text={actionData.text} action={action} actionText={actionData.action} key={actionData.id} actionMethod={actionData.actionMethod} isLast={actionData.id === dataActions.length} isActive={actionData.isActive} />
            ))}
        </View>
    )
}

export default ListActions