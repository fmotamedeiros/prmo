import React, { useContext } from "react";
import { Text, View, Button } from "react-native";
import MyAuthContext from "./MyAuthContext";

const HomeScreen = () => {
    
    const { signOut } = useContext(MyAuthContext);

    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Tela Principal</Text>
        <Button title="Sair" onPress={() => { signOut() }}></Button>
      </View>
    );
}

export default HomeScreen;