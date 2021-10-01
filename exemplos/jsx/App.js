import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const getGreetings = (name) => {
  return `Hello, ${name}!`;
}

const HelloJSX = () => {
  const title = 'Meu App em React Native!';
  const name = 'Flávio';

  return (
    <View style={styles.container}>
      <Text>{title}</Text>
      <Text>{getGreetings(name)}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HelloJSX;