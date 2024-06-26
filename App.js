import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import PasswordList from './components/PasswordList';
import PasswordGenerator from './components/PasswordGenerator';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="SavedPasswords" component={PasswordList} />
        <Stack.Screen name="GeneratePassword" component={PasswordGenerator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
