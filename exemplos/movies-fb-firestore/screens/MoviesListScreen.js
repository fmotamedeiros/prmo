import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, View, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Item from '../components/Item';
import { useNavigation } from '@react-navigation/native';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

export default MoviesListScreen = () => {

  const navigation = useNavigation();

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getMovies = async () => {
    const moviesCol = collection(getFirestore(), 'movies');
    const movieSnapshot = await getDocs(moviesCol);
    const movieList = movieSnapshot.docs.map(doc => doc);
    
    var movies = [];
    movieList.forEach(movie => {

      const movieData = movie.data();

      movies.push({
        id: movie.id,
        title: movieData['title'],
        releaseYear: movieData['releaseYear']
      });
    });

    setData(movies);
    setLoading(false);
  }

  useEffect(() => {
    getMovies();
  });

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