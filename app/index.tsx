import Logo from '@/components/Logo/Logo';
import { TypeStorageContext } from '@/components/TypeStorageContext/TypeStorageContext';
import CustomButton from '@/components/ui/buttons/CustomButton/CustomButton';
import { useRouter } from 'expo-router';
import * as React from 'react';
import { Image, ScrollView, Text, View } from "react-native";
import images from '../constants/icons';
import "../global.css";
// import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Index() {
  const router = useRouter();
  const { typeStorage, setTypeStorage } = React.useContext(TypeStorageContext);

  React.useEffect(() => {
    // Для удаления storageType из localStorage
    // (async () => { AsyncStorage.removeItem('storageType') })()

    if (typeStorage) {
      router.navigate('/home')
    }
  }, [typeStorage, setTypeStorage])

  if (!typeStorage) {
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
            className='w-full h-[80vh] flex items-center justify-center'

          >
            <View className='h-[200px] flex items-center'>
              <Logo />
              <Image source={images.books} className='w-[180px] h-[160px] mt-4 -z-10' />
            </View>
            <View className='relative top-14 w-full -left-[15%]'>
              <Text className='text-[#000000] font-bold text-3xl text-right'>
                ✨ Добро пожаловать в  {" "}
                <Text className='text-[#740001] text-4xl'>
                  MagicNotes
                </Text>
                ! ✨
              </Text>
            </View>
            <Text className="text-lg text-black text-center
            absolute bottom-20 mb-8 px-5 font-medium">
              Отправляйтесь в безграничное путешествие
              вместе с MagicNotes
            </Text>
            <View className='absolute bottom-10'>
              <CustomButton text='🪄Отправиться'
                isLoading={false}
                handlePress={() => router.push('/select-storage')} />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
