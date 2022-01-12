import React from 'react';
import {  Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { deleteMovie } from '../services/MoviesService';

export default Item = ({ id, title, releaseYear, updateList }) => {
    const deleteMovieFromService = async (id) => {
        await deleteMovie(id);
        //updateList();
    }
    
    return(
        <View style={styles.item}>
            <View>
                <Text style={styles.title}>{title}</Text>
                <Text>{releaseYear}</Text>
            </View>
            <View>
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