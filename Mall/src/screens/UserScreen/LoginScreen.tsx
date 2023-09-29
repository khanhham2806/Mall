import * as React from 'react';
import { Text, View, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import CustomButton from '../../components/button/CustomButton';
import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { Avatar } from 'react-native-elements';

const Login = ({ navigation }: any) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleOnChangeUsername = (e: string) => {
    setUsername(e);
  }
  const handleOnChangePassword = (e: string) => {
    setPassword(e)
  }
  const handleOnPressLogin = (e: any) => {
    e.preventDefault();
    login(username, password)

  }

  const { login } = useContext(AuthContext);

  return (

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

        <CustomButton margin={10} width='80%' onPress={handleOnPressLogin} text='Sign In' bgColor='#3669C9' txtColor='#ffffff' />
        <View style={{ margin: 10, alignItems: 'center' }}>
          <TouchableOpacity><Text>Forgot Password</Text></TouchableOpacity>
          <Text style={{ margin: 10 }}>Or</Text>
        </View>

        <CustomButton margin={10} width='80%' text='Sign In With Google' bgColor='#ffcec9' txtColor='#a50e0e' />
        <CustomButton margin={10} width='80%' text='Sign In With Facebook' bgColor='#1b74e4' txtColor='#ffffff' />
        <CustomButton margin={10} width='80%' text='Sign In With Apple' bgColor='#000' txtColor='#ffffff' />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text>Don't have an account?</Text>
          <TouchableOpacity style={{ paddingHorizontal: 10 }} onPress={() => navigation.navigate('Register')}><Text>Sign Up</Text></TouchableOpacity>
        </View>
      </View>

    </ScrollView>



  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'red'
  },

  viewContainer: {
    alignItems: 'center'
  }
});
