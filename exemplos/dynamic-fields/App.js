import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function App() {

  const [inputFields, setInputFields] = useState([
    { firstName: '', lastName: '' }
  ]);

  const handleAddFields = () => {
    const values = [...inputFields];
    values.push({ firstName: '', lastName: '' });
    setInputFields(values);
  };

  const handleRemoveFields = index => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };

  const handleInputChange = (index, field, value) => {
    const values = [...inputFields];
    if (field === "firstName") {
      values[index].firstName = value;
    } else {
      values[index].lastName = value;
    }
    setInputFields(values);
  };

  const handleSubmit = () => {
    console.log("inputFields", inputFields);
  };

  return (
    <View style={styles.container}>
      <Text>Dynamic Fields!</Text>
      <StatusBar style="auto" />
      {inputFields.map((inputField, index) => (
        <View key={`${inputField}~${index}`} style={styles.inputsView}>
          <TextInput
            style={styles.input}
            id="firstName"
            name="firstName"
            value={inputField.firstName}
            onChangeText={(value) => handleInputChange(index, 'firstName', value)}
          />
          <TextInput
            style={styles.input}
            id="lastName"
            name="lastName"
            value={inputField.lastName}
            onChangeText={(value) => handleInputChange(index, 'lastName', value)}
          />
          <TouchableOpacity style={styles.button} onPress={() => handleRemoveFields(index)}>
            <Text style={styles.buttonText}>Remover</Text>
          </TouchableOpacity>
        </View>
      ))}
      <View style={styles.inputsView}>
        <TouchableOpacity style={styles.button} onPress={() => handleAddFields()}>
          <Text style={styles.buttonText}>Adicionar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
          <Text style={styles.buttonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
      <Text>{JSON.stringify(inputFields)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputsView: {
    width: '100%',
    margin: 10,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    margin: 12,
    padding: 10,
    backgroundColor: 'gray',
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold' 
  }
});
