import * as React from 'react';
import { Pressable } from 'react-native';
import { useState, useEffect } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native';
import { Badge } from 'react-native-elements';

import { getListCart } from '../../redux/actions/action';
import { AuthContext } from '../../context/AuthContext'
import { useContext } from 'react';
import store from '../../redux/store';
const BtnGoCart = ({ value }: any) => {

    const { userInfo } = useContext(AuthContext);
    // const productCart: any = useSelector<any>(state => state.CartReducer.carts);
    // console.log(productCart);

    // const valueCart = productCart.reduce((accumulator: number, item: any) => accumulator + Number(item.productQuantity), 0)
    useEffect(() => {
        fetchData()
    }, [])
    const fetchData = async () => {
        store.dispatch(getListCart(userInfo.user.accountID));
    };

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
                    padding: 10, width: 40, backgroundColor: '#ededed', borderRadius: 30,
                }}>
                <Ionicons name='cart' size={20} />
                {/* < Badge
                    value={valueCart}
                    status={status}
                    containerStyle={{ width: 30, position: 'absolute', top: 0, right: -10 }}
                /> */}
            </Pressable>



        </>

    );
};

export default BtnGoCart;

