import * as React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import TabNav from './TabNav';
import { AuthContext } from '../context/AuthContext';
import { NavigationContainer } from '@react-navigation/native'
import AuthStack from './AuthStack';
import AppStack from './AppStack';
const AppNav = () => {
  const { isLoading, userToken } = React.useContext(AuthContext);
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={'large'} />
      </View>
    )
  }
  return (
    <NavigationContainer>
      {(userToken !== null) ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNav;


