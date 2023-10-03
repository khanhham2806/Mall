import React from "react";
import { WebView } from "react-native-webview";
import BtnGoBack from "../../components/button/BtnGoBack";
import BtnShare from "../../components/button/BtnShare";
import { View } from 'react-native'
import { Text } from "react-native-elements";

const WebViewScreen = ({ route }: any) => {
  const { url, title } = route.params;


  return (
    <>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <BtnGoBack margin={10} />
        <Text style={{ fontSize: 18, fontWeight: '700' }}>{title}</Text>
        <BtnShare margin={10} url={url} title={title} />
      </View>
      <WebView
        source={{
          uri: url
        }}
        allowFileAccess={true}
        scalesPageToFit={true}
        originWhitelist={['*']}
        startInLoadingState={true}
      />
    </>

  )
}

export default WebViewScreen