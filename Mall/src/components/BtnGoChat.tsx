import * as React from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native';

const BtnGoChat = ({ onPress }: any) => {
    const navigation: any = useNavigation()
    const hanldeGoChat = () => {
        navigation.navigate('Chat');
    }
    return (
        <Pressable
            onPress={hanldeGoChat}
            style={{
                padding: 10, width: 40, backgroundColor: '#ccc', borderRadius: 30,

            }}>
            <Ionicons name='chatbox-ellipses' size={20} />
        </Pressable>
    );
};

export default BtnGoChat;

const styles = StyleSheet.create({
    container: {}
});
