import React from 'react';
import { AuthProvider } from './src/context/AuthContext';
import AppNav from './src/navigation/AppNav';

function App(): JSX.Element {
  
  return (
    <AuthProvider>
        <AppNav/>
    </AuthProvider>
  )
}
export default App;
