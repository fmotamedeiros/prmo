import AsyncStorage from '@react-native-async-storage/async-storage';

const getMovies = async () => {
    try {
        const moviesStr = await AsyncStorage.getItem('movies');
        return (JSON.parse(moviesStr));
    } catch(e) {
        console.log(e);
    }
}

const addMovie = async (title, releaseYear) => {
    try {
        const moviesStr = await AsyncStorage.getItem('movies');
        let movies = JSON.parse(moviesStr);

        movies.push({
            "id": parseInt(movies[movies.length-1].id) + 1, 
            "title": title, 
            "releaseYear": releaseYear
        });

        await AsyncStorage.setItem('movies', JSON.stringify(movies));
        return (movies);
    } catch(e) {
        console.log(e);
    } 
}

const deleteMovie = async (id) => {
    try {
        const moviesStr = await AsyncStorage.getItem('movies');
        let movies = JSON.parse(moviesStr);

        let index = -1;

        for (let i = 0; i < movies.length; i++){
            let movie = movies[i];
            if (movie.id === id){
                index = i;
            }
        }

        if (index !== -1){
            movies.splice(index, 1);
        }

        await AsyncStorage.setItem('movies', JSON.stringify(movies));
        return (movies);
    } catch(e) {
        console.log(e);
    } 
}

export { getMovies, addMovie, deleteMovie }