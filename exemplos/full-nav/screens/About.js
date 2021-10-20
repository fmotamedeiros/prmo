import React from "react";
import { Button, View, StyleSheet, Text } from "react-native";
import { useNavigation } from '@react-navigation/native';

const About = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.center}>
      <Text>This is the about screen</Text>
      <Button
        title="Go Back"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
});

export default About;