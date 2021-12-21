import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, StyleSheet, StatusBar, TextInput, Button } from 'react-native';
import { addMovie } from '../services/MoviesService';

export default AddMovieScreen = () => {
  
    const navigation = useNavigation();


    const [title, setTitle] = useState('');
    const [releaseYear, setReleaseYear] = useState('');

    const addMovieFromService = () => {
        addMovie(title, releaseYear).then(result => {
            navigation.goBack();
        })
        .catch(error => {
            console.log(error);
        });
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                onChangeText={setTitle}
                value={title}
                placeholder='Digite o filme'
            />
            <TextInput
                style={styles.input}
                onChangeText={setReleaseYear}
                value={releaseYear}
                placeholder='Digite o ano'
            />
            <Button title="Adicionar" onPress={()=>{addMovieFromService()}}></Button>
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});