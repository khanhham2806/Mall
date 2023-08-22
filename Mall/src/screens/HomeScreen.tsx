import * as React from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, StatusBar,Image, FlatList} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Search from './Search';
import Slider from '../components/Slider';
import Category from '../components/Category';
import Product from '../components/Product';
const HomeScreen = () => {
  return (
    <ScrollView style={styles.container}>
        <StatusBar
        animated={true}
        />
        {/* header */}
        <View style={styles.header}>
            <Text style={{color:'blue',textAlignVertical:'center',textAlign:'center'}}>Mega Mall</Text>
            
            <TouchableOpacity style={{padding:10,position:'absolute', right:0}}>
                <FontAwesome name='shopping-cart' size={20}/>
            </TouchableOpacity>
        </View>

       

        

        <View style={styles.elementsHeaderContainer}>
            {/* search */}
            <Search/>

            {/* banner */}
           <Slider/>

            {/* Category */}
           <Category/>

           
        </View>

        <View style={styles.elementsProductContainer} >
            {/* Feature Product */}
            <Product/>

        </View>


    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor:'#ffffff'
  },
  header:{
    position:'relative',
    padding:10,
    borderBottomColor:'#fafafa',
    borderBottomWidth:2
  },
  elementsHeaderContainer:{
    padding:20,
  },
  elementsProductContainer:{
    padding:20,
    backgroundColor: '#EDEDED'
  }
  
});
