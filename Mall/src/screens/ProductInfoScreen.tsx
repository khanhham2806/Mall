import * as React from 'react';
import { Text, View, StyleSheet, ScrollView, Dimensions, TouchableOpacity, Image } from 'react-native';
import { Avatar } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import Line from '../components/Line';
import CustomButton from '../components/CustomButton';
import BtnGoBack from '../components/BtnGoBack';
const width = Dimensions.get('screen').width;

const ProductInfoScreen = ({ route }: any) => {
    const navigation = useNavigation();
    const { item } = route.params;
    const handleGoBack = () => {
        navigation.goBack();
    }

    return (
        <>
            <View style={{ backgroundColor: '#fff' }}>
                <BtnGoBack onPress={handleGoBack} />

            </View>

            <ScrollView style={{ backgroundColor: '#fff', }}>


                {/* Image,Price */}
                <View >
                    <View style={{ alignItems: 'center', position: 'relative' }}>
                        <Avatar source={{ uri: item.productImage }} size={width * 0.9} />

                    </View>
                    <View style={{ margin: 20 }} >
                        <Text style={styles.title}>{item.title}</Text>
                        <View style={styles.price}>
                            <Text style={styles.actualPrice}>{item.actualPrice} VND</Text>
                            <Text style={styles.oldPrice}>{item.oldPrice} VND</Text>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <FontAwesome name='star' size={14} color={'#FFC120'} />
                            <Text style={styles.rate}>{item.rate}</Text>
                            <Text style={styles.review}>86 Reviews</Text>
                        </View>
                    </View>
                </View>

                <Line />

                {/* Seller */}
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 20 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                        <TouchableOpacity>
                            <Avatar source={{ uri: item.productImage }} size={30} />
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
                    <Text style={{ fontSize: 14, }}>{item.title}</Text>
                </View>

                <Line />

                {/* Review */}
                <View style={{ margin: 20, }}>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>86 Reviews</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 30, }}>
                            <FontAwesome name='star' size={14} color={'#FFC120'} />
                            <Text style={styles.rate}>{item.rate}</Text>
                        </View>
                    </View>

                    <View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 20 }}>
                            <View style={{ flex: 2 }}>
                                <Avatar source={{ uri: item.productImage }} size={45} />
                            </View>
                            <View style={{ flex: 8 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ fontSize: 14, fontWeight: '700' }}>KhanhDoan</Text>
                                    <Text style={{ fontSize: 12 }}>3 minutes ago</Text>
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
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                    </Text>
                                </View>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 20 }}>
                            <View style={{ flex: 2 }}>
                                <Avatar source={{ uri: item.productImage }} size={45} />
                            </View>
                            <View style={{ flex: 8 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ fontSize: 14, fontWeight: '700' }}>KhanhDoan</Text>
                                    <Text style={{ fontSize: 12 }}>3 minutes ago</Text>
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
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                    </Text>
                                </View>
                            </View>
                        </View>



                    </View>
                    <CustomButton text='See All Reviews' bgColor='#fff' txtColor='#000' borderColor='#000' />
                </View>


            </ScrollView >
            <View style={{ backgroundColor: '#fff', paddingHorizontal: 20, paddingBottom: 10, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-around' }}>
                <CustomButton width='40%' text='Add to cart' bgColor='#3669C9' txtColor='#fff' />
                <CustomButton width='40%' text='Buy now' bgColor='#FE3A30' txtColor='#fff' />
            </View>

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
