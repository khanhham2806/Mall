import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/LoginScreen';
import Register from '../screens/RegisterScreen';

const Stack = createNativeStackNavigator();
const AuthStack = () => {
  return (
        <Stack.Navigator screenOptions={{headerShown:false}}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
  );
};

export default AuthStack;

const styles = StyleSheet.create({
  container: {}
});
