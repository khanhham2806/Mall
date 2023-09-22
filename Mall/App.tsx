import React, { useEffect } from 'react';
import { AuthProvider } from './src/context/AuthContext';
import AppNav from './src/navigation/AppNav';
import SplashScreen from 'react-native-splash-screen';
import { PaperProvider } from 'react-native-paper';

function App(): JSX.Element {
  useEffect(() => {
    SplashScreen.hide()
  })
  return (
    <AuthProvider>
      <PaperProvider>
        <AppNav />
      </PaperProvider>
    </AuthProvider>
  )
}
export default App;
