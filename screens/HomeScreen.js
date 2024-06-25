import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <Button
            title="Inicializar Gerador de Senhas"
            onPress={() => navigation.navigate('GeneratePassword')}
            color="#ff69b4"
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <Button
            title="Visualizar e Alterar Senhas Salvas"
            onPress={() => navigation.navigate('SavedPasswords')}
            color="#ff69b4"
          />
        </View>
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
  },
  buttonContainer: {
    marginBottom: 10,
    width: '80%',
  },
  buttonWrapper: {
    backgroundColor: '#ff69b4', 
    borderRadius: 10,
    overflow: 'hidden', 
  },
});

export default HomeScreen;
