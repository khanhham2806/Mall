import * as React from 'react'
import { Text, View, StyleSheet, Dimensions, ScrollView, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Avatar } from 'react-native-elements';

import BtnGoBack from '../components/button/BtnGoBack';
import BtnGoCart from '../components/button/BtnGoCart';
import ComponentProduct from '../components/pages/home/ComponentProduct';
import VND from '../function/VND';


const width = Dimensions.get('screen').width * 0.43;
const height = Dimensions.get('screen').height * 0.35;

const SearchProductScreen = ({ route }: any) => {
  const navigation: any = useNavigation();
  let { data, searchQuery } = route.params;
  // console.log(data);

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
          <BtnGoCart />
        </View>
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
          <View style={[{ flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap', rowGap: 20 }]}>
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
                  discount={+((item.productOldPrice - item.productActualPrice) / item.productOldPrice).toFixed(2) * 100}
                />
              )

            })}
          </View>
        </ScrollView>
      </>
      :
      <>
        <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'space-between', margin: 10 }}>
          <BtnGoBack />
          <Text style={{
            fontWeight: 'bold',
            fontSize: 18,
          }}>No Result</Text>
          <BtnGoCart />
        </View>
        <View style={{ alignItems: 'center', marginTop: 200 }}>
          <Avatar size={100} source={require('../assets/images/noResult.png')} />
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

