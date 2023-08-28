import * as React from 'react';
import { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import axios from 'axios';
import { BASE_URL } from '../../../config';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('')
  // console.log(searchQuery);
  const [data, setData] = useState([]);

  const handleOnChangeSearch = (query: string) => {
    setSearchQuery(query)
  }
  const handleOnPressSearch = () => {
    console.log(searchQuery);
  }
  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(`${BASE_URL}/product/${searchQuery}`)
      // console.log(res.data.data);

      let dataProducts = res && res.data ? res.data.data : [];
      setData(dataProducts);
      // console.log(dataProducts);

    }

    getData()
  }, [searchQuery]);
  return (
    <View style={styles.input}>
      <TextInput onChangeText={handleOnChangeSearch} value={searchQuery} placeholder='Search' style={styles.textInput} />
      <TouchableOpacity onPress={handleOnPressSearch} style={{ flex: 1 }}>
        <FontAwesome name='search' style={styles.btnInput} size={20} />
      </TouchableOpacity>
    </View>
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
