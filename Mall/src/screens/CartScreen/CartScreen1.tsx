import * as React from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, Modal, Alert } from 'react-native';
import axios from 'axios';
import { useState, useEffect, useReducer } from 'react'
import { Avatar } from 'react-native-elements';
import { ListItem, Button } from '@rneui/themed';
import Toast from 'react-native-toast-message';

import { BASE_URL } from '../../../config';
import BtnGoBack from '../../components/BtnGoBack';
import CustomButton from '../../components/CustomButton';
import BtnGoChat from '../../components/BtnGoChat';
import VND from '../../components/VND';
import { incrementQuantity, decrementQuantity } from '../../function/cart'


const OrderScreen = ({ navigation }: any) => {
  // const navigation = useNavigation();
  // const [product, setProduct] = useState<any>([]);

  const [isLoading, setIsLoading] = useState(false);
  const initState = {
    loading: false,
    data: [],
    error: null
  }
  const cartReducer = (state: any, action: any) => {
    switch (action.type) {
      case 'GET_CART_REQUEST':
        return {
          ...state,
          loading: true,
        }
      case 'GET_CART_SUCCESS':
        return {
          ...state,
          loading: false,
          data: action.data
        }
      case 'GET_CART_ERROR':
        return {
          ...state,
          loading: false,
          data: []
        }
      case 'INCREMENT_QUANTITY':
        return {
          ...state,
          loading: false,
          data: action.data
        }
      case 'DECREMENT_QUANTITY':
        return {
          ...state,
          loading: false,
          data: action.data
        }
      case 'DELETE_FROM_CART':
        console.log(state.data)
        return {
          ...state,
          loading: false,
          data: []
        }
      default:
        return
    }
  }
  const [cart, cartDispatch] = useReducer(cartReducer, initState)
  const product = cart.data

  const total = product.reduce((accumulator: any, item: any) => accumulator + item.productActualPrice * item.productQuantity, 0)
  useEffect(() => {
    getData()
  }, [])
  const getData = async () => {
    cartDispatch({
      type: 'GET_CART_REQUEST'
    });
    setTimeout(() => {

      fetch(`${BASE_URL}/cart`)
        .then(res => res.json())
        .then(res => {

          cartDispatch({
            type: 'GET_CART_SUCCESS',
            data: res.data
          })
        })
        .catch(err => {
          cartDispatch({
            type: 'GET_CART_ERROR',
            data: err
          })
        })
    }, 100);
  }

  const handleDecrement = (productID: any, index: any) => {
    // console.log(productID);

    // cartDispatch({
    //   type: 'DECREMENT_QUANTITY',
    //   data: 
    // })

  }
  const handleIncrement = (productID: any, index: any) => {
    cartDispatch({
      type: 'INCREMENT_QUANTITY',
      data: product
    })
    product.map((item: any) =>
      (productID === item.productID)
        ? { ...item, productQuantity: item.productQuantity + 1 }
        : item)
    incrementQuantity(productID)
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
    removeToCart(cartID)
    Toast.show({
      type: 'success',
      text1: 'Remove successfully',
      autoHide: true,
      visibilityTime: 3000,
      position: 'bottom',
      bottomOffset: 80
    })
    setIsLoading(false)

  }
  const handleCheckout = () => {
    navigation.navigate('Checkout', { product: product })
  }



  return (
    <View style={styles.container}>
      <View style={{ padding: 10, backgroundColor: '#fff', elevation: 5, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
        <BtnGoBack />
        <View>
          <Text style={{ fontWeight: 'bold', fontSize: 18, }}>Cart</Text>
        </View>
        <BtnGoChat />
      </View>
      {cart.loading
        ? <Text>Loading...</Text>
        :
        <ScrollView style={{ backgroundColor: '#fff', }}>
          {(product.length === 0)
            ?
            <View style={{ alignItems: 'center', width: '100%', height: 500, marginTop: 100 }}>
              <View >
                <Avatar size={150} source={require('../../assets/images/cart/empty_cart-512.webp')} />
              </View>
              <View >
                <Text style={{ fontSize: 20, fontWeight: 'bold', margin: 20 }}>
                  Your Cart Is Empty
                </Text>
              </View>
              <CustomButton
                bgColor='#3669C9'
                txtColor='#fff'
                onPress={() => { navigation.navigate('TabNav') }}
                text='Shop now'
                width='40%' />
            </View>
            :
            product.map((item: any, index: number) => {
              const arrLinkImage = item.productImageUrlEnd.split(',')
              return (
                <ListItem.Swipeable key={index}
                  bottomDivider
                  leftWidth={0}
                  rightWidth={70}
                  rightContent={
                    <Button
                      onPress={() => handleRemoveToCart(item.cartID, product)}

                      icon={{ name: 'delete', color: 'white' }}
                      buttonStyle={{ minHeight: '100%', backgroundColor: '#FE3A30' }}
                      titleStyle={{ fontSize: 14 }}
                    />
                  }>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ flex: 2 }}>
                      <Avatar size={60} source={{ uri: item.productImageUrlStart.concat(arrLinkImage[0]) }}
                      />
                    </View>
                    <View style={{ flex: 6, flexDirection: 'column', maxWidth: 200 }}>
                      <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.productTitle}</Text>
                      <Text>{VND.format(item.productActualPrice)}</Text>
                    </View>
                    <View style={{ flex: 2, flexDirection: 'row', alignItems: 'center' }}>
                      <TouchableOpacity onPress={() => handleDecrement(item.productID, index)}>
                        <Text
                          style={{ paddingHorizontal: 7, paddingVertical: 3, borderWidth: 1 }}>
                          -
                        </Text>
                      </TouchableOpacity>
                      <Text style={{ borderWidth: 1, paddingHorizontal: 6, paddingVertical: 3, }}>{item.productQuantity}</Text>
                      <TouchableOpacity onPress={() => handleIncrement(item.productID, index)}>
                        <Text
                          style={{ paddingHorizontal: 6, paddingVertical: 3, borderWidth: 1 }}>
                          +
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <ListItem.Chevron />

                  </View>
                </ListItem.Swipeable>

              )
            })
          }
        </ScrollView >
      }

      <Toast></Toast>

      {(product.length !== 0)
        ?
        <View style={{ flexDirection: 'row', margin: 10, justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Total: {VND.format(total)}</Text>
          <CustomButton
            onPress={() => { handleCheckout() }}
            text='Checkout' width='30%' bgColor='#3669C9' txtColor='#fff' />
        </View>
        : <></>
      }
    </View >
  )
};


export default OrderScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1
  },
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
