import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, View, StyleSheet, TouchableOpacity } from 'react-native';
import { getDatabase, ref, onValue } from 'firebase/database';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Item from '../components/Item';
import { useNavigation } from '@react-navigation/native';

export default MoviesListScreen = () => {

  const navigation = useNavigation();

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getMovies = () => {
    let isMounted = true;

    const db = getDatabase();
    const reference = ref(db, 'movies');
    onValue(reference, (snapshot) => {

      const movies = [];

      snapshot.forEach(movie => {
        movies.push({
          id: movie.key,
          releaseYear: movie.val().releaseYear,
          title: movie.val().title
        });
      });

      if (isMounted){
        setData(movies);
        setLoading(false);
      }

      return () => { isMounted = false };
    });

  }

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? <ActivityIndicator /> : (
        <View style={{ flex: 1 }}>
          <FlatList
            data={data}
            keyExtractor={({ id }) => id}
            renderItem={({ item }) => (
              <Item id={item.id} title={item.title} releaseYear={item.releaseYear} />
            )}
          />
          <TouchableOpacity style={styles.floatButton} onPress={() => {
            navigation.navigate('AddMovie');
          }}
          >
            <Ionicons name={'add-outline'} size={30} color={'#FFF'} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  item: {
    backgroundColor: '#85C1E9',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  floatButton: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    position: 'absolute',
    bottom: 10,
    right: 10,
    height: 70,
    backgroundColor: '#1A5276',
    borderRadius: 100,
  }
});