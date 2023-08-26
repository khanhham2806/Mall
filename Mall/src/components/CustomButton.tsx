import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';



const CustomButton = ({ width, onPress, text, bgColor, txtColor, borderColor }: any) => {
  return (
    <TouchableOpacity onPress={onPress}
      style={[
        styles.container,
        width ? { width: width } : {},
        bgColor ? { backgroundColor: bgColor } : {},
        borderColor ? { borderColor: borderColor } : { borderColor: bgColor },
      ]}>
      <Text
        style={
          txtColor ? { color: txtColor } : {}
        }>{text}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderStyle: 'solid',
    alignItems: 'center',
    backgroundColor: '#0190f3',
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 10
  },

});
