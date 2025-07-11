import { TextInput } from "react-native"

interface ContentInputFieldProps {
    onChange: (e: string, name: string) => void,
    note: string,
    name: string
}

const ContentInputField = (
    { onChange, note, name }: ContentInputFieldProps) => {

    return (
        <TextInput
            className="bg-[#fff] h-[80.5%] p-[15px] rounded-[10px] text-[20px] text-[#740001] dark:bg-[#d3a625]/65"
            placeholderTextColor={'#740001'}
            placeholder="Заметка..."
            onChangeText={(e) => onChange(e, name)}
            multiline={true}
            numberOfLines={4} value={note} />
    )
}

export default ContentInputField