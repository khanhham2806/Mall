import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface LineProps { }

const Line = (props: LineProps) => {
    return (
        <View style={styles.container}>
        </View>
    );
};

export default Line;

const styles = StyleSheet.create({
    container: {
        borderColor: '#EDEDED',
        borderWidth: 1,
        borderStyle: 'solid',
        marginHorizontal: 20
    }
});


