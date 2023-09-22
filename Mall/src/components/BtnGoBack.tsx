import * as React from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native';

const BtnGoBack = ({ margin }: any) => {
    const navigation: any = useNavigation()
    const hanldeGoBack = () => {
        navigation.goBack();
    }
    return (
        <Pressable
            onPress={hanldeGoBack}
            style={[{
                padding: 10, width: 40, backgroundColor: '#ccc', borderRadius: 30,
            }, margin ? { margin: margin } : {},]}>
            <Ionicons name='arrow-back' size={20} />
        </Pressable>
    );
};

export default BtnGoBack;

const styles = StyleSheet.create({
    container: {}
});
