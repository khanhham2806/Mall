import * as React from 'react';
import { AuthContext } from '../../context/AuthContext';
import { NavigationContainer } from '@react-navigation/native'
import AuthStack from '../stack/AuthStack';
import AppStack from '../stack/AppStack';
const AppNav = () => {
  const { isLogin } = React.useContext(AuthContext);
  return (
    <NavigationContainer>
      {(isLogin) ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNav;


