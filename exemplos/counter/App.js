import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function App() {
  const [counter, setCounter] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.counterStyle}>{counter}</Text>
      <View style={styles.buttonsView}>
        <Button style={styles.myButton} onPress={() => {setCounter((counter - 1))}} title="Decrementar"></Button>
        <Button style={styles.myButton} onPress={() => {setCounter((counter + 1))}} title="Incrementar"></Button>
      </View>
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
  counterStyle: {
    fontSize: 60
  },
  buttonsView: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 240
  },
  myButton: {
    width: 110
  }
});
