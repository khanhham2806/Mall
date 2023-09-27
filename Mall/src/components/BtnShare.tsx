import React from 'react';
import { Alert, Pressable } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Share from 'react-native-share';
const BtnShare = ({ margin, url, title }: any) => {
    const onShare = async () => {
        const shareOptions = {
            message: title,
            url: url
        }
        try {
            const ShareResponse = await Share.open(shareOptions);
            console.log(JSON.stringify(ShareResponse));

        } catch (error) {
            console.log(error);

        };
    }
    return (
        <Pressable
            onPress={onShare}
            style={[{
                padding: 10, width: 40, backgroundColor: '#ccc', borderRadius: 30,
            }, margin ? { margin: margin } : {},]}>
            <Ionicons name='share-social' size={20} />
        </Pressable>
    );
};

export default BtnShare;