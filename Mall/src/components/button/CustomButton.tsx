import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';



const CustomButton = ({ width, onPress, text, bgColor, txtColor, borderColor, height, margin, disabled }: any) => {
  return (
    <TouchableOpacity onPress={onPress}
      disabled={disabled}
      style={[
        styles.container,
        width ? { width: width } : {},
        height ? { height: height } : {},
        bgColor ? { backgroundColor: bgColor } : { backgroundColor: '#3669C9' },
        margin ? { margin: margin } : {},
      ]}>
      <Text
        style={
          txtColor ? { color: txtColor } : { color: '#fff' }
        }>{text}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 5
  },

});
