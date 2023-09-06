import * as React from 'react';
import { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import axios from 'axios';
import { BASE_URL } from '../../../config';
import { useNavigation } from '@react-navigation/native';
import { Avatar } from 'react-native-elements';
const Search = () => {
  const navigation: any = useNavigation();
  const [searchQuery, setSearchQuery] = useState('')
  const [data, setData] = useState([]);

  const handleOnChangeSearch = (query: string) => {
    if (!query.startsWith(' ')) {
      setSearchQuery(query);
    }
  }
  const handleOnSubmitEditing = () => {
    navigation.navigate('SearchProduct', { data: results, searchQuery: searchQuery })
  }
  const handleOnPressSearch = () => {
    navigation.navigate('SearchProduct', { data: results, searchQuery: searchQuery })
  }
  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(`${BASE_URL}/product`)
      let dataProducts = res && res.data ? res.data.data : [];
      setData(dataProducts);

    }
    getData()
  }, []);

  const results = data.filter((result: any) => {
    return result && result.productTitle.toLowerCase().includes(searchQuery.toLowerCase()) || result.productCategory.toLowerCase().includes(searchQuery.toLowerCase())
  })

  return (
    <View style={{ position: 'relative' }}>
      <View style={styles.input}>
        <TextInput onChangeText={handleOnChangeSearch} onSubmitEditing={handleOnSubmitEditing} value={searchQuery} placeholder='Search' style={styles.textInput} />
        <TouchableOpacity onPress={handleOnPressSearch} style={{ flex: 1 }}>
          <FontAwesome name='search' style={styles.btnInput} size={20} />
        </TouchableOpacity>
      </View>
      {(searchQuery !== '')
        ?
        <ScrollView nestedScrollEnabled={true} style={{ position: 'absolute', top: 50, zIndex: 100, width: '100%', maxHeight: 150, padding: 10, backgroundColor: '#ededed', borderRadius: 10, marginTop: 5 }}>
          {results.map((item: any) => {
            return (
              <View style={{ marginHorizontal: 10, marginVertical: 5 }} key={item.productID}>
                <TouchableOpacity onPress={() => navigation.navigate('ProductInfo', { item: item })} style={{ borderRadius: 10, backgroundColor: '#fff', padding: 5, flexDirection: 'row', alignItems: 'center' }}>
                  <Avatar source={{ uri: item.productImage }} />
                  <Text style={{ marginLeft: 10 }}>{item.productTitle}</Text>
                </TouchableOpacity>
              </View>
            )
          })}
        </ScrollView>
        :
        <></>
      }

    </View >
  );
};

export default Search;

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#EDEDED',
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 10
  },
  textInput: {
    width: '80%',
    marginHorizontal: 10
  },
  btnInput: {
    textAlign: 'center',
    padding: 10
  }

});
