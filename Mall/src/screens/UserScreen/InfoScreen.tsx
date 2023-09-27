import * as React from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';
import { Avatar, ListItem, Icon } from 'react-native-elements';
import BtnGoBack from '../../components/BtnGoBack';
import BtnGoChat from '../../components/BtnGoChat';
import AvatarImage from 'react-native-paper/lib/typescript/components/Avatar/AvatarImage';



const UserInfoScreen = ({ route }: any) => {
    const { userInfo } = route.params
    console.log(userInfo);

    return (
        <View style={{ backgroundColor: '#fff' }}>
            <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'space-between', margin: 10 }}>
                <BtnGoBack />
                <Text style={{
                    fontWeight: 'bold',
                    fontSize: 18,
                    textTransform: 'capitalize'
                }}>Edit Profile</Text>
                <BtnGoChat />
            </View>
            <View style={{ alignItems: 'center', }}>
                <ListItem topDivider containerStyle={{ width: '100%' }} >
                    <ListItem.Content>
                        <ListItem.Title style={{ fontSize: 20, fontWeight: 'bold' }}>Avatar</ListItem.Title>
                    </ListItem.Content>
                    <Pressable>
                        <ListItem.Content>
                            <ListItem.Title style={{ fontSize: 16 }}>Edit</ListItem.Title>
                        </ListItem.Content>
                    </Pressable>
                </ListItem>
                <Avatar
                    rounded
                    size={130}
                    source={{ uri: userInfo.avatarImageName }}
                    containerStyle={{ borderWidth: 1, marginBottom: 10 }}
                />
            </View>

            <View style={{ marginTop: 10 }}>
                <ListItem topDivider containerStyle={{ backgroundColor: '#fff' }} >
                    <ListItem.Content>
                        <ListItem.Title>Name</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Title>{userInfo.fullName}</ListItem.Title>
                    <ListItem.Chevron />
                </ListItem>

                <ListItem topDivider containerStyle={{ backgroundColor: '#fff' }} >
                    <ListItem.Content>
                        <ListItem.Title>Mobile</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Title>{userInfo.mobile}</ListItem.Title>
                    <ListItem.Chevron />
                </ListItem>
                <ListItem topDivider containerStyle={{ backgroundColor: '#fff' }} >
                    <ListItem.Content>
                        <ListItem.Title>Email</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Title>{userInfo.email}</ListItem.Title>
                    <ListItem.Chevron />
                </ListItem>

                <ListItem topDivider containerStyle={{ backgroundColor: '#fff' }} >
                    <ListItem.Content>
                        <ListItem.Title>Address</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Title>{userInfo.address}</ListItem.Title>
                    <ListItem.Chevron />
                </ListItem>




            </View>
        </View>

    );
};

export default UserInfoScreen;

const styles = StyleSheet.create({
    container: {}
});
