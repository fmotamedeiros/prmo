import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, StatusBar, TextInput, Button } from 'react-native';
import { getFirestore, setDoc, doc, addDoc, collection } from 'firebase/firestore/lite';

export default AddMovieScreen = (props) => {
  
    const navigation = useNavigation();

    const [id, setId] = useState(null);
    const [title, setTitle] = useState('');
    const [releaseYear, setReleaseYear] = useState('');

    useEffect(() => {
        if (props.route.params){
            if (props.route.params.releaseYear){
                setReleaseYear(props.route.params.releaseYear);
            }
            if (props.route.params.id){
                setId(props.route.params.id);
            }
            if (props.route.params.title){
                setTitle(props.route.params.title);
            }
        }
    }, [props]);

    const addMovieFromService = async () => {
        const firestore = getFirestore();

        const movies = collection(firestore, 'movies');

        await addDoc(movies, {
            "title": title, 
            "releaseYear": releaseYear
        });

        navigation.goBack();
    }

    const updateMovieFromService = async () => {
        const firestore = getFirestore();
        await setDoc(doc(firestore, "movies", id), {
            "title": title, 
            "releaseYear": releaseYear
        });

        navigation.goBack();
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
            { !id && <Button title="Adicionar" onPress={()=>{addMovieFromService()}}></Button> } 
            { id && <Button title="Atualizar" onPress={()=>{updateMovieFromService()}}></Button> } 
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