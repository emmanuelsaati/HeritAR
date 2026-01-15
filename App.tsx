import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import HomeScreen from './src/screens/HomeScreen';
import AnimatedPortraitScreen from './src/screens/AnimatedPortraitScreen';
import LandmarkDiscoveryScreen from './src/screens/LandmarkDiscoveryScreen';
import ARScanScreen from './src/screens/ARScanScreen';
import HeritageProfileScreen from './src/screens/HeritageProfileScreen';

export type RootStackParamList = {
  Home: undefined;
  AnimatedPortrait: { siteId: string };
  LandmarkDiscovery: undefined;
  ARScan: { siteId: string };
  HeritageProfile: { siteId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
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
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
