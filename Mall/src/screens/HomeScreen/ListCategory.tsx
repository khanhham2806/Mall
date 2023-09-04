import * as React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BASE_URL } from '../../../config';
import { useState, useEffect } from 'react';
import axios from 'axios';

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
            <View style={[{ flexDirection: 'row', justifyContent: 'space-around', gap: 5 }]}>
                {data.map((item: any) => {
                    return (
                        <TouchableOpacity key={item.categoryID}
                            onPress={() => navigation.navigate('CategoryScreen', { item: item })}
                            style={{ padding: 10, alignItems: 'center' }}>
                            <Image source={{ uri: item.categoryImage }} style={{ width: 45, height: 45, resizeMode: 'contain' }} />
                            <Text>{item.categoryTitle}</Text>
                        </TouchableOpacity>
                    )

                })}
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
