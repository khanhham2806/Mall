import * as React from 'react';
import { useState, useEffect, } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Modal, Alert, TextInput } from 'react-native';
import { Avatar } from '@rneui/themed';
import axios from 'axios';
import { BASE_URL } from '../../../config';
import { useNavigation } from '@react-navigation/native';
import VND from '../../components/VND';
import AntDesign from 'react-native-vector-icons/AntDesign'
import BtnGoBack from '../../components/BtnGoBack';
import { DataTable } from 'react-native-paper';
import CustomButton from '../../components/CustomButton';
const Product = () => {
    const navigation: any = useNavigation();
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalActualPrice, setModalActualPrice] = useState(0);
    const [modalOldPrice, setModalOldPrice] = useState(0);
    const [modalCategory, setModalCategory] = useState('');
    const [modalSeller, setModalSeller] = useState('');

    const [page, setPage] = useState<number>(0);
    const [numberOfItemsPerPageList] = useState([5, 10, 15, 20]);
    const [itemsPerPage, onItemsPerPageChange] = useState(
        numberOfItemsPerPageList[0]
    );
    const from = page * itemsPerPage;
    const to = Math.min((page + 1) * itemsPerPage, data.length);
    // console.log(number);

    const handleOnChangeModalTitle = (value: any) => {
        setModalTitle(value)
    }
    const handleOnChangeModalActualPrice = (value: any) => {
        setModalActualPrice(value)
    }
    const handleOnChangeModalOldPrice = (value: any) => {
        setModalOldPrice(value)
    }
    const handleOnChangeModalCategory = (value: any) => {
        setModalCategory(value)
    }
    const handleOnChangeModalSeller = (value: any) => {
        setModalSeller(value)
    }

    useEffect(() => {
        // const unsub = navigation.addListener('focus', () => {
        getData()
        // })
        // }, [navigation]);
    }, [isLoading]);
    // console.log(data);

    const getData = async () => {
        const res = await axios.get(`${BASE_URL}/product`)
        let dataProducts = res && res.data ? res.data.data : [];
        setData(dataProducts);
    }

    useEffect(() => {
        setPage(0);
    }, [itemsPerPage]);

    const removeProduct = (productID: any) => {
        axios.delete(`${BASE_URL}/product/${productID}`)
            .then(response => {
                console.log(`Deleted post with ID ${productID}`);
            })
            .catch(error => {
                console.error(error);
            });
    }
    const handleDelete = async (productID: any, data: any) => {
        // console.log(productID);
        setIsLoading(true)
        await data.forEach((item: any, index: number) => {
            if (item.productID == productID) {
                data.splice(index, 1)
            }
        });
        removeProduct(productID)
        setIsLoading(false)

    }

    const handleEdit = (item: any) => {
        setModalVisible(true)
        setModalTitle(item.productTitle)
        setModalActualPrice(item.productActualPrice)
        setModalOldPrice(item.productOldPrice)
        setModalCategory(item.productCategory)
        setModalSeller(item.seller)
    }
    return (
        <>
            <View style={{ padding: 10, backgroundColor: '#fff', flexDirection: 'row', justifyContent: 'space-between' }}>
                <BtnGoBack />
            </View>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Edit</Text>
                        <View style={{ alignItems: 'center', flexDirection: 'column', width: 300 }}>
                            <TextInput placeholderTextColor={'#C4C5C4'} style={{ paddingHorizontal: 10, borderWidth: 1, marginVertical: 5, borderRadius: 5, width: '95%' }} onChangeText={handleOnChangeModalTitle} value={modalTitle} />
                            <TextInput placeholderTextColor={'#C4C5C4'} style={{ paddingHorizontal: 10, borderWidth: 1, marginVertical: 5, borderRadius: 5, width: '95%' }} onChangeText={handleOnChangeModalActualPrice} value={String(modalActualPrice)} />
                            <TextInput placeholderTextColor={'#C4C5C4'} style={{ paddingHorizontal: 10, borderWidth: 1, marginVertical: 5, borderRadius: 5, width: '95%' }} onChangeText={handleOnChangeModalOldPrice} value={String(modalOldPrice)} />
                            <TextInput placeholderTextColor={'#C4C5C4'} style={{ paddingHorizontal: 10, borderWidth: 1, marginVertical: 5, borderRadius: 5, width: '95%' }} onChangeText={handleOnChangeModalCategory} value={modalCategory} />
                            <TextInput placeholderTextColor={'#C4C5C4'} style={{ paddingHorizontal: 10, borderWidth: 1, marginVertical: 5, borderRadius: 5, width: '95%' }} onChangeText={handleOnChangeModalSeller} value={modalSeller} />
                            <CustomButton
                                margin={10}
                                txtColor='#fff'
                                bgColor='#FE3A30'
                                width='50%'
                                onPress={() => {
                                    setModalVisible(!modalVisible)
                                }}
                                text='Save'
                            />
                        </View>
                    </View>
                </View>
            </Modal>
            <DataTable >
                <DataTable.Header >
                    <DataTable.Title style={{ justifyContent: 'center' }} >Product</DataTable.Title>
                    <DataTable.Title style={{ justifyContent: 'flex-end' }} >Actual Price</DataTable.Title>
                    <DataTable.Title style={{ justifyContent: 'center' }}>Settings</DataTable.Title>
                </DataTable.Header>

                {data.slice(from, to).map((item: any, index: any) => {
                    const arrLinkImage = item.productImageUrlEnd.split(',')
                    return (
                        <DataTable.Row key={index} onPress={() => navigation.navigate('AdminProductInfo', { item: item })} >
                            <View style={{ width: 150 }}>
                                <DataTable.Cell >
                                    <Avatar source={{ uri: item.productImageUrlStart.concat(arrLinkImage[0]) }} />
                                    <Text>{item.productTitle}</Text>
                                </DataTable.Cell>
                            </View>
                            <DataTable.Cell style={{ justifyContent: 'flex-end' }} >{VND.format(item.productActualPrice)}</DataTable.Cell>
                            <DataTable.Cell style={{ justifyContent: 'center' }}>
                                <TouchableOpacity style={{ padding: 10 }} onPress={() => handleEdit(item)}>
                                    <AntDesign name='edit' size={20} />
                                </TouchableOpacity>
                                <TouchableOpacity style={{ padding: 10 }} onPress={() => handleDelete(item.productID, data)} >
                                    <AntDesign name='delete' size={20} />
                                </TouchableOpacity>
                            </DataTable.Cell>
                        </DataTable.Row>
                    )

                })}

                <DataTable.Pagination
                    page={page}
                    numberOfPages={Math.ceil(data.length / itemsPerPage)}
                    onPageChange={(page) => setPage(page)}
                    label={`${from + 1}-${to} of ${data.length}`}
                    numberOfItemsPerPageList={numberOfItemsPerPageList}
                    numberOfItemsPerPage={itemsPerPage}
                    onItemsPerPageChange={onItemsPerPageChange}
                    showFastPaginationControls
                    selectPageDropdownLabel={'Rows per page'}
                />
            </DataTable >

        </>
    );
};

export default Product;

const styles = StyleSheet.create({
    container: {},
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 10,
    },
    modalText: {
        fontSize: 18,
        textAlign: 'center',
    },
});
