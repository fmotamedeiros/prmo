import React from "react";
import { ActivityIndicator, View } from "react-native";

const LoadingScreen = () => {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator color={'#283747'}></ActivityIndicator>
        </View>
    )
}

export default LoadingScreen;