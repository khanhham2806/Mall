import * as React from 'react';
import axios from 'axios';
import { Text, View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';
import { useEffect, useState } from 'react'
import { useNavigation, useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { BASE_URL } from '../../../config';
import BtnGoBack from '../../components/button/BtnGoBack';
import BtnGoChat from '../../components/button/BtnGoChat';
import VND from '../../function/VND';
import Line from '../../components/pages/Line';
import CustomButton from '../../components/button/CustomButton';
import { removeFromCart } from '../../redux/actions/action';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';


const CheckoutScreen = ({ route }: any) => {

    const { product } = route.params;
    console.log(product);

    const navigation: any = useNavigation();
    const isFocused = useIsFocused();
    const [address, setAddress] = useState<any>({})

    const total = product.reduce((accumulator: any, item: any) => accumulator + item.productActualPrice * item.productQuantity, 0)

    const handleBuy = () => {
        navigation.navigate('Home')
    }
    useEffect(() => {
        if (isFocused) {
            getAddress()
        }
    }, [isFocused])
    const getAddress = async () => {
        try {
            const value = await AsyncStorage.getItem('address');
            if (value !== null) {
                const address = JSON.parse(value)
                // console.log('>>value', address);
                setAddress(address)
            }
        } catch (e) {
            // error reading value
        }
    };
    return (
        <View style={{ flexDirection: 'column', flex: 1, backgroundColor: '#fff' }}>
            <View style={{ padding: 10, elevation: 5, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
                <BtnGoBack />
                <View>
                    <Text style={{ fontWeight: 'bold', fontSize: 18, }}>Checkout</Text>
                </View>
                <BtnGoChat />
            </View>
            <Pressable onPress={() => navigation.navigate('CheckoutAddress')} style={{ margin: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} >
                <View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons color='#000' name='location-outline' size={20} />
                        <Text style={{ color: '#000', marginHorizontal: 5, fontSize: 16, marginBottom: 5 }}>Delivery Address</Text>
                    </View>
                    <View style={{ marginLeft: 20 }}>
                        <Text style={{ fontSize: 15 }}>{address.name} | {address.phone}</Text>
                        <Text style={{ fontSize: 14 }}>{address.addressDetail}</Text>
                        <Text style={{ fontSize: 14 }}>{address.district}, {address.province}</Text>

                    </View>
                </View>
                <View>
                    <FontAwesome style={{ marginRight: 10 }} name='angle-right' size={20} />
                </View>
            </Pressable>
            <Line marginHorizontal='0' />
            <ScrollView showsVerticalScrollIndicator={false}>
                {
                    product.map((item: any, index: number) => {
                        const arrLinkImage = item.productImageUrlEnd.split(',')

                        return (
                            <ListItem key={index} bottomDivider>
                                <Avatar
                                    size={60}
                                    source={{ uri: item.productImageUrlStart.concat(arrLinkImage[0]) }}
                                />
                                <ListItem.Content>
                                    <ListItem.Title>{item.productTitle}</ListItem.Title>
                                    <ListItem.Subtitle>{VND.format(item.productActualPrice * item.productQuantity)}</ListItem.Subtitle>
                                </ListItem.Content>
                                <ListItem.Subtitle>X{item.productQuantity}</ListItem.Subtitle>
                            </ListItem>
                        )
                    })
                }

            </ScrollView>

            <View style={{ flexDirection: 'row', padding: 10, backgroundColor: '#ededed', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Total: {VND.format(total)}</Text>
                <CustomButton
                    onPress={() => handleBuy()}
                    text='Buy' width='30%' />
            </View>
        </View>

    );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
    container: {}
});
