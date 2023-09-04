import * as React from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Avatar } from 'react-native-elements';
import BtnGoBack from '../../components/BtnGoBack';
import { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { BASE_URL } from '../../../config';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign'
const OrderScreen = () => {
  const navigation = useNavigation();
  const [product, setProduct] = useState<any>([]);
  const [isDelete, setIsDelete] = useState(false);
  useEffect(() => {
    const unsub = navigation.addListener('focus', () => {
      getData()
    })
  }, [isDelete])
  const getData = async () => {
    const res = await axios.get(`${BASE_URL}/cart`)
    // console.log(res.data.data);

    let dataOrder = res && res.data ? res.data.data : [];
    setProduct(dataOrder);

  }
  console.log(product);


  const handleDecrement = (productID: any) => {
    setProduct((product: any) =>
      product.map((item: any) =>
        productID === item.productID
          ? { ...item, productQuantity: item.productQuantity - (item.productQuantity > 1 ? 1 : 0) }
          : item))
  }
  const handleIncrement = (productID: any) => {
    setProduct((product: any) =>
      product.map((item: any) =>
        productID === item.productID
          ? { ...item, productQuantity: item.productQuantity + 1 }
          : item))
  }

  const handleRemoveToCart = (e: any, cartID: any) => {
    e.preventDefault();
    setIsDelete(true)
    axios.delete(`${BASE_URL}/cart/${cartID}`)
      .then(response => {
        console.log(`Deleted post with ID ${cartID}`);
      })
      .catch(error => {
        console.error(error);
      });
  }
  return (

    <View style={styles.container}>
      <View style={{ backgroundColor: '#fff', elevation: 5 }}>
        <BtnGoBack />
      </View>
      <ScrollView style={{ backgroundColor: '#fff', }}>
        {
          product.map((item: any, index: number) => {
            return (
              <View key={index} style={{ margin: 10, flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ flex: 2 }}>
                  <Avatar size={60} source={{ uri: item.productImage }} />
                </View>
                <View style={{ flex: 6 }}>
                  <Text>{item.productTitle}</Text>
                </View>
                <View style={{ flex: 4, flexDirection: 'row', alignItems: 'center' }}>
                  <TouchableOpacity onPress={() => handleDecrement(item.productID)}>
                    <Text
                      style={{ paddingHorizontal: 12, paddingVertical: 5, backgroundColor: 'red' }}>
                      -
                    </Text>
                  </TouchableOpacity>
                  <TextInput style={{ backgroundColor: 'red' }}>{item.productQuantity}</TextInput>
                  <TouchableOpacity onPress={() => handleIncrement(item.productID)}>
                    <Text
                      style={{ paddingHorizontal: 10, paddingVertical: 5, backgroundColor: 'red' }}>
                      +
                    </Text>
                  </TouchableOpacity>
                </View>
                <View>
                  <TouchableOpacity onPress={(e) => handleRemoveToCart(e, item.cartID)}>
                    <AntDesign name='delete' size={20} />
                  </TouchableOpacity>
                </View>
              </View>
            )
          })
        }

      </ScrollView >
    </View >
  )
};


export default OrderScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1
  }
});
