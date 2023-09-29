import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Avatar } from '@rneui/themed';
const width = Dimensions.get('screen').width * 0.43;
const height = Dimensions.get('screen').height * 0.35;

const ComponentProduct = ({ onPress, sourceImg, title, actualPrice, oldPrice, discount }: any) => {
    return (
        <TouchableOpacity style={styles.product}
            onPress={onPress}
        >
            <Avatar source={sourceImg} size={width * 0.9} />
            <Text style={styles.title}>{title}</Text>
            <View style={{ width, display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
                <Text style={{ fontSize: 10, color: '#FE3A30' }}>{actualPrice}</Text>
                <Text style={{ fontSize: 10, textDecorationLine: 'line-through' }}>{oldPrice} </Text>
                <Text style={{ fontSize: 10 }}>{'-' + discount + '%'}</Text>
            </View>
        </TouchableOpacity>

    )
};
export default ComponentProduct;


const styles = StyleSheet.create({
    product: {
        borderRadius: 10,
        borderColor: '#EDEDED',
        backgroundColor: '#fafafa',
        width,
        height,
        alignItems: 'center'
    },
    title: {
        padding: 5,
        fontWeight: 'bold',
        marginVertical: 10,
        height: 50
    }
});
