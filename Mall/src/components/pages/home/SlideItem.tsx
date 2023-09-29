import * as React from 'react';
import { Image, StyleSheet, Dimensions, Pressable, } from 'react-native';


const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height * 0.3

const SlideItem = ({ item }: any) => {
  return (
    <Pressable style={styles.container} >
      <Image style={styles.img} source={item.img} />
    </Pressable>
  );
};

export default SlideItem;

const styles = StyleSheet.create({
  container: {
    width, height,
    alignItems: 'center',
  },
  img: {
    flex: 1,
    width: '90%',
    resizeMode: 'contain',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ededed'
  }
});
