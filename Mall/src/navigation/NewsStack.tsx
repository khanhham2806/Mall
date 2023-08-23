import * as React from 'react';
import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WebViewScreen from '../screens/WebViewScreen';
import NewsScreen from '../screens/NewsScreen';

const Stack = createNativeStackNavigator();
const NewsStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="NewsStack" component={NewsScreen} />
            <Stack.Screen name="WebViewScreen" component={WebViewScreen} />
        </Stack.Navigator>
    );
};

export default NewsStack;

const styles = StyleSheet.create({
    container: {}
});
