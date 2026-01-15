import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import { AppProvider } from './src/context/AppContext';
import HomeScreen from './src/screens/HomeScreen';
import AnimatedPortraitScreen from './src/screens/AnimatedPortraitScreen';
import LandmarkDiscoveryScreen from './src/screens/LandmarkDiscoveryScreen';
import ARScanScreen from './src/screens/ARScanScreen';
import HeritageProfileScreen from './src/screens/HeritageProfileScreen';
import FavoritesScreen from './src/screens/FavoritesScreen';
import QuizScreen from './src/screens/QuizScreen';
import AchievementsScreen from './src/screens/AchievementsScreen';
import PhotoGalleryScreen from './src/screens/PhotoGalleryScreen';

export type RootStackParamList = {
  Home: undefined;
  AnimatedPortrait: { siteId: string };
  LandmarkDiscovery: undefined;
  ARScan: { siteId: string };
  HeritageProfile: { siteId: string };
  Favorites: undefined;
  Quiz: undefined;
  Achievements: undefined;
  PhotoGallery: { siteId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <NavigationContainer>
          <StatusBar style="dark" />
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerStyle: {
                backgroundColor: '#2D5A27',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          >
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ title: 'HeritAR' }}
            />
            <Stack.Screen
              name="AnimatedPortrait"
              component={AnimatedPortraitScreen}
              options={{ title: 'Heritage Story' }}
            />
            <Stack.Screen
              name="LandmarkDiscovery"
              component={LandmarkDiscoveryScreen}
              options={{ title: 'Discover Heritage' }}
            />
            <Stack.Screen
              name="ARScan"
              component={ARScanScreen}
              options={{ title: 'AR Experience' }}
            />
            <Stack.Screen
              name="HeritageProfile"
              component={HeritageProfileScreen}
              options={{ title: 'Heritage Details' }}
            />
            <Stack.Screen
              name="Favorites"
              component={FavoritesScreen}
              options={{ title: 'My Favorites' }}
            />
            <Stack.Screen
              name="Quiz"
              component={QuizScreen}
              options={{ title: 'Heritage Quiz' }}
            />
            <Stack.Screen
              name="Achievements"
              component={AchievementsScreen}
              options={{ title: 'Achievements' }}
            />
            <Stack.Screen
              name="PhotoGallery"
              component={PhotoGalleryScreen}
              options={{ title: 'Photo Gallery' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </AppProvider>
    </SafeAreaProvider>
  );
}
