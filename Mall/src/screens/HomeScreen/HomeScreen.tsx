import * as React from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, StatusBar, Image, FlatList } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Search from './Search';
import Slider from '../../components/Slider';
import ListCategory from './ListCategory';
import ListProduct from './ListProduct';
import { Avatar } from 'react-native-elements';
import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const HomeScreen = ({ navigation }: any) => {
  const { userInfo } = useContext(AuthContext);

  return (
    <ScrollView style={styles.container}>
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
        <ListCategory />
      </View>

      <View style={styles.elementsProductContainer} >
        {/* Feature Product */}
        <ListProduct />

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
