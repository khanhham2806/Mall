import * as React from 'react';
import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNav from '../navigation/TabNav';
import WebViewScreen from '../../screens/NewsScreen/WebViewScreen';
import CategoryScreen from '../../screens/CategoryScreen';
import SearchProductScreen from '../../screens/SearchProductScreen';
import ChatScreen from '../../screens/ChatScreen';
import AdminScreen from '../../screens/Admin/AdminScreen';
import Product from '../../screens/Admin/Product';
import ProductInfo from '../../screens/Admin/ProductInfo';
import AllCommentsScreen from '../../components/pages/product/AllCommentsScreen';
import CheckoutScreen from '../../screens/CartScreen/CheckoutScreen';
import CheckoutAddressScreen from '../../screens/CartScreen/CheckoutAddressScreen';
import SettingsScreen from '../../screens/UserScreen/SettingsScreen';
import UserInfoScreen from '../../screens/UserScreen/InfoScreen';
import OrderScreen from '../../screens/CartScreen/CartScreen';
import ProductInfoScreen from '../../screens/ProductInfoScreen';
const Stack = createNativeStackNavigator();
const AppStack = () => {
    return (<>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="TabNav" component={TabNav} />
            <Stack.Screen name="WebViewScreen" component={WebViewScreen} />
            <Stack.Screen name='Cart' component={OrderScreen} />
            <Stack.Screen name='Chat' component={ChatScreen} />
            <Stack.Screen name="CategoryScreen" component={CategoryScreen} />
            <Stack.Screen name="SearchProduct" component={SearchProductScreen} />

            <Stack.Screen name="ProductInfo" component={ProductInfoScreen} />
            <Stack.Screen name="AllComments" component={AllCommentsScreen} />

            <Stack.Screen name="Admin" component={AdminScreen} />
            <Stack.Screen name="AdminProduct" component={Product} />
            <Stack.Screen name="AdminUser" component={Product} />
            <Stack.Screen name="AdminProductInfo" component={ProductInfo} />

            <Stack.Screen name='CheckoutAddress' component={CheckoutAddressScreen} />
            <Stack.Screen name='Checkout' component={CheckoutScreen} />
            <Stack.Screen name='Settings' component={SettingsScreen} />
            <Stack.Screen name='UserInfo' component={UserInfoScreen} />
        </Stack.Navigator>
    </>
    );
};

export default AppStack;

const styles = StyleSheet.create({
    container: {}
});
