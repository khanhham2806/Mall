import * as React from 'react';
import { Text, View, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import CustomButton from '../components/CustomButton';

const Register = ({navigation}:any) => {

  const handleOnPressRegister =()=>{
      console.log("handleOnPressRegister");
      
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.viewContainer}>
        <Text style={{color:'#0C1A30', fontSize: 25, fontWeight:'bold' }}>Create an account</Text>

        <View>
            <Text>Username</Text>
            <TextInput style={{backgroundColor:'#FAFAFA'}} placeholderTextColor={'#C4C5C4'} placeholder='Type your username'/>
            <Text>Password</Text>
            <TextInput style={{backgroundColor:'#FAFAFA'}} placeholderTextColor={'#C4C5C4'} placeholder='Type your password' secureTextEntry={true}/>
            <Text>Repeat Password</Text>
            <TextInput style={{backgroundColor:'#FAFAFA'}} placeholderTextColor={'#C4C5C4'} placeholder='Repeat your password' secureTextEntry={true}/>
        </View>

        <CustomButton onPress ={handleOnPressRegister} text='Register'  bgColor ='#3669C9' txtColor ='#ffffff'/>

        <View style={{flexDirection:'row',justifyContent:'center'}}>
            <TouchableOpacity onPress={()=>navigation.navigate('Login')}><Text>Sign In</Text></TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    backgroundColor:'#fff'
  },
  viewContainer:{
    margin:20
  }
});
