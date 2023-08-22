import * as React from 'react';
import { Text, View, StyleSheet,TouchableOpacity, Image,Dimensions} from 'react-native';
import product from '../assets/data/product';
import { Avatar } from '@rneui/themed';

const width = Dimensions.get('screen').width *0.43;
const height = Dimensions.get('screen').height*0.35;
const Product = () => {
  return (
    <View>
    <Text style={styles.viewContent}>Products</Text>
    <View style={[{flexDirection:'row',justifyContent:'space-between',flexWrap:'wrap',rowGap: 20}]}>
        {product.map((item:any)=>{
                return(
                    <TouchableOpacity key={item.id} onPress={()=>{console.log(`${item.category}`);
                    }} style={styles.product}>
                        <Avatar source={item.img} size={width*0.9}/>
                        <Text style={{padding:5,fontWeight:'bold'}}>{item.title}</Text>
                        <View style={{width,display:'flex',flexDirection:'row',justifyContent:'space-evenly',alignItems:'center'}}>
                            <Text style={{fontSize:10,color:'#FE3A30'}}>{item.actualPrice +' '+ item.currency}</Text>
                            <Text style={{fontSize:8,textDecorationLine:'line-through'}}>{item.oldPrice+' '+ item.currency} </Text>
                            
                        </View>
                    </TouchableOpacity>
                    
                    
                )
          
        })}
    </View>
    </View>
  );
};

export default Product;

const styles = StyleSheet.create({
    viewContent:{
        fontSize:20,
        fontWeight:'bold',
        textShadowColor:'red',
        marginVertical:10
    },
    product:{
        borderRadius:10,
        borderColor:'#EDEDED',
        backgroundColor:'#fafafa',
        width, 
        height,
        alignItems:'center'
    }
});
