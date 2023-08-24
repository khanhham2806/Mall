import * as React from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, StatusBar, Image, FlatList } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Search from './Search';
import Slider from '../components/Slider';
import Category from '../components/Category';
import Product from '../components/Product';
import { Avatar } from 'react-native-elements';

import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import ProductInfoScreen from './ProductInfoScreen';

const HomeScreen = ({ navigation }: any) => {
  const { userInfo } = useContext(AuthContext);
  console.log(userInfo.user);

  return (
    <ScrollView style={styles.container}>
      <StatusBar
        animated={true}
      />
      {/* header */}
      <View style={styles.header}>

        <Text style={{ color: 'blue', textAlignVertical: 'center', textAlign: 'center' }}>Mega Mall</Text>

        <TouchableOpacity style={{ padding: 10, position: 'absolute', right: 0 }}>
          <FontAwesome name='shopping-cart' size={20} />

        </TouchableOpacity>

      </View>

      <View style={styles.hiUser}>
        <Text>Hi, {userInfo.user.FullName}</Text>

        <Avatar
          size={30}
          source={{ uri: userInfo.user.AvatarImageName }}
        />

      </View>

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
        <Category />
      </View>

      <View style={styles.elementsProductContainer} >
        {/* Feature Product */}
        <Product />

      </View>


    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff'
  },
  hiUser: {
    paddingHorizontal: 20,
    paddingTop: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    textAlignVertical: 'center',
    alignItems: 'center'
  },
  header: {

    position: 'relative',
    padding: 10,
    borderBottomColor: '#fafafa',
    borderBottomWidth: 2
  },
  elementsHeaderContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  elementsProductContainer: {
    padding: 20,
    backgroundColor: '#EDEDED'
  }

});
