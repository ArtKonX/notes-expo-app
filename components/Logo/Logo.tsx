import { Text, View } from "react-native"

const Logo = () => {

    return (
        <View className="w-70 px-4 h-[75px] flex items-center
        justify-center bg-[#AE0001] rounded-xl"
        >
            <Text className="text-5xl mt-1.5 font-300 text-[#d0d0c0]">
                Magic<Text className="text-[#D3A625] font-bold">Notes</Text>
            </Text>
        </View>
    )
}

export default Logo