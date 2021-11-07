import React, { useState, useEffect } from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';

function Hooks() {
  const [count, setCount] = useState(0);

  // Similar ao componentDidMount e componentDidUpdate:
  useEffect(() => {
    // Atualiza o titulo do documento usando a API do browser
    console.log(`Você clicou ${count} vezes`);
  });

  return (
    <View style={styles.container}>
      <Text>Você clicou {count} vezes</Text>
      <Button onPress={() => setCount(count + 1)} title="Clique aqui"></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default Hooks;