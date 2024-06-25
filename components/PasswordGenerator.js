import React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const generatePassword = () => {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let password = '';
  for (let i = 0; i < 8; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};

const savePassword = async (password) => {
  try {
    const savedPasswords = JSON.parse(await AsyncStorage.getItem('passwords')) || [];
    savedPasswords.push(password);
    await AsyncStorage.setItem('passwords', JSON.stringify(savedPasswords));
  } catch (error) {
    console.error(error);
  }
};

const PasswordGenerator = () => {
  const [password, setPassword] = React.useState('');

  const handleGeneratePassword = () => {
    const newPassword = generatePassword();
    setPassword(newPassword);
    savePassword(newPassword);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.password}>{password}</Text>
      <View style={styles.buttonWrapper}>
        <Button title="Gerar Senha" onPress={handleGeneratePassword} color="#ff69b4" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    margin: 20,
    borderRadius: 10,
    padding: 20,
  },
  password: {
    fontSize: 24,
    marginBottom: 20,
    fontFamily: 'Calibri',
  },
  buttonWrapper: {
    marginTop: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
});

export default PasswordGenerator;
