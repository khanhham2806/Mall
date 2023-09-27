import * as React from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, Modal, Alert } from 'react-native';
import { useEffect } from 'react'
import { Avatar } from 'react-native-elements';
import { ListItem, Button } from '@rneui/themed';
import Toast from 'react-native-toast-message';

import BtnGoBack from '../../components/BtnGoBack';
import CustomButton from '../../components/CustomButton';
import BtnGoChat from '../../components/BtnGoChat';
import VND from '../../components/VND';

import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext'
import { getListCart, incrementQuantity, decrementQuantity, removeFromCart } from '../../redux/actions/action';
import { useSelector } from 'react-redux'
import store from '../../redux/store';

const OrderScreen = ({ navigation }: any) => {
  const { userInfo } = useContext(AuthContext);


  const fetchData = async () => {
    store.dispatch(getListCart(userInfo.user.accountID));
  };
  useEffect(() => {
    fetchData();
  }, []);
  const product: any = useSelector<any>(state => state.CartReducer.carts);

  const total = product.reduce((accumulator: any, item: any) => accumulator + item.productActualPrice * item.productQuantity, 0)

  const handleDecrement = (cartID: any, item: any) => {
    store.dispatch(decrementQuantity(cartID, item));
  }
  const handleIncrement = async (cartID: any, item: any) => {
    store.dispatch(incrementQuantity(cartID, item));
  }
  const handleRemoveFromCart = async (cartID: any) => {
    store.dispatch(removeFromCart(cartID))
    Toast.show({
      type: 'success',
      text1: 'Remove successfully',
      autoHide: true,
      visibilityTime: 3000,
      position: 'bottom',
      bottomOffset: 80
    })
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

      <ScrollView style={{ backgroundColor: '#fff', }}>
        {(!product.length)
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
            // console.log(arrLinkImage);
            return (
              <ListItem.Swipeable key={index}
                bottomDivider
                leftWidth={0}
                rightWidth={70}
                rightContent={
                  <Button
                    onPress={() => handleRemoveFromCart(item.cartID)}
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
                    <TouchableOpacity onPress={() => handleDecrement(item.cartID, item)}>
                      <Text
                        style={{ paddingHorizontal: 7, paddingVertical: 3, borderWidth: 1 }}>
                        -
                      </Text>
                    </TouchableOpacity>
                    <Text style={{ borderWidth: 1, paddingHorizontal: 6, paddingVertical: 3, }}>{item.productQuantity}</Text>
                    <TouchableOpacity onPress={() => handleIncrement(item.cartID, item)}>
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


      <Toast></Toast>

      {(product.length)
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
