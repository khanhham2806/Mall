import * as React from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { Avatar } from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


import BtnGoBack from '../../components/BtnGoBack';
import BtnGoChat from '../../components/BtnGoChat';
const AllCommentScreen = ({ route }: any) => {
    const { dataComment } = route.params;
    // console.log(dataComment);
    return (
        <>
            <View style={{ padding: 10, backgroundColor: '#fff', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <BtnGoBack />
                <Text style={{
                    fontWeight: 'bold',
                    fontSize: 18,
                }}>Reviews</Text>
                <BtnGoChat />
            </View>
            <ScrollView showsVerticalScrollIndicator={false} style={{ margin: 20 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{dataComment.length} Reviews</Text>
                </View>
                {dataComment.map((comment: any) => {
                    // console.log(dataComment)
                    return (
                        <View key={comment.commentID}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 20 }}>
                                <View style={{ flex: 2 }}>
                                    <Avatar source={{ uri: comment.AvatarImageName }} size={45} />
                                </View>
                                <View style={{ flex: 8 }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text style={{ fontSize: 14, fontWeight: '700' }}>{comment.FullName}</Text>
                                        <Text style={{ fontSize: 12 }}>{(comment.commentTime).toString()}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginVertical: 5 }}>
                                        <FontAwesome name='star' size={14} color={'#FFC120'} />
                                        <FontAwesome name='star' size={14} color={'#FFC120'} />
                                        <FontAwesome name='star' size={14} color={'#FFC120'} />
                                        <FontAwesome name='star' size={14} color={'#FFC120'} />
                                        <FontAwesome name='star' size={14} color={'#FFC120'} />
                                    </View>
                                    <View>
                                        <Text>
                                            {comment.commentContent}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    )
                })}
            </ScrollView>
        </>
    )
};

export default AllCommentScreen;

const styles = StyleSheet.create({
    container: {}
});
