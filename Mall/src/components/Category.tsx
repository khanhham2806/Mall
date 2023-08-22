import * as React from 'react';
import {  View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import category from '../assets/data/category';

const Category = () => {
  return (
    <View>
    <Text style={styles.viewContent}>Categories</Text>
    <View style={[{flexDirection:'row',justifyContent:'space-around'}]}>
        {category.map((item:any)=>{
                return(
                    <TouchableOpacity key={item.id} onPress={()=>{console.log(`${item.title}`);
                    }} style={{width:'20%',alignItems:'center'}}>
                        <Image source={item.img} style={{width:50,height:50,resizeMode:'contain'}}/>
                        <Text>{item.title}</Text>
                    </TouchableOpacity>
                )
          
        })}
    </View>
    </View>

  );
};

export default Category;

const styles = StyleSheet.create({
    viewContent:{
        fontSize:20,
        fontWeight:'bold',
        marginVertical:10
    }
});
