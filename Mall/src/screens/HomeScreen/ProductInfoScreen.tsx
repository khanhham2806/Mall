import * as React from 'react';
import { Text, View, StyleSheet, ScrollView, Dimensions, TouchableOpacity, FlatList } from 'react-native';
import { Avatar, Badge } from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Line from '../../components/Line';
import CustomButton from '../../components/CustomButton';
import BtnGoBack from '../../components/BtnGoBack';
import { useNavigation, useIsFocused } from '@react-navigation/native'
import axios from 'axios';
import { BASE_URL } from '../../../config';
import { useState, useEffect } from 'react';
import BtnGoCart from '../../components/BtnGoCart';
import VND from '../../components/VND';
import { addToCart, incrementQuantity } from '../../function/cart';
import Toast from 'react-native-toast-message'
import { Chip } from 'react-native-elements'
const width = Dimensions.get('screen').width;



const ProductInfoScreen = ({ route }: any) => {
    const navigation: any = useNavigation();
    const { item } = route.params;
    // console.log(item);


    const arr = item.productImageUrlEnd.split(',');
    const arrObj: any = [];
    arr.map((item: any) => {
        // console.log(item);
        const obj = { link: item }
        arrObj.push(obj)
    })

    const [productCart, setProductCart] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(false)
    const [dataComment, setDataComment] = useState<any>([]);
    // console.log('isloading', isLoading);
    const isFocused = useIsFocused();
    useEffect(() => {
        setIsLoading(true)
        if (isFocused) {
            getData()
        }
    }, [isLoading, isFocused])

    const getData = async () => {
        const res = await axios.get(`${BASE_URL}/cart`)
        // console.log(res.data.data);
        let dataCart = res && res.data ? res.data.data : [];
        setProductCart(dataCart);
        // setIsLoading(false)
    }
    // console.log(product);
    useEffect(() => {
        getComment()
    }, [navigation])

    const getComment = async () => {
        const res = await axios.get(`${BASE_URL}/product/${item.productID}`)
        // console.log(res.data.data);
        let comment = res && res.data ? res.data.data : [];
        setDataComment(comment);
        // setIsLoading(false)
    }

    const valueCart = productCart.reduce((accumulator: any, item: any) => accumulator + item.productQuantity, 0)
    // console.log(valueCart);
    const accountID = 1;
    const handleAddToCart = (productID: any) => {
        setIsLoading(true)
        const listID = productCart.map((item: any) => item.productID)
        // console.log('list', listID);
        if (!listID.includes(productID)) {
            addToCart(accountID, item.productID)
            Toast.show({
                type: 'success',
                text1: 'Add successfully',
                autoHide: true,
                visibilityTime: 2000,
                position: 'bottom',
                bottomOffset: 70
            });
        } else {
            incrementQuantity(productID)
            Toast.show({
                type: 'success',
                text1: 'Increment successfully',
                autoHide: true,
                visibilityTime: 2000,
                position: 'bottom',
                bottomOffset: 70
            });
        }
        setIsLoading(false)
    }
    // console.log(arrObj);
    // console.log(item);
    const arrLinkImage = item.productImageUrlEnd.split(',')

    return (
        <>
            <View style={{ padding: 10, backgroundColor: '#fff', flexDirection: 'row', justifyContent: 'space-between' }}>
                <BtnGoBack />
                <BtnGoCart value={valueCart} />
            </View>

            <ScrollView style={{ backgroundColor: '#fff', }}>
                {/* Image,Price */}
                <View >
                    <View style={{ alignItems: 'center', position: 'relative' }}>

                        <FlatList data={arrObj}
                            keyExtractor={(image: any) => image.link}
                            renderItem={(image: any) => {
                                return (
                                    <Avatar source={{ uri: item.productImageUrlStart.concat(image.item.link) }} size={width}
                                    />
                                )
                            }
                            }
                            horizontal
                            pagingEnabled
                            snapToAlignment='center'
                            showsHorizontalScrollIndicator={false}
                        />

                    </View>
                    <View style={{ margin: 20 }} >
                        <Text style={styles.title}>{item.productTitle}</Text>
                        <View style={styles.price}>
                            <Text style={styles.actualPrice}>{VND.format(item.productActualPrice)}</Text>
                            <Text style={styles.oldPrice}>{VND.format(item.productOldPrice)}</Text>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <FontAwesome name='star' size={14} color={'#FFC120'} />
                            <Text style={styles.rate}>{item.productRate}</Text>
                            <Text style={styles.review}>{dataComment.length} Reviews</Text>
                        </View>
                    </View>
                </View>

                <Line />

                {/* Seller */}
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 20 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                        <TouchableOpacity>
                            <Avatar source={{ uri: item.productImageUrlStart.concat(arrLinkImage[0]) }} size={45} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ flexDirection: 'column', marginLeft: 10, width: 'auto' }}>
                            <Text style={styles.seller}>{item.seller}</Text>
                            <Text style={{ fontSize: 12 }}>Official Store</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{}}>
                        <TouchableOpacity style={{ padding: 20, width: 'auto', }}>
                            <FontAwesome name='angle-right' size={20} />
                        </TouchableOpacity>
                    </View>
                </View>

                <Line />
                {/* Description */}
                <View style={{ margin: 20 }}>
                    <Text style={{ fontSize: 16, fontWeight: '600' }}>Description Product</Text>
                    <Text style={{ fontSize: 14, }}>{item.productTitle}</Text>
                </View>

                <Line />

                {/* Review */}

                <View style={{ margin: 20 }}>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{dataComment.length} Reviews</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 30, }}>
                            <FontAwesome name='star' size={14} color={'#FFC120'} />
                            <Text style={styles.rate}>{item.productRate}</Text>
                        </View>
                    </View>

                    {dataComment.filter((comment: any, index: any) => index < 3).map((comment: any, index: any) => {

                        return (
                            <View key={comment.commentID}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 20 }}>
                                    <View style={{ flex: 2 }}>
                                        <Avatar source={{ uri: comment.AvatarImageName }} size={45} />
                                    </View>
                                    <View style={{ flex: 8 }}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Text style={{ fontSize: 14, fontWeight: '700' }}>{comment.FullName}</Text>
                                            <Text style={{ fontSize: 12 }}>{(comment.commentTime).toString()}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginVertical: 5 }}>
                                            <FontAwesome name='star' size={14} color={'#FFC120'} />
                                            <FontAwesome name='star' size={14} color={'#FFC120'} />
                                            <FontAwesome name='star' size={14} color={'#FFC120'} />
                                            <FontAwesome name='star' size={14} color={'#FFC120'} />
                                            <FontAwesome name='star' size={14} color={'#FFC120'} />
                                        </View>
                                        <View>
                                            <Text>
                                                {comment.commentContent}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        )
                    })}
                    {(dataComment.length > 0)
                        ?
                        // < CustomButton
                        //     text={`See All Reviews (${dataComment.length})`}
                        //     onPress={() => navigation.navigate('AllComments', { dataComment: dataComment })}
                        //     bgColor='#dfeaed' txtColor='#000'

                        // />
                        <Chip
                            onPress={() => navigation.navigate('AllComments', { dataComment: dataComment })}
                            title={`See All Reviews (${dataComment.length})`}
                            type="outline"
                            containerStyle={{ marginVertical: 15 }}
                            buttonStyle={{ borderColor: 'black' }}
                            titleStyle={{ color: '#000' }}
                        />
                        : <></>
                    }
                </View>


            </ScrollView >
            <View style={{ backgroundColor: '#fff', paddingHorizontal: 10, padding: 10, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-around' }}>
                <CustomButton onPress={() => handleAddToCart(item.productID)} width='40%' text='Add to cart' />
                <CustomButton onPress={() => navigation.navigate('Cart')} width='40%' text='Buy Now' bgColor='#FE3A30' />
            </View>
            <Toast></Toast>
        </>

    );
};
export default ProductInfoScreen;

const styles = StyleSheet.create({
    title: {
        fontWeight: 'bold',
        fontSize: 24,
        color: '#0C1A30',
        marginBottom: 10
    },
    price: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 5

    },
    actualPrice: {
        fontSize: 16, color: '#FE3A30', fontWeight: '500'
    },
    oldPrice: {
        fontSize: 16, textDecorationLine: 'line-through',
        marginHorizontal: 30
    },
    discount: {
        fontSize: 16,
    },
    rate: {
        fontSize: 14,
        marginLeft: 5
    },
    review: {
        fontSize: 14,
        marginHorizontal: 30
    },
    seller: {
        fontSize: 14,
        fontWeight: 'bold'
    }
});
