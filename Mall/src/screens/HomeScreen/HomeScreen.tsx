import * as React from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, StatusBar, Image, FlatList, SafeAreaView } from 'react-native';
import Search from './Search';
import Slider from '../../components/Slider';
import ListCategory from './ListCategory';
import ListProduct from './ListProduct';
import BtnGoCart from '../../components/BtnGoCart';
const HomeScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView nestedScrollEnabled={false} >
        {/* search */}
        <View style={styles.elementsHeaderContainer}>
          <Search />
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
            <BtnGoCart />
            {/* <BtnGoCart value={value} /> */}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  elementsProductContainer: {
    padding: 20,
    backgroundColor: '#EDEDED',
    marginBottom: 50
  }

});
