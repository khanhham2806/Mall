import * as React from 'react'
import { Text, View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import ComponentProduct from '../../components/ComponentProduct';
import { useNavigation } from '@react-navigation/native';
import BtnGoBack from '../../components/BtnGoBack';
import { Avatar } from 'react-native-elements';
import BtnGoCart from '../../components/BtnGoCart';
const width = Dimensions.get('screen').width * 0.43;
const height = Dimensions.get('screen').height * 0.35;


const SearchProductScreen = ({ route }: any) => {
  const navigation: any = useNavigation();
  let { data, searchQuery } = route.params;
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
              return (
                <ComponentProduct
                  key={item.productID}
                  onPress={() => navigation.navigate('ProductInfo', { item: item })}
                  sourceImg={{ uri: item.productImage }}
                  title={item.productTitle}
                  actualPrice={item.productActualPrice}
                  oldPrice={item.productOldPrice}
                  discount={item.productDiscount}
                />
              )

            })}
          </View>
        </ScrollView>

      </>
      :
      <View>
        <BtnGoBack />
        <View style={{ alignItems: 'center' }}>
          <Avatar size={50} source={require('../../assets/images/noResult.png')} />
          <Text>No result for "{searchQuery}"</Text>
        </View>
      </View>


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

