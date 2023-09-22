import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import BtnGoBack from '../../components/BtnGoBack';



const User = () => {
    return (
        <>
            <View style={{ padding: 10, backgroundColor: '#fff', flexDirection: 'row', justifyContent: 'space-between' }}>
                <BtnGoBack />
            </View>

        </>
    );
};

export default User;

const styles = StyleSheet.create({
    container: {}
});
