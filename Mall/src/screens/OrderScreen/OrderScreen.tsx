import * as React from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { Avatar } from 'react-native-elements';
import BtnGoBack from '../../components/BtnGoBack';
import { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { BASE_URL } from '../../../config';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import BtnGoChat from '../../components/BtnGoChat';
import VND from '../../components/VND';
import { incrementQuantity, decrementQuantity } from '../../function/cart'

const OrderScreen = ({ navigation }: any) => {
  // const navigation = useNavigation();
  const [product, setProduct] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const total = product.reduce((accumulator: any, item: any) => accumulator + item.productActualPrice * item.productQuantity, 0)
  useEffect(() => {
    // const unsub = navigation.addListener('focus', () => {
    getData()
    // })
  }, [isLoading])
  const getData = async () => {
    setIsLoading(true)
    const res = await axios.get(`${BASE_URL}/cart`)
    // console.log(res.data.data);
    let dataOrder = res && res.data ? res.data.data : [];
    setProduct(dataOrder);

  }

  const handleDecrement = (productID: any, index: any) => {
    setIsLoading(true)
    setProduct((product: any) =>
      product.map((item: any) =>
        productID === item.productID
          ? {
            ...item, productQuantity: item.productQuantity - (item.productQuantity > 1 ? 1 : 0)
          }
          : item))
    if ((product[index].productQuantity > 1)) {
      decrementQuantity(productID)
    }
    setIsLoading(false)

  }
  const handleIncrement = (productID: any, index: any) => {
    setIsLoading(true)
    setProduct((product: any) =>
      product.map((item: any) =>
        (productID === item.productID)
          ? { ...item, productQuantity: item.productQuantity + 1 }
          : item))
    incrementQuantity(productID)

    setIsLoading(false)
  }
  const removeToCart = (cartID: any) => {
    axios.delete(`${BASE_URL}/cart/${cartID}`)
      .then(response => {
        console.log(`Deleted post with ID ${cartID}`);
      })
      .catch(error => {
        console.error(error);
      });
  }
  const handleRemoveToCart = async (cartID: any, product: any) => {
    setIsLoading(true)
    await product.forEach((item: any, index: number) => {
      if (item.cartID == cartID) {
        product.splice(index, 1)
      }
    });
    removeToCart(cartID);
    setProduct(product)
    setIsLoading(false)

  }

  return (

    <View style={styles.container}>
      <View style={{ padding: 10, backgroundColor: '#fff', elevation: 5, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
        <BtnGoBack />
        <View>
          <Text>Cart</Text>
        </View>
        <BtnGoChat />
      </View>
      <ScrollView style={{ backgroundColor: '#fff', }}>

        {(product.length === 0) ? <Text>khong có gi</Text>
          :
          product.map((item: any, index: number) => {
            // console.log(item);
            return (
              <View key={index} style={{ margin: 10, flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ flex: 2 }}>
                  <Avatar size={60} source={{ uri: item.productImage }} />
                </View>
                <View style={{ flex: 6, flexDirection: 'column' }}>
                  <Text>{item.productTitle}</Text>
                  <Text>{VND.format(item.productActualPrice * item.productQuantity)}</Text>
                </View>
                <View style={{ flex: 4, flexDirection: 'row', alignItems: 'center' }}>
                  <TouchableOpacity onPress={() => handleDecrement(item.productID, index)}>
                    <Text
                      style={{ paddingHorizontal: 12, paddingVertical: 5, borderWidth: 1 }}>
                      -
                    </Text>
                  </TouchableOpacity>
                  <Text style={{ borderWidth: 1, paddingHorizontal: 10, paddingVertical: 5, }}>{item.productQuantity}</Text>
                  <TouchableOpacity onPress={() => handleIncrement(item.productID, index)}>
                    <Text
                      style={{ paddingHorizontal: 10, paddingVertical: 5, borderWidth: 1 }}>
                      +
                    </Text>
                  </TouchableOpacity>
                </View>
                <View>
                  <TouchableOpacity onPress={(e) => handleRemoveToCart(item.cartID, product)}>
                    <AntDesign name='delete' size={20} />
                  </TouchableOpacity>
                </View>
              </View>
            )
          })
        }

      </ScrollView >
      <View style={{ margin: 10, flexDirection: 'row', justifyContent: 'flex-end' }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Total: {VND.format(total)}</Text>
      </View>
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
