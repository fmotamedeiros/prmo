import React, {useEffect} from 'react';
import MoviesList from './screens/MoviesListScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Stack from './navigation/Stack';

export default App = () => {
  
  useEffect(() => {
    storeData();
  }, []);

  const storeData = async () => {
    try {
      const movies = await AsyncStorage.getItem('movies');
      if(movies === null) {
        const movies = [
          { "id": "1", "title": "Star Wars", "releaseYear": "1977" },
          { "id": "2", "title": "Back to the Future", "releaseYear": "1985" },
          { "id": "3", "title": "The Matrix", "releaseYear": "1999" },
          { "id": "4", "title": "Inception", "releaseYear": "2010" },
          { "id": "5", "title": "Interstellar", "releaseYear": "2014" }
        ];
        await AsyncStorage.setItem('movies', JSON.stringify(movies));
      }
    } catch(e) {
      console.log(e);
    }
  }
  
  return (
    <Stack></Stack>
  );
};
