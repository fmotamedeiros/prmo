import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, View, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { getMovies, addMovie } from '../services/MoviesService';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Item from '../components/Item';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

export default MoviesListScreen = () => {
  
  const navigation = useNavigation();

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      getMoviesFromService();
    }, [])
  );

  const getMoviesFromService = () => {
      getMovies().then(result => {
        console.log(result);
       setData(result);
     })
     .catch(error => {
       console.log(error);
     })
     .finally (
       () => {
        setLoading(false);
       }
     )
  }

  useEffect(() => {
    getMoviesFromService();
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? <ActivityIndicator/> : (
        <View style={{flex: 1}}>
            <FlatList
                data={data}
                keyExtractor={({ id }, index) => id}
                renderItem={({ item }) => (
                    <Item id={item.id} title={item.title} releaseYear={item.releaseYear} updateList={getMoviesFromService} />
                )}
            />
            <TouchableOpacity style={styles.floatButton} onPress={()=>{ 
                navigation.navigate('AddMovie', {update: setData})}}
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