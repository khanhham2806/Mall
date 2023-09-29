import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import BtnGoBack from '../../components/button/BtnGoBack';
import BtnGoCart from '../../components/button/BtnGoCart';
import { ListItem, Icon } from 'react-native-elements';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
const SettingsScreen = () => {
    const { logout } = useContext(AuthContext);
    return (
        <>
            <View style={{ padding: 10, flexDirection: "row", alignItems: 'center', justifyContent: 'space-between' }}>
                <BtnGoBack />
                <Text style={{ fontWeight: 'bold', fontSize: 18, }}>
                    Settings
                </Text>
                <BtnGoCart />
            </View>
            <View>
                <ListItem bottomDivider >
                    <Icon size={20} name="language" type="material" color="grey" />
                    <ListItem.Content>
                        <ListItem.Title>Languages</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron />
                </ListItem>
                <ListItem bottomDivider onPress={logout}>
                    <Icon size={20} name="logout" type="material" color="grey" />
                    <ListItem.Content>
                        <ListItem.Title>Logout</ListItem.Title>
                    </ListItem.Content>
                </ListItem>
            </View>
        </>
    );
};

export default SettingsScreen;

const styles = StyleSheet.create({
    container: {}
});
