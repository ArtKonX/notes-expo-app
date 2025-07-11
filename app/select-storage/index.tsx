import Logo from '@/components/Logo/Logo';
import { TypeStorageContext } from '@/components/TypeStorageContext/TypeStorageContext';
import CustomButton from '@/components/ui/buttons/CustomButton/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useContext } from 'react';
import { ScrollView, Text, View } from "react-native";

export default function Index() {
    const { setTypeStorage } = useContext(TypeStorageContext);

    const router = useRouter()

    const saveStorageType = async (type: 'sqlite' | 'local' | 'files') => {
        try {
            await AsyncStorage.setItem('storageType', type);
            setTypeStorage(type)
        } catch (error) {
            console.log('Ошибка сохранения типа хранения', error);
        }
    };

    return (
        <View
            className='bg-[#d0d0c0] dark:bg-[#98988d]'
        >
            <ScrollView
                contentContainerStyle={{
                    height: "100%",
                }}
            >
                <View
                    className='w-full h-[80vh] flex items-center justify-center relative'

                >
                    <View className='h-[200px] flex items-center'>
                        <Logo />
                    </View>
                    <View className='relative top-10 w-full'>
                        <Text className='text-[#000000] font-bold text-3xl text-center'>
                            Выберите где хранить {""}
                            <Text className='text-[#740001] text-4xl'>
                                заметки
                            </Text>
                            :
                        </Text>
                    </View>
                    <View className='flex flex-row -bottom-[30%] w-full justify-around'>
                        <View className='bottom-10'>
                            <CustomButton text='SQLite' isLoading={false} handlePress={() => { saveStorageType('sqlite'); router.push('/home') }} />
                        </View>
                        <View className='bottom-10'>
                            <CustomButton text='Файлы' isLoading={false} handlePress={() => { saveStorageType('files'); router.push('/home') }} />
                        </View>
                    </View>
                    <View className='flex flex-row -bottom-[30%] w-full justify-around'>
                        <CustomButton text='AsyncStorage' isLoading={false} handlePress={() => { saveStorageType('local'); router.push('/home') }} />
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}