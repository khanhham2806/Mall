import * as React from 'react';
import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNav from './TabNav';
import ProductInfoScreen from '../screens/HomeScreen/ProductInfoScreen';
import WebViewScreen from '../screens/NewsScreen/WebViewScreen';
import CategoryScreen from '../screens/HomeScreen/CategoryScreen';

const Stack = createNativeStackNavigator();
const AppStack = () => {
    return (<>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="TabNav" component={TabNav} />
            <Stack.Screen name="WebViewScreen" component={WebViewScreen} />
            <Stack.Screen name="ProductInfo" component={ProductInfoScreen} />
            <Stack.Screen name="CategoryScreen" component={CategoryScreen} />
        </Stack.Navigator>
    </>
    );
};

export default AppStack;

const styles = StyleSheet.create({
    container: {}
});
