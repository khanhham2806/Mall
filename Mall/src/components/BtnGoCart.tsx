import * as React from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { Badge } from 'react-native-elements';
import { useState, useEffect } from 'react'
import axios from 'axios';
import { BASE_URL } from '../../config';
const BtnGoCart = ({ value }: any) => {


    const navigation: any = useNavigation()
    const hanldeGoCart = () => {
        navigation.navigate('Cart');
    }
    const status = 'error';
    return (
        <>
            <Pressable
                onPress={hanldeGoCart}
                style={{
                    padding: 10, width: 40, backgroundColor: '#ccc', borderRadius: 30,
                }}>
                <Ionicons name='cart' size={20} />
                < Badge
                    value={value}
                    status={status}
                    containerStyle={{ width: 30, position: 'absolute', top: 0, right: -10 }}
                />
            </Pressable>



        </>

    );
};

export default BtnGoCart;

