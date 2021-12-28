import React from 'react';
import {  Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { getFirestore, deleteDoc, doc } from 'firebase/firestore/lite';

export default Item = ({ id, title, releaseYear }) => {
    const navigation = useNavigation();

    const deleteMovieFromService = async (id) => {
        const firestore = getFirestore();

        const movie = doc(firestore, "movies/" + id);
        await deleteDoc(movie);
    }

    const openEditMovieFromService = async (id, title, releaseYear) => {
        navigation.navigate('AddMovie', {id: id, releaseYear:releaseYear, title: title});
    }
    
    return(
        <View style={styles.item}>
            <View>
                <Text style={styles.title}>{title}</Text>
                <Text>{releaseYear}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={()=>{openEditMovieFromService(id, title, releaseYear)}}>
                    <Ionicons name={'create-outline'} size={30} color={'#000'} />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{deleteMovieFromService(id)}}>
                    <Ionicons name={'trash-outline'} size={30} color={'#000'} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    item: {
      backgroundColor: '#85C1E9',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    title: {
      fontSize: 32,
    }
});