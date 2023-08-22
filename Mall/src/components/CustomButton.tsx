import * as React from 'react';
import { Text, View, StyleSheet,Pressable } from 'react-native';



const CustomButton = ({onPress,text,bgColor,txtColor}:any) => {
  return (
    <Pressable onPress={onPress}
     style={[
      styles.container,
      bgColor ? {backgroundColor:bgColor} :{}
      ]}>
        <Text 
        style={[styles.text,
          txtColor ? {color:txtColor} :{}
        ]}>{text}
        </Text>
    </Pressable>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    alignItems:'center',
    backgroundColor: '#0190f3',
    paddingVertical:10,
    borderRadius:10,
    marginTop: 10
  },
  text:{
    color:'#fff',
  }
});
