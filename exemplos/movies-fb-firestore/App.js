import React from 'react';
import Stack from './navigation/Stack';
import { initializeApp } from 'firebase/app';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Setting a timer']);

export default App = () => {

  const firebaseConfig = {
    // Firebase config..
  };

  initializeApp(firebaseConfig);

  return (
    <Stack></Stack>
  );
};
