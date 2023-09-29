import * as React from 'react';
import { Text, View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import axios from 'axios';

import BtnGoBack from '../components/button/BtnGoBack';
import BtnGoCart from '../components/button/BtnGoCart';
import { BASE_URL } from '../../config';
import VND from '../function/VND';
import ComponentProduct from '../components/pages/home/ComponentProduct';

const width = Dimensions.get('screen').width * 0.43;
const height = Dimensions.get('screen').height * 0.35;


const CategoryScreen = ({ route }: any) => {
    const navigation: any = useNavigation();
    let { item } = route.params;
    // console.log(item.category);
    const [data, setData] = useState([]);
    const [productCart, setProductCart] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(false)
    const isFocused = useIsFocused();


    useEffect(() => {
        const getData = async () => {
            const res = await axios.get(`${BASE_URL}/category/${item.category}`)
            // console.log(res.data.data);
            let dataCategory = res && res.data ? res.data.data : [];
            setData(dataCategory);
        }
        getData()
    }, []);
    return (
        <>
            <View style={{ padding: 10, flexDirection: "row", alignItems: 'center', justifyContent: 'space-between' }}>
                <BtnGoBack />
                <Text style={{ fontWeight: 'bold', fontSize: 18, }}>
                    Category: {item.categoryTitle}
                </Text>
                <BtnGoCart />
            </View>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <View style={[{ flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap', rowGap: 20 }]}>
                    {data.map((item: any) => {
                        // console.log(item);
                        const arrLinkImage = item.productImageUrlEnd.split(',')
                        return (
                            <ComponentProduct
                                key={item.productID}
                                onPress={() => navigation.navigate('ProductInfo', { item: item })}
                                sourceImg={{ uri: item.productImageUrlStart.concat(arrLinkImage[1]) }}
                                title={item.productTitle}
                                actualPrice={VND.format(item.productActualPrice)}
                                oldPrice={VND.format(item.productOldPrice)}
                                discount={+((item.productOldPrice - item.productActualPrice) / item.productOldPrice).toFixed(2) * 100}
                            />
                        )

                    })}
                </View>
            </ScrollView>

        </>
    );
};

export default CategoryScreen;

const styles = StyleSheet.create({
    container: { marginHorizontal: 20 },
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
