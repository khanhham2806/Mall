import * as React from 'react';
import { ScrollView, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar } from "react-native-elements"
import axios from 'axios';
import { useEffect, useState } from 'react'
import { BASE_URL } from '../../config';


const NewsScreen = ({ navigation }: any) => {
  const [data, setData] = useState([]);


  useEffect(() => {
    const getData = async () => {
      let url = `${BASE_URL}/news`
      const res = await axios.get(url)
      let dataNews = res && res.data ? res.data.data : [];

      setData(dataNews);

    }
    getData()

  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: '#fff ' }}>

      <View style={styles.container}>
        {
          data.map((item: any) => {
            return (

              <TouchableOpacity
                style={[styles.card, { backgroundColor: '#fff', shadowColor: '#000' }]} key={item.id}
                onPress={() => navigation.navigate('WebViewScreen', { url: item.url })}
              >
                <Avatar
                  size={100}
                  source={{ uri: item.imgUrl }}
                />
                <Text style={{ textAlign: "center", fontWeight: 'bold', marginTop: 10, color: '#000' }}>{item.title}</Text>
              </TouchableOpacity>
            )
          })
        }


      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    display: 'flex',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  card: {
    width: '40%',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    elevation: 5,
    marginBottom: 20
  },
  searchBox: {
    marginVertical: 5,
    marginHorizontal: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderColor: '#ccc',
    borderRadius: 8,
    borderWidth: 1,
    backgroundColor: '#fff',
  }
});

export default NewsScreen;

