import { Image, ImageSourcePropType, Text, View } from "react-native";

interface TabItemProps {
    color: string,
    name: string,
    icon: ImageSourcePropType
}

const TabItem = ({ color, name, icon }: TabItemProps) => {

    return (
        <View className="w-[70px] absolute top-2 flex items-center">
            <Image
                className="w-[30px] h-[30px]"
                source={icon}
                resizeMode="contain"
                tintColor={color}
            />
            <Text
                style={{ color: color, fontSize: 18 }}
            >
                {name}
            </Text>
        </View>
    );
};

export default TabItem