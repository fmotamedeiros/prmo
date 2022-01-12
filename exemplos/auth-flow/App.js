import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { View, Text, Button } from "react-native";
import MyAuthContext from "./MyAuthContext";
import * as SecureStore from 'expo-secure-store';
import { TextInput } from "react-native-gesture-handler";

const App = () => {

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

        if (data.username === 'user@gmail.com' && data.password === '123456'){
          await SecureStore.setItemAsync('userToken', data.username);
          dispatch({ type: 'SIGN_IN', token: data.username });
        }

      },
      signOut: async () => {
        await SecureStore.deleteItemAsync('userToken');
        dispatch({ type: 'SIGN_OUT' });
      },
      signUp: async (data) => {
        // Add new user...
        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
    }),
    []
  );

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


export default App;