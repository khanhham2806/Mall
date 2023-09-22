import * as React from 'react';
import { Text, View, StyleSheet, Image, ScrollView } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react'
import { Avatar } from 'react-native-elements'
import CustomButton from '../../components/CustomButton';
import BtnGoBack from '../../components/BtnGoBack';
import BtnGoCart from '../../components/BtnGoCart';
import { useNavigation } from '@react-navigation/native';
import { Button, ListItem, Icon } from 'react-native-elements';
const UserScreen = () => {
  const navigation: any = useNavigation()
  const { logout, userInfo } = useContext(AuthContext);
  const handleOnPressLogout = () => {
    logout()
  }

  return (
    <ScrollView style={styles.container}>
      <ListItem >
        <Avatar
          rounded
          size={50}
          source={{ uri: userInfo.user.AvatarImageName }}
        />
        <ListItem.Content>
          <ListItem.Title style={{ fontWeight: "bold", fontSize: 18 }}>
            {userInfo.user.FullName}
          </ListItem.Title>
          <ListItem.Subtitle>
            {userInfo.user.role}
          </ListItem.Subtitle>
        </ListItem.Content>
        <Icon size={20} name="edit" type="antdesign" color="grey" />

      </ListItem>

      <View style={{ marginTop: 10 }}>
        {/* {(userInfo.user.role == 'admin')
          ? <CustomButton margin={10} onPress={handleAdmin} text='Admin' bgColor='#3669C9' txtColor='#ffffff' />
          : <></>
        } */}
        <ListItem bottomDivider >
          <Icon size={20} name="ticket-outline" type="material-community" color="grey" />
          <ListItem.Content>
            <ListItem.Title>Vouchers</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
        <ListItem bottomDivider >
          <Icon size={20} name="payment" type="material" color="grey" />
          <ListItem.Content>
            <ListItem.Title>Payment</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
        <ListItem bottomDivider >
          <Icon size={20} name="location-outline" type="ionicon" color="grey" />
          <ListItem.Content>
            <ListItem.Title>Address</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
        <ListItem bottomDivider >
          <Icon size={20} name="heart-outline" type="ionicon" color="grey" />
          <ListItem.Content>
            <ListItem.Title>Save</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      </View>

      <View style={{ marginTop: 10 }}>
        <ListItem bottomDivider >
          <Icon size={20} name="user" type="antdesign" color="grey" />
          <ListItem.Content>
            <ListItem.Title>Invite Friends</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
        <ListItem bottomDivider >
          <Icon size={20} name="headset-mic" type="material" color="grey" />
          <ListItem.Content>
            <ListItem.Title>Support Center</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      </View>
      <View style={{ marginTop: 10 }}>

        <ListItem bottomDivider >
          <Icon size={20} name="text-document" type="entypo" color="grey" />
          <ListItem.Content>
            <ListItem.Title>User Policies</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
        <ListItem bottomDivider >
          <Icon size={20} name="settings-outline" type="ionicon" color="grey" />
          <ListItem.Content>
            <ListItem.Title>Settings</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
        <ListItem bottomDivider >
          <Icon size={20} name="verified" type="octicons" color="grey" />
          <ListItem.Content>
            <ListItem.Title>About Mall</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      </View>

    </ScrollView >


  );
};

export default UserScreen;

const styles = StyleSheet.create({
  container: {
  }
});
