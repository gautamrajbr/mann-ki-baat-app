import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Compass, Smile, Users } from 'lucide-react-native';
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
        options={{ tabBarIcon: ({ color }) => <Smile color={color} /> }} 
      />
      <Tab.Screen 
        name="Sessions" 
        component={GroupSessionsScreen} 
        options={{ tabBarIcon: ({ color }) => <Users color={color} /> }} 
      />
      <Tab.Screen 
        name="Explore" 
        component={ChatScreen} 
        options={{ tabBarIcon: ({ color }) => <Compass color={color} /> }} 
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Main" component={DailyCheckInScreen} />
        <Stack.Screen name="HomeTabs" component={HomeTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
