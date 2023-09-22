import * as React from 'react';
import { useState, useEffect, } from 'react'
import { Text, View, StyleSheet, FlatList, Image, Dimensions, Pressable } from 'react-native';
import { Avatar } from '@rneui/themed';
import axios from 'axios';
import { BASE_URL } from '../../../config';
import { useNavigation } from '@react-navigation/native';
import ComponentProduct from '../../components/ComponentProduct';
import VND from '../../components/VND';
import Ionicons from 'react-native-vector-icons/Ionicons'



const width = Dimensions.get('screen').width * 0.43;
const height = Dimensions.get('screen').height * 0.35;

const ListProduct = () => {
    const navigation: any = useNavigation();
    const [data, setData] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 6;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = data.slice(firstIndex, lastIndex);
    const npage = Math.ceil(data.length / recordsPerPage)
    const number = [...Array(npage + 1).keys()].slice(1)
    // console.log(number);
    const handlePrevPage = () => {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1)
        }
    }
    const handleNextPage = () => {
        if (currentPage != npage) {
            setCurrentPage(currentPage + 1)
        }
    }
    const handleChangePage = (id: any) => {
        setCurrentPage(id)

    }

    useEffect(() => {
        // const unsub = navigation.addListener('focus', () => {
        getData()
        // })
        // }, [navigation]);
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
                {records.map((item: any, index: any) => {
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
                            inCart={item.inCart}
                        />
                    )
                })}
            </View>
            <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Pressable style={{ margin: 5, padding: 5, borderWidth: 1, width: 30, height: 30 }} onPress={handlePrevPage} >
                    <Ionicons name='chevron-back-outline' size={15} />
                </Pressable>
                {number.map((n, i) => {
                    return (
                        <Pressable onPress={() => handleChangePage(n)} key={i} style={{ margin: 5, alignItems: 'center', paddingTop: 3, width: 30, height: 30, borderWidth: 1 }}>
                            <Text>{n}</Text>
                        </Pressable>
                    )
                })}
                <Pressable style={{ margin: 5, padding: 5, borderWidth: 1, width: 30, height: 30 }} onPress={handleNextPage}>
                    <Ionicons name='chevron-forward-outline' size={15} />
                </Pressable>
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
