import * as React from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, StatusBar, Image, FlatList, SafeAreaView } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Search from './Search';
import Slider from '../../components/Slider';
import ListCategory from './ListCategory';
import ListProduct from './ListProduct';
import { Avatar } from 'react-native-elements';
import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import BtnGoCart from '../../components/BtnGoCart';
import BtnGoChat from '../../components/BtnGoChat';

import axios from 'axios';
import { BASE_URL } from '../../../config';
import { useNavigation, useIsFocused } from '@react-navigation/native'

const HomeScreen = ({ navigation }: any) => {
  const { userInfo } = useContext(AuthContext);
  const [productCart, setProductCart] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false)
  const isFocused = useIsFocused();

  // console.log('isloading', isLoading);
  // const isFocused = useIsFocused();
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
  const value = productCart.reduce((accumulator: any, item: any) => accumulator + item.productQuantity, 0)
  // console.log(value);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.hiUser}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Avatar
            size={30}
            source={{ uri: userInfo.user.AvatarImageName }}
          />
          <Text style={{ marginLeft: 10 }}>Hi, {userInfo.user.FullName}</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
          <BtnGoChat />
          <BtnGoCart value={value} />
        </View>
      </View>
      <ScrollView nestedScrollEnabled={false} >


        {/* search */}
        <View style={styles.elementsHeaderContainer}>
          <Search />
        </View>

        {/* banner */}
        <View >
          <Slider />
        </View>

        {/* Category */}
        <View style={styles.elementsHeaderContainer}>
          <ListCategory />
        </View>

        <View style={styles.elementsProductContainer} >
          {/* Feature Product */}
          <ListProduct />

        </View>


      </ScrollView>
    </SafeAreaView>

  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
  },
  hiUser: {
    paddingHorizontal: 10,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    textAlignVertical: 'center',
    alignItems: 'center',
  },

  elementsHeaderContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  elementsProductContainer: {
    padding: 20,
    backgroundColor: '#EDEDED',
    marginBottom: 50
  }

});
