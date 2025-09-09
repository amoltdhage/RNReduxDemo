import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const isSignedUp = useSelector((state) => state.user.isSignedUp);
  const user = useSelector((state) => state.user.user);

  return (
    <Stack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
      {!user ? (
        <>
          <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
          <Stack.Screen name="Signup" component={SignupScreen} options={{ title: 'Sign Up' }} />
        </>
      ) : (
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile' }} />
      )}
    </Stack.Navigator>
  );
}
