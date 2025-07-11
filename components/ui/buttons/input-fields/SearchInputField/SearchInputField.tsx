import { Image, TextInput, View } from "react-native";
import images from '../../../../../constants/icons';

interface SearchInputFieldProps {
    onChangeSearch: (search: string) => void,
    search: string
}

const SearchInputField = (
    { onChangeSearch, search }: SearchInputFieldProps) => {

    return (
        <View>
            <TextInput
                onChangeText={onChangeSearch}
                value={search}
                className="bg-[#fff] dark:bg-[#d3a625]/65 mt-[0px] h-[45px] p-[10px] pl-[40px] text-[17px] dark:placeholder:text-[#740001] dark:text-[#740001] rounded-[10px]"
                placeholder='Поиск'
            />
            <Image className="w-[28px] h-[28px] absolute left-[10px] top-[9px]" source={images.search} />
        </View>
    )
}

export default SearchInputField