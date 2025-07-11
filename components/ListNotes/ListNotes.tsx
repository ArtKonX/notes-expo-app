import { FlatList } from "react-native"
import NoteItem from "./NoteItem/NoteItem"

interface NoteItemData {
    id: string,
    title: string,
    content: string,
    createdAt: Date
}

const ListNotes = (
    { dataNotes }: { dataNotes: NoteItemData[] }) => {

    return (
        <FlatList
            className='overflow-y-hidden max-h-100 h-[80.3%]'
            data={dataNotes}
            keyExtractor={(note) => note.id}
            renderItem={({ item }) => (
                <NoteItem {...item} />
            )}
            initialNumToRender={5}
            maxToRenderPerBatch={5}
            scrollEnabled={true}
            showsVerticalScrollIndicator={false}
        />
    )
}

export default ListNotes