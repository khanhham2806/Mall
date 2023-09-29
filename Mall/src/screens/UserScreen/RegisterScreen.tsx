import * as React from 'react';
import { Text, View, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import CustomButton from '../../components/button/CustomButton';
import { Avatar } from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { useState } from 'react'
const Register = ({ navigation }: any) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleOnChangeUsername = (e: string) => {
    setUsername(e);
  }
  const handleOnChangePassword = (e: string) => {
    setPassword(e)
  }
  const handleOnPressRegister = () => {
    console.log("handleOnPressRegister");

  }

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.viewContainer}>
          <Avatar size={200} source={require('../../assets/images/Logo/logo.png')} />

          <View style={{ width: '80%' }}>
            <View style={{ alignItems: 'center', flexDirection: 'row', backgroundColor: '#FAFAFA', borderRadius: 5, borderWidth: 1, borderColor: '#3669C9' }} >
              <FontAwesome name='user' size={20} style={{ margin: 10 }} />
              <TextInput placeholder='Type your username' placeholderTextColor={'#C4C5C4'} onChangeText={handleOnChangeUsername} />
            </View>
            <View style={{ marginVertical: 10, alignItems: 'center', flexDirection: 'row', backgroundColor: '#FAFAFA', borderRadius: 5, borderWidth: 1, borderColor: '#3669C9' }} >
              <FontAwesome name='lock' size={20} style={{ margin: 10 }} />
              <TextInput placeholderTextColor={'#C4C5C4'} placeholder='Type your password' onChangeText={handleOnChangePassword} secureTextEntry={true} />
            </View>
          </View>
          <CustomButton margin={10} width='80%' onPress={handleOnPressRegister} text='Sign In' bgColor='#3669C9' txtColor='#ffffff' />
          <View style={{ margin: 10, alignItems: 'center' }}>
            <Text style={{ margin: 10 }}>Or</Text>
          </View>

          <CustomButton margin={10} width='80%' text='Sign Up With Google' bgColor='#ffcec9' txtColor='#a50e0e' />
          <CustomButton margin={10} width='80%' text='Sign Up With Facebook' bgColor='#1b74e4' txtColor='#ffffff' />
          <CustomButton margin={10} width='80%' text='Sign Up With Apple' bgColor='#000' txtColor='#ffffff' />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text>Have an account?</Text>
            <TouchableOpacity style={{ paddingHorizontal: 10 }} onPress={() => navigation.navigate('Login')}><Text>Sign In</Text></TouchableOpacity>
          </View>

        </View>
      </ScrollView>
    </>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
  },
  viewContainer: {
    alignItems: 'center'
  }
});
