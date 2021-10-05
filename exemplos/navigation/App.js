import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';

function HomeScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { myParam } = route.params;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Text>{myParam}</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details', {title: 'Details Screen'})}
      />
    </View>
  );
}

function DetailsScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { title } = route.params;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>{title}</Text>
      <Button
        title="Go to Home"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} initialParams={{ myParam: 'Initial Param!' }}/>
        <Stack.Screen name="Details" component={DetailsScreen} 
          options={{
            headerStyle: {
              backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerLeft: null
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;