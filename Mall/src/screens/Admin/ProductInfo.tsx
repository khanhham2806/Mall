import * as React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react'
const ProductInfo = ({ route }: any) => {
    const { item } = route.params;
    console.log(item);

    const [isTrue, SetIsTrue] = useState(true)

    const handleEdit = () => {
        SetIsTrue(false)
    }
    const handleCancel = () => {
        SetIsTrue(true)
    }

    return (
        <>
            <View style={styles.container}>

                {(isTrue)
                    ?
                    <>
                        <Text>Title</Text>
                        <Text>{item.productTitle}</Text>
                        <Text>Image</Text>
                        <Text>Actual Price</Text>
                        <Text>{item.productActualPrice}</Text>
                        <Text>Old Price</Text>
                        <Text>{item.productOldPrice}</Text>
                        <Text>Category</Text>
                        <Text>{item.productCategory}</Text>
                        <Text>Seller</Text>
                        <Text>{item.sellerID}</Text>

                    </>

                    : <>
                        <Text>Title</Text>
                        <TextInput>{item.productTitle}</TextInput>
                        <Text>Image</Text>
                        <Text>Actual Price</Text>
                        <TextInput>{item.productActualPrice}</TextInput>
                        <Text>Old Price</Text>
                        <TextInput>{item.productOldPrice}</TextInput>
                        <Text>Category</Text>
                        <TextInput>{item.productCategory}</TextInput>
                        <Text>Seller</Text>
                        <TextInput>{item.seller}</TextInput>

                    </>
                }


            </View>
            <View>
                <TouchableOpacity onPress={() => handleEdit()}><Text>Edit</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => handleCancel()}><Text>Cancel</Text></TouchableOpacity>
            </View>
        </>
    );
};

export default ProductInfo;

const styles = StyleSheet.create({
    container: {}
});
