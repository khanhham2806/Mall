import * as React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import SlideItem from './SlideItem';
import banners from '../assets/data/banner';

const Slider = () => {
  return (
        <FlatList data={banners} 
        renderItem={({item})=><SlideItem item={item}/>} 
        horizontal 
        pagingEnabled 
        snapToAlignment='center'
        showsHorizontalScrollIndicator={false}
       
        />
  );
};

export default Slider;