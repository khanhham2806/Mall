import * as React from 'react';
import { Button, View, StyleSheet, Text } from 'react-native';
import { Rating, AirbnbRating } from 'react-native-ratings';


import BtnGoBack from '../components/button/BtnGoBack';
const star = require('../../assets/star.png')
const ChatScreen = () => {

    return (
        <>
            <View style={styles.container}>
                <BtnGoBack />
            </View>
            <Text>Chat</Text>

            <AirbnbRating
                reviews={["Terrible", "Bad", "Medium", "OK", "Awesome"]}
                defaultRating={5}
                size={20}
                reviewSize={20}
                onFinishRating={(rating: any) => console.log(rating)}
            />







        </>

    );
};

export default ChatScreen;

const styles = StyleSheet.create({
    container: {}
});
