import * as React from 'react';
import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNav from './TabNav';
import ProductInfoScreen from '../screens/HomeScreen/ProductInfoScreen';
import WebViewScreen from '../screens/NewsScreen/WebViewScreen';
import CategoryScreen from '../screens/HomeScreen/CategoryScreen';
import SearchProductScreen from '../screens/HomeScreen/SearchProductScreen';
import OrderScreen from '../screens/OrderScreen/OrderScreen';
import ChatScreen from '../screens/ChatScreen/ChatScreen';

const Stack = createNativeStackNavigator();
const AppStack = () => {
    return (<>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="TabNav" component={TabNav} />
            <Stack.Screen name="WebViewScreen" component={WebViewScreen} />
            <Stack.Screen name='Order' component={OrderScreen} />
            <Stack.Screen name='Chat' component={ChatScreen} />
            <Stack.Screen name="ProductInfo" component={ProductInfoScreen} />
            <Stack.Screen name="CategoryScreen" component={CategoryScreen} />
            <Stack.Screen name="SearchProduct" component={SearchProductScreen} />

        </Stack.Navigator>
    </>
    );
};

export default AppStack;

const styles = StyleSheet.create({
    container: {}
});
