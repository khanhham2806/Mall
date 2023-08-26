import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
const BtnGoBack = ({ onPress }: any) => {
    return (
        <TouchableOpacity
            onPress={onPress}
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
