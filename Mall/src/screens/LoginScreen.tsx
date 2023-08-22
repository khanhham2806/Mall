import * as React from 'react';
import { Text, View, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import CustomButton from '../components/CustomButton';
import { useState ,useContext} from 'react';
import { AuthContext } from '../context/AuthContext';

const Login = ({navigation}:any) => {
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  
  const handleOnChangeUsername =(e: string)=>{
    setUsername(e);
  }
  const handleOnChangePassword =(e: string)=>{
    setPassword(e)
  }
  const handleOnPressLogin =(e:any)=>{
    e.preventDefault();
    login()
      
  }

  const {login} = useContext(AuthContext);

  return (
    <ScrollView style={styles.container}>
      
      <View style={styles.viewContainer}>
      <Text style={{color:'#0C1A30', fontSize: 25, fontWeight:'bold' }}>Wellcome back to MegaMall</Text>
      <View>
          <Text>Username</Text>
          <TextInput style={{backgroundColor:'#FAFAFA'}} placeholderTextColor={'#C4C5C4'} placeholder='Type your username' onChangeText={handleOnChangeUsername}/>
          <Text>Password</Text>
          <TextInput style={{backgroundColor:'#FAFAFA'}} placeholderTextColor={'#C4C5C4'} placeholder='Type your password' onChangeText={handleOnChangePassword} secureTextEntry={true}/>
      </View>

      <CustomButton onPress ={handleOnPressLogin} text='Sign In'  bgColor ='#3669C9' txtColor ='#ffffff'/>

      <View style={{flexDirection:'row',justifyContent:'space-between'}}>
          <TouchableOpacity><Text>Forgot Password</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}><Text>Sign Up</Text></TouchableOpacity>
      </View>
    </View>
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    backgroundColor:'#fff'
  },
  viewContainer:{
    margin:20
  }
});
