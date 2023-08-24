import * as React from 'react';
import { useState, useEffect, } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Avatar } from '@rneui/themed';
import axios from 'axios';
import { BASE_URL } from '../../config';
import { useNavigation } from '@react-navigation/native';
const width = Dimensions.get('screen').width * 0.43;
const height = Dimensions.get('screen').height * 0.35;

const Product = () => {
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

                        <TouchableOpacity key={item.productID} style={styles.product}
                            onPress={() => navigation.navigate('ProductInfo', { item: item })}
                        >
                            <Avatar source={{ uri: item.productImage }} size={width * 0.9} />
                            <Text style={styles.title}>{item.title}</Text>
                            <View style={{ width, display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
                                <Text style={{ fontSize: 10, color: '#FE3A30' }}>{item.actualPrice + ' VND'}</Text>
                                <Text style={{ fontSize: 10, textDecorationLine: 'line-through' }}>{item.oldPrice + ' VND'} </Text>
                                <Text style={{ fontSize: 10 }}>{'-' + item.discount + '%'}</Text>
                            </View>
                        </TouchableOpacity>

                    )

                })}
            </View>
        </View>
    );
};
export default Product;


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
