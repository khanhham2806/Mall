import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import BtnGoBack from '../../components/button/BtnGoBack';
import CustomButton from '../../components/button/CustomButton';



const AdminScreen = ({ navigation }: any) => {
    const handleUser = () => {

    }
    const handleProduct = () => {
        navigation.navigate('AdminProduct')
    }
    return (
        <>
            <View style={{ padding: 10, backgroundColor: '#fff', flexDirection: 'row', justifyContent: 'space-between' }}>
                <BtnGoBack />
            </View>
            <View>
                <CustomButton margin={10} onPress={handleUser} text='User' bgColor='#3669C9' txtColor='#ffffff' />
                <CustomButton margin={10} onPress={handleProduct} text='Product' bgColor='#3669C9' txtColor='#ffffff' />
            </View>
        </>
    );
};

export default AdminScreen;

const styles = StyleSheet.create({
    container: {}
});
