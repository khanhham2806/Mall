import * as React from 'react';
import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNav from './TabNav';
import ProductInfoScreen from '../screens/HomeScreen/ProductInfoScreen';
import WebViewScreen from '../screens/NewsScreen/WebViewScreen';
import CategoryScreen from '../screens/HomeScreen/CategoryScreen';
import SearchProductScreen from '../screens/HomeScreen/SearchProductScreen';
import OrderScreen from '../screens/CartScreen/CartScreen';
import ChatScreen from '../screens/ChatScreen/ChatScreen';
import AdminScreen from '../screens/Admin/AdminScreen';
import Product from '../screens/Admin/Product';
import ProductInfo from '../screens/Admin/ProductInfo';
import AllCommentsScreen from '../screens/HomeScreen/AllCommentsScreen';
import CheckoutScreen from '../screens/CartScreen/CheckoutScreen';
import CheckoutAddressScreen from '../screens/CartScreen/CheckoutAddressScreen';
const Stack = createNativeStackNavigator();
const AppStack = () => {
    return (<>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="TabNav" component={TabNav} />
            <Stack.Screen name="WebViewScreen" component={WebViewScreen} />
            <Stack.Screen name='Cart' component={OrderScreen} />
            <Stack.Screen name='Chat' component={ChatScreen} />
            <Stack.Screen name="ProductInfo" component={ProductInfoScreen} />
            <Stack.Screen name="AllComments" component={AllCommentsScreen} />
            <Stack.Screen name="CategoryScreen" component={CategoryScreen} />
            <Stack.Screen name="SearchProduct" component={SearchProductScreen} />
            <Stack.Screen name="Admin" component={AdminScreen} />
            <Stack.Screen name="AdminProduct" component={Product} />
            <Stack.Screen name="AdminUser" component={Product} />
            <Stack.Screen name="AdminProductInfo" component={ProductInfo} />
            <Stack.Screen name='Checkout' component={CheckoutScreen} />
            <Stack.Screen name='CheckoutAddress' component={CheckoutAddressScreen} />
        </Stack.Navigator>
    </>
    );
};

export default AppStack;

const styles = StyleSheet.create({
    container: {}
});
