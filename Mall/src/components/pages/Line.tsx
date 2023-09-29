import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';


const Line = ({ marginHorizontal }: any) => {
    return (
        <View style={[styles.container, marginHorizontal ? { marginHorizontal: marginHorizontal } : { marginHorizontal: 20 }]}>
        </View >
    );
};

export default Line;

const styles = StyleSheet.create({
    container: {
        borderColor: '#EDEDED',
        borderWidth: 1,
        borderStyle: 'solid',
    }
});


