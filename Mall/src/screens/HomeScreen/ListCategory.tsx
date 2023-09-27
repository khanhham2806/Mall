import * as React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import axios from 'axios';

import { BASE_URL } from '../../../config';

const ListCategory = () => {
    const navigation: any = useNavigation();
    const [data, setData] = useState([]);
    useEffect(() => {
        const getData = async () => {
            const res = await axios.get(`${BASE_URL}/category`)
            let dataCategory = res && res.data ? res.data.data : [];
            setData(dataCategory);
        }
        getData()
    }, []);

    return (
        <View>
            <Text style={styles.viewContent}>Categories</Text>
            <View style={[{ flexDirection: 'row', justifyContent: 'space-around' }]}>
                <FlatList
                    horizontal
                    data={data}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item: any) => item.categoryID}
                    renderItem={({ item }: any) => {
                        // console.log(item);

                        return (
                            <TouchableOpacity key={item.categoryID}
                                onPress={() => navigation.navigate('CategoryScreen', { item: item })}
                                style={{ marginHorizontal: 10, padding: 10, alignItems: 'center' }}>
                                <Image source={{ uri: item.categoryImage }} style={{ width: 50, height: 50, resizeMode: 'contain' }} />
                                <Text>{item.categoryTitle}</Text>
                            </TouchableOpacity>
                        )
                    }}>


                </FlatList>
            </View>

        </View >

    );
};

export default ListCategory;

const styles = StyleSheet.create({
    viewContent: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10
    }
});
