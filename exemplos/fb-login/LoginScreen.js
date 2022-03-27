import React, { useContext, useState } from "react";
import { Text, View, StyleSheet, TextInput, Button } from "react-native";
import MyAuthContext from "./MyAuthContext";

const LoginScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { signIn } = useContext(MyAuthContext);

    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Tela de Login</Text>
        <TextInput style={styles.input}
          onChangeText={setUsername}
          value={username}
          placeholder="Informe o usuário..."
        />
        <TextInput style={styles.input}
          onChangeText={setPassword}
          value={password}
          placeholder="Informe a senha..."
          secureTextEntry={true}
        />
        <Button title="Entrar" onPress={() => { signIn({
            username: username,
            password: password
        }) }}></Button>
      </View>
    );
}

const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
});

export default LoginScreen;