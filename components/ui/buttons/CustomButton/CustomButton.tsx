import { ActivityIndicator, Text, TouchableOpacity } from "react-native"

interface CustomButtonProps {
    text: string,
    isLoading:  boolean,
    handlePress: () => void
}

const CustomButton = ({ text, isLoading, handlePress }: CustomButtonProps) => {


    return (
        <TouchableOpacity
            onPress={handlePress}
            activeOpacity={0.7}
            className={`bg-[#AE0001] p-3 rounded-xl ${isLoading ? "opacity-50" : ""
                }`}
            disabled={isLoading}
        >
            <Text className={`text-[23px] text-[#D3A625] font-bold`}>
                {text}
            </Text>

            {isLoading && (
                <ActivityIndicator
                    animating={isLoading}
                    color="#fff"
                    size="small"
                    className="ml-2"
                />
            )}
        </TouchableOpacity>
    )
}

export default CustomButton