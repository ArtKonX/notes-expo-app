import { TextInput } from "react-native"

interface TitleInputFieldProps {
    onChange: (e: string, name: string) => void,
    title: string,
    name: string
}

const TitleInputField = (
    { onChange, title, name }: TitleInputFieldProps) => {

    return (
        <TextInput className="bg-[#fff] dark:bg-[#d3a625]/65 h-[55px] p-[15px] rounded-[10px] text-[20px] my-[10px] text-[#740001]" placeholder="Заголовок..." placeholderTextColor={'#740001'} onChangeText={(e) => onChange(e, name)} value={title} />
    )
}

export default TitleInputField