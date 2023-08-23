import * as React from 'react';
import { Image, StyleSheet,Dimensions, TouchableOpacity, } from 'react-native';


const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height *0.3

const SlideItem = ({item}:any) => {
  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.container} >
      
        <Image style={styles.img} source={item.img}/>
      
    </TouchableOpacity>
  );
};

export default SlideItem;

const styles = StyleSheet.create({
    container:{
        width,height,
        alignItems:'center',
        marginVertical: 10
    },
    img:{
        flex:1,
        width:'90%',
        resizeMode:'contain',
        borderRadius:10
        }
});
