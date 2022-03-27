import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { View, Text, Button } from "react-native";
import MyAuthContext from "./MyAuthContext";
import * as SecureStore from 'expo-secure-store';
import { TextInput } from "react-native-gesture-handler";
import { initializeApp } from 'firebase/app';

import {
  getAuth,
  onAuthStateChanged,
  FacebookAuthProvider,
  signInWithCredential,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from 'firebase/auth';


export default function App() {

  const firebaseConfig = {
    // FIREBASE CONFIG HERE
  };
  
  initializeApp(firebaseConfig);

  const auth = getAuth();

  const AuthStack = createStackNavigator();

  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await SecureStore.getItemAsync('userToken');
        dispatch({ type: 'RESTORE_TOKEN', token: userToken });
      } catch (e) {
        // Restoring token failed
      }

    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        /*signInWithEmailAndPassword(auth, data.username, data.password)
        .then(res => {
          console.log(res);
          //await SecureStore.setItemAsync('userToken', data.username);
          //dispatch({ type: 'SIGN_IN', token: data.username });
        })
        .catch((error) => {
          console.log(error);
        });*/

        signInWithEmailAndPassword(auth, data.username, data.password)
        .then(res => {
          /*await*/ SecureStore.setItemAsync('userToken', res.user.email);
          dispatch({ type: 'SIGN_IN', token: res.user.email });
        })
        .catch((error) => {
          console.log(error);
        });

      },
      signOut: async () => {
        /*await*/ SecureStore.deleteItemAsync('userToken');
        //auth.signOut();
        dispatch({ type: 'SIGN_OUT' });
      },
      signUp: async (data) => {
        // Add new user...
        createUserWithEmailAndPassword(auth, data.username, data.password)
        .then(res => {
          //console.log(res);
          /*await*/ SecureStore.setItemAsync('userToken', res.user.email);
          dispatch({ type: 'SIGN_IN', token: res.user.email });
        })
        .catch((error) => {
          console.log(error);
        });

      },
    }),
    []
  );

  // Listen for authentication state to change.
  onAuthStateChanged(auth, user => {
    if (user != null) {
      //console.log('We are authenticated now!');
      //console.log(user);
      //dispatch({ type: 'SIGN_IN', token: user.email });
    } else {
      //dispatch({ type: 'SIGN_OUT' });
    }

    // Do other things
  });

  function SplashScreen() {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  function Home() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Home...</Text>
        <Button onPress={() => { authContext.signOut() }} title="Sair"></Button>
      </View>
    );
  }

  function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Login...</Text>
        <TextInput
          onChangeText={setUsername}
          value={username}
          placeholder="Informe o usuário..."
        />
        <TextInput
          onChangeText={setPassword}
          value={password}
          placeholder="Informe a senha..."
          secureTextEntry={true}
        />
        <Button title="Entrar" onPress={() => {authContext.signIn({username: username, password: password})}}></Button>
        <Button title="Cadastrar" onPress={() => {authContext.signUp({username: username, password: password})}}></Button>
      </View>
    );
  }


    return (
      <MyAuthContext.Provider value={authContext}>
        <NavigationContainer>
          <AuthStack.Navigator>
            {state.isLoading ? (
              // We haven't finished checking for the token yet
              <AuthStack.Screen name="Splash" component={SplashScreen} />
            ) : state.userToken == null ? (
              // No token found, user isn't signed in
              <AuthStack.Screen
                name="SignIn"
                component={Login}
                options={{
                  headerShown: false,
                  // When logging out, a pop animation feels intuitive
                  animationTypeForReplace: state.isSignout ? 'pop' : 'push',
                }}
              />
            ) : (
              // User is signed in
              <AuthStack.Screen
                options={{
                  headerShown: false,
                  // When logging out, a pop animation feels intuitive
                  animationTypeForReplace: state.isSignout ? 'pop' : 'push',
                }}
                name="Home" component={Home} />
            )}
          </AuthStack.Navigator>
        </NavigationContainer>
      </MyAuthContext.Provider>
    );
}

