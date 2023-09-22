import * as React from 'react'
import { Text, View, StyleSheet, Dimensions, ScrollView, FlatList } from 'react-native';
import ComponentProduct from '../../components/ComponentProduct';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import BtnGoBack from '../../components/BtnGoBack';
import { Avatar } from 'react-native-elements';
import BtnGoCart from '../../components/BtnGoCart';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../../config';
import VND from '../../components/VND';
const width = Dimensions.get('screen').width * 0.43;
const height = Dimensions.get('screen').height * 0.35;


const SearchProductScreen = ({ route }: any) => {
  const navigation: any = useNavigation();
  let { data, searchQuery } = route.params;
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
    (data.length !== 0)
      ?
      <>
        <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'space-between', margin: 10 }}>
          <BtnGoBack />
          <Text style={{
            fontWeight: 'bold',
            fontSize: 18,
          }}>Searching for "{searchQuery}"</Text>
          <BtnGoCart value={value} />
        </View>
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
          <View style={[{ flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }]}>
            {data.map((item: any) => {
              const arrLinkImage = item.productImageUrlEnd.split(',')
              return (
                <ComponentProduct
                  key={item.productID}
                  onPress={() => navigation.navigate('ProductInfo', { item: item })}
                  sourceImg={{ uri: item.productImageUrlStart.concat(arrLinkImage[0]) }}
                  title={item.productTitle}
                  actualPrice={VND.format(item.productActualPrice)}
                  oldPrice={VND.format(item.productOldPrice)}
                  discount={item.productDiscount}
                />
              )

            })}
          </View>
        </ScrollView>
        {/* <View style={styles.container}>

          <FlatList
            data={data}
            keyExtractor={(item: any) => item.productID}
            numColumns={2}
            scrollEnabled={false}
            renderItem={({ item }: any) => {
              const arrLinkImage = item.productImageUrlEnd.split(',')
              return (
                <ComponentProduct
                  onPress={() => navigation.navigate('ProductInfo', { item: item })}
                  sourceImg={{ uri: item.productImageUrlStart.concat(arrLinkImage[0]) }}
                  title={item.productTitle}
                  actualPrice={VND.format(item.productActualPrice)}
                  oldPrice={VND.format(item.productOldPrice)}
                  discount={+((item.productOldPrice - item.productActualPrice) / item.productOldPrice).toFixed(2) * 100}
                  inCart={item.inCart}
                />
              )
            }}
          >

          </FlatList>
        </View> */}

      </>
      :
      <>
        <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'space-between', margin: 10 }}>
          <BtnGoBack />
          <BtnGoCart value={value} />
        </View>
        <View style={{ alignItems: 'center', marginTop: 200 }}>
          <Avatar size={100} source={require('../../assets/images/noResult.png')} />
          <Text>No result for "{searchQuery}"</Text>
        </View>
      </>


  )

};

export default SearchProductScreen;

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

