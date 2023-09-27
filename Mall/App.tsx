import React, { useEffect } from 'react';
import { AuthProvider } from './src/context/AuthContext';
import AppNav from './src/navigation/AppNav';
import SplashScreen from 'react-native-splash-screen';
import { PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import { Text, View } from 'react-native'
function App(): JSX.Element {
  useEffect(() => {
    SplashScreen.hide()
  })
  return (
    <Provider store={store}>
      <AuthProvider>
        <PaperProvider>
          <AppNav />
        </PaperProvider>
      </AuthProvider>
    </Provider>
  )
}
export default App;
