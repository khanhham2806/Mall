import React from "react";
import { WebView } from "react-native-webview";
import BtnGoBack from "../components/BtnGoBack";
import { useNavigation } from "@react-navigation/native";

const WebViewScreen = ({ route }: any) => {
  const { url } = route.params;
  const navigation = useNavigation();
  const handleGoBack = () => {
    navigation.goBack();
  }
  return (
    <>
      <BtnGoBack onPress={handleGoBack} />
      <WebView
        source={{
          uri: url,
        }}
        startInLoadingState={true}
      />

    </>

  )
}

export default WebViewScreen