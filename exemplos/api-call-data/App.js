import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, StyleSheet, StatusBar } from 'react-native';

export default App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getMessages = async () => {
     try {

      const rawResponse = await fetch('http://192.168.2.114:5000/api/messages', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({message: 'Hello World'})
      });
      const content = await rawResponse.json();
      setData(content);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getMessages();
  }, []);

  const Item = ({ message }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{message}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {isLoading ? <ActivityIndicator/> : (
        <FlatList
          data={data.messages}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Item message={item.message} />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#85C1E9',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 22,
    color: '#FFFFFF'
  },
});