import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native';

const BtnGoBack = ({ onPress }: any) => {
    const navigation: any = useNavigation()
    const hanldeGoBack = () => {
        navigation.goBack();
    }
    return (
        <TouchableOpacity
            onPress={hanldeGoBack}
            style={{
                padding: 10, width: 40, backgroundColor: '#ccc', borderRadius: 30,
                margin: 10

            }}>
            <Ionicons name='arrow-back' size={20} />
        </TouchableOpacity>
    );
};

export default BtnGoBack;

const styles = StyleSheet.create({
    container: {}
});
