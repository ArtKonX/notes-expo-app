import { TypeStorageProvider } from "@/components/TypeStorageContext/TypeStorageContext";
import { Paths } from 'expo-file-system/next';
import { Stack } from "expo-router";
import { SQLiteProvider, defaultDatabaseDirectory } from "expo-sqlite";
import React, { useMemo } from "react";
import { Platform } from 'react-native';

export default function RootLayout() {

  const dbDirectory = useMemo(() => {
    if (Platform.OS === 'ios') {
      return Object.values(Paths.appleSharedContainers)?.[0]?.uri;
    }
    return defaultDatabaseDirectory;
  }, []);

  return (
    <SQLiteProvider databaseName="test.db" directory={dbDirectory}>
      <TypeStorageProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(notes)" options={{ headerShown: false }} />
          <Stack.Screen name="note/[query]" options={{ headerShown: false }} />
          <Stack.Screen name="select-storage/index" options={{ headerShown: false }} />
        </Stack>
      </TypeStorageProvider>
    </SQLiteProvider>
  );
}
