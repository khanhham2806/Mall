import * as React from 'react';
import { useState, useEffect, } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Avatar } from '@rneui/themed';
import axios from 'axios';
import { BASE_URL } from '../../../config';
import { useNavigation } from '@react-navigation/native';
import ComponentProduct from '../../components/ComponentProduct';
const width = Dimensions.get('screen').width * 0.43;
const height = Dimensions.get('screen').height * 0.35;

const ListProduct = () => {
    const navigation = useNavigation();
    const [data, setData] = useState([]);
    useEffect(() => {
        const getData = async () => {
            const res = await axios.get(`${BASE_URL}/product`)
            let dataProducts = res && res.data ? res.data.data : [];
            setData(dataProducts);
        }

        getData()
    }, []);
    return (
        <View>
            <Text style={styles.viewContent}>Products</Text>
            <View style={[{ flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap', rowGap: 20 }]}>
                {data.map((item: any) => {
                    return (
                        <ComponentProduct
                            key={item.productID}
                            onPress={() => navigation.navigate('ProductInfo', { item: item })}
                            sourceImg={{ uri: item.productImage }}
                            title={item.title}
                            actualPrice={item.actualPrice}
                            oldPrice={item.oldPrice}
                            discount={item.discount}
                        />
                    )

                })}
            </View>
        </View>
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
