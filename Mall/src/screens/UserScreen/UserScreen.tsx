import * as React from 'react';
import { Text, View, StyleSheet, Image, ScrollView } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react'
import { Avatar } from 'react-native-elements'
import CustomButton from '../../components/CustomButton';
import BtnGoBack from '../../components/BtnGoBack';
import BtnGoCart from '../../components/BtnGoCart';
const UserScreen = () => {
  const { logout, userInfo } = useContext(AuthContext);
  const handleOnPressLogout = () => {
    logout()
  }


  const handleInfo = () => {
    console.log(handleInfo);

  }
  const handleSettings = () => {
    console.log(handleSettings);

  }
  const handleContact = () => {
    console.log(handleContact);

  }
  return (
    <>
      <View style={{ padding: 10, backgroundColor: '#fff', flexDirection: 'row', justifyContent: 'space-between' }}>
        <BtnGoBack />
        <BtnGoCart />
      </View>
      <ScrollView style={styles.container}>
        <View>
          <Image source={{ uri: userInfo.user.AvatarImageName }} style={{ height: 200 }} />
        </View>
        <View style={{ alignItems: 'center' }}>
          <Avatar
            size={150}
            source={{ uri: userInfo.user.AvatarImageName }}
            avatarStyle={{ borderRadius: 100 }}
            containerStyle={{ marginTop: -80 }}
          />
          <Text style={{ fontSize: 25, color: "#000", padding: 10, fontWeight: '600' }}>{userInfo.user.FullName}</Text>
        </View>
        <View style={{ margin: 20 }}>
          <CustomButton onPress={handleInfo} text='User Info' bgColor='#3669C9' txtColor='#ffffff' />
          <CustomButton onPress={handleContact} text='Contact' bgColor='#3669C9' txtColor='#ffffff' />
          <CustomButton onPress={handleSettings} text='Settings' bgColor='#3669C9' txtColor='#ffffff' />

          <CustomButton onPress={handleOnPressLogout} text='Logout' bgColor='#FE3A30' txtColor='#ffffff' />
        </View>

      </ScrollView >
    </>
  );
};

export default UserScreen;

const styles = StyleSheet.create({
  container: {
  }
});
