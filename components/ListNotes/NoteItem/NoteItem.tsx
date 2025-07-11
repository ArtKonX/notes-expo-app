import { Link } from "expo-router"
import { Text, View } from "react-native"

interface NoteItemData {
    id: string,
    title: string,
    content: string,
    createdAt: Date
}

const NoteItem = (
    { id, title, content, createdAt }: NoteItemData) => {

    return (
        <Link href={`/note/${id}`} className='bg-[#d3a625]/65 my-[8px] p-[13px] rounded-[15px]'>
            <View>
                <Text className='text-black' style={{ fontWeight: 'bold', fontSize: 18, display: 'flex' }}>{title}</Text>
                <View className='flex flex-row mt-2'>
                    <Text className='text-[#740001] text-md'>
                        {new Date(createdAt).toLocaleString()}
                    </Text>
                    <Text className='text-[#740001] ml-6 text-md max-w-[70%] overflow-x-hidden text-ellipsis whitespace-nowrap'>
                        {content}
                    </Text>
                </View>
            </View>
        </Link>
    )
}

export default NoteItem