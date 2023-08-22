import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import {useContext} from 'react'


const UserScreen = () => {
  const {logout} = useContext(AuthContext);
  const handleOnPressLogout =()=>{
    logout()
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleOnPressLogout} >
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UserScreen;

const styles = StyleSheet.create({
  container: {}
});
