import * as React from 'react';
import { Text, View, StyleSheet, Dimensions, Pressable } from 'react-native';
import { useState, useEffect, } from 'react'
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import axios from 'axios';

import ComponentProduct from './ComponentProduct';
import { BASE_URL } from '../../../../config';
import VND from '../../../function/VND';


const width = Dimensions.get('screen').width * 0.43;
const height = Dimensions.get('screen').height * 0.35;

const ListProduct = () => {
    const navigation: any = useNavigation();
    const [data, setData] = useState([]);


    useEffect(() => {
        getData()
    }, []);
    // console.log(data);

    const getData = async () => {
        const res = await axios.get(`${BASE_URL}/product`)
        let dataProducts = res && res.data ? res.data.data : [];
        setData(dataProducts);
    }
    return (
        <View>
            <Text style={styles.viewContent}>Products</Text>
            <View style={[{ flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap', rowGap: 20 }]}>
                {data.map((item: any, index: any) => {
                    // console.log(item);
                    const arrLinkImage = item.productImageUrlEnd.split(',')
                    return (
                        <ComponentProduct
                            key={index}
                            onPress={() => navigation.navigate('ProductInfo', { item: item })}
                            sourceImg={{ uri: item.productImageUrlStart.concat(arrLinkImage[0]) }}
                            title={item.productTitle}
                            actualPrice={VND.format(item.productActualPrice)}
                            oldPrice={VND.format(item.productOldPrice)}
                            discount={+((item.productOldPrice - item.productActualPrice) / item.productOldPrice).toFixed(2) * 100}
                        />
                    )
                })}
            </View>

        </View >

    );
};
export default ListProduct;


const styles = StyleSheet.create({
    viewContent: {
        fontSize: 20,
        fontWeight: 'bold',
        textShadowColor: 'red',
        marginVertical: 10
    },
    product: {
        borderRadius: 10,
        borderColor: '#EDEDED',
        backgroundColor: '#fafafa',
        width,
        height,
        alignItems: 'center'
    },
    title: {
        padding: 5,
        fontWeight: 'bold',
        marginVertical: 10
    }
});
