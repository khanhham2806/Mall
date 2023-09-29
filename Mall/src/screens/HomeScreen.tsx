import * as React from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import Search from '../components/pages/home/Search';
import Slider from '../components/pages/home/Slider';
import BtnGoCart from '../components/button/BtnGoCart';
import ListCategory from '../components/pages/home/ListCategory';
import ListProduct from '../components/pages/home/ListProduct';
const HomeScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <ScrollView nestedScrollEnabled={false} >
        {/* search */}
        <View style={styles.elementsHeaderContainer}>
          <Search />
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
            <BtnGoCart />
          </View>
        </View>

        {/* banner */}
        <View >
          <Slider />
        </View>

        {/* Category */}
        <View style={styles.elementsHeaderContainer}>
          <ListCategory />
        </View>

        {/* Feature Product */}
        <View style={styles.elementsProductContainer} >
          <ListProduct />
        </View>
      </ScrollView>
    </View>

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
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  elementsProductContainer: {
    padding: 20,
    backgroundColor: '#EDEDED',
  }

});
