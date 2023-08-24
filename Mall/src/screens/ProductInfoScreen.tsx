import * as React from 'react';
import { Text, View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Avatar } from 'react-native-elements';

const width = Dimensions.get('screen').width;

const ProductInfoScreen = ({ route }: any) => {

    const { item } = route.params;


    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={{ alignItems: 'center' }}>
                    <Avatar source={{ uri: item.productImage }} size={width * 0.9} />
                </View>
                <Text style={styles.title}>{item.title}</Text>
                <View style={styles.price}>
                    <Text style={styles.actualPrice}>{item.actualPrice} VND</Text>
                    <Text style={styles.oldPrice}>{item.oldPrice} VND</Text>
                    <Text style={styles.discount}>-{item.discount}%</Text>
                </View>
            </View>
        </ScrollView>
    );
};

export default ProductInfoScreen;

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    title: {
        fontWeight: 'bold',
        fontSize: 24,
        color: '#0C1A30'
    },
    price: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    actualPrice: {
        fontSize: 16, color: '#FE3A30'
    },
    oldPrice: {
        fontSize: 16, textDecorationLine: 'line-through',
        marginHorizontal: 20
    },
    discount: {
        fontSize: 16,
    }
});
