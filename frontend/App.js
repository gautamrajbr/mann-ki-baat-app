import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useFonts, Manrope_400Regular, Manrope_500Medium, Manrope_600SemiBold } from '@expo-google-fonts/manrope';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { theme } from './theme';

import OnboardingScreen from './screens/OnboardingScreen';
import DailyCheckInScreen from './screens/DailyCheckInScreen';
import GroupSessionsScreen from './screens/GroupSessionsScreen';
import ChatScreen from './screens/ChatScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.outline,
        tabBarStyle: {
          backgroundColor: theme.colors.surfaceContainerLowest,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          height: 60,
          position: 'absolute',
        },
      }}
    >
      <Tab.Screen 
        name="Wellness" 
        component={DailyCheckInScreen} 
        options={{ tabBarIcon: ({ color }) => <MaterialCommunityIcons name="emoticon-happy-outline" color={color} size={24} /> }} 
      />
      <Tab.Screen 
        name="Sessions" 
        component={GroupSessionsScreen} 
        options={{ tabBarIcon: ({ color }) => <MaterialCommunityIcons name="account-group-outline" color={color} size={24} /> }} 
      />
      <Tab.Screen 
        name="Explore" 
        component={ChatScreen} 
        options={{ tabBarIcon: ({ color }) => <MaterialCommunityIcons name="compass-outline" color={color} size={24} /> }} 
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_600SemiBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen name="Main" component={DailyCheckInScreen} />
          <Stack.Screen name="HomeTabs" component={HomeTabs} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
