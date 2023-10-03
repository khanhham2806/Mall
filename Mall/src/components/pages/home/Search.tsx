import * as React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Avatar } from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import axios from 'axios';

import useDebounce from '../../../hooks/useDebounce'
import { BASE_URL } from '../../../../config';
import BtnGoCart from '../../button/BtnGoCart';

const Search = () => {
  const navigation: any = useNavigation();
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('')
  const searchQueryDebounce = useDebounce(searchQuery)
  const handleOnChangeSearch = (query: string) => {
    if (!query.startsWith(' ')) {
      setSearchQuery(query);
    }
  }

  const handleOnPressSearch = () => {
    navigation.navigate('SearchProduct', { data: results, searchQuery: searchQueryDebounce })
    setSearchQuery('')
  }
  useEffect(() => {
    console.log('Debounced search term:', searchQueryDebounce);
  }, [searchQueryDebounce]);

  useEffect(() => {
    console.log('render');
    const getData = async () => {
      const res = await axios.get(`${BASE_URL}/product`)
      let dataProducts = res && res.data ? res.data.data : [];
      setData(dataProducts);
    }
    getData()
  }, []);
  const results = data.filter((result: any) => {
    return result && result.productTitle.toLowerCase().includes(searchQueryDebounce.toLowerCase()) || result.productCategory.toLowerCase().includes(searchQueryDebounce.toLowerCase())
  })

  const [width, setWidth] = useState<any>('85%')
  const [btnCart, setBtnCart] = useState(true)
  const handleOnFocus = () => {
    setWidth('100%')
    setBtnCart(false)
  }
  const handleOnBlur = () => {
    setWidth('85%')
    setBtnCart(true)
  }
  return (
    <>
      <View style={{ position: 'relative', width: width }}>
        <View style={styles.input}>
          <TextInput onChangeText={handleOnChangeSearch} onFocus={handleOnFocus} onBlur={handleOnBlur} value={searchQuery} placeholder='Search' style={styles.textInput} />
          {(searchQuery !== '') &&
            < TouchableOpacity style={{ position: 'absolute', right: 0, top: 0 }} onPress={handleOnPressSearch} >
              <FontAwesome name='search' style={styles.btnInput} size={20} />
            </TouchableOpacity>
          }
        </View>
        {
          (searchQuery !== '')
          &&
          <ScrollView nestedScrollEnabled={true} style={{ position: 'absolute', top: 50, zIndex: 100, width: '100%', maxHeight: 180, backgroundColor: '#ededed', borderRadius: 10, marginTop: 5 }}>
            {results.map((item: any) => {
              const arrLinkImage = item.productImageUrlEnd.split(',')

              return (
                <View style={{ marginHorizontal: 10, marginVertical: 5 }} key={item.productID}>
                  <TouchableOpacity onPress={() => navigation.navigate('ProductInfo', { item: item })} style={{ borderRadius: 10, backgroundColor: '#fff', padding: 5, flexDirection: 'row', alignItems: 'center' }}>
                    <Avatar source={{ uri: item.productImageUrlStart.concat(arrLinkImage[0]) }} />
                    <Text style={{ marginLeft: 10 }}>{item.productTitle}</Text>
                  </TouchableOpacity>
                </View>
              )
            })}
          </ScrollView>
        }

      </View >
      {btnCart &&
        <View>
          <BtnGoCart />
        </View>
      }
    </>
  );
};

export default Search;

const styles = StyleSheet.create({
  input: {
    alignItems: 'center',
    backgroundColor: '#ededed',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 10,
    height: 40,
  },
  textInput: {
    marginHorizontal: 10,
    width: '100%'
  },
  btnInput: {
    textAlign: 'center',
    padding: 10
  }

});
