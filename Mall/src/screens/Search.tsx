import * as React from 'react';
import { useState } from 'react';
import { Text, View, StyleSheet,TextInput, TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const Search = () => {
  const [searchQuery,setSearchQuery] = useState('')
  // console.log(searchQuery);
  const handleOnChangeSearch =(query:string)=>{
    // console.log(query);
    setSearchQuery(query)
  }
  const handleOnPressSearch =()=>{
    console.log('handleOnPressSearch');
  }
  return (
    <View style={styles.input}>
      <TextInput onChangeText={handleOnChangeSearch} value={searchQuery} placeholder='Search'  style={styles.textInput}/>
        <TouchableOpacity onPress={handleOnPressSearch} style={{flex:1}}>
            <FontAwesome name='search' style={styles.btnInput} size={20}/>
        </TouchableOpacity>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  input:{
    backgroundColor:'#EDEDED',
    display:'flex',
    flexDirection:'row',
    borderRadius: 10
  },
  textInput:{
    width: '80%',
    marginHorizontal: 10
  },
  btnInput:{
    textAlign:'center',
    padding:10
  }

});
