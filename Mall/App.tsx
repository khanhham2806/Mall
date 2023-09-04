import React, { useEffect } from 'react';
import { AuthProvider } from './src/context/AuthContext';
import AppNav from './src/navigation/AppNav';
import SplashScreen from 'react-native-splash-screen';
// import { CartProvider } from './src/context/CartContext';

function App(): JSX.Element {
  useEffect(() => {
    SplashScreen.hide()
  })
  return (
    <AuthProvider>
      {/* <CartProvider> */}
      <AppNav />
      {/* </CartProvider> */}
    </AuthProvider>
  )
}
export default App;
