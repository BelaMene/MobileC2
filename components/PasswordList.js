import React from 'react';
import { View, Text, FlatList, StyleSheet, Button, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const deletePassword = async (index) => {
  try {
    const savedPasswords = JSON.parse(await AsyncStorage.getItem('passwords')) || [];
    if (index >= 0 && index < savedPasswords.length) {
      savedPasswords.splice(index, 1);
      await AsyncStorage.setItem('passwords', JSON.stringify(savedPasswords));
    }
  } catch (error) {
    console.error(error);
  }
};

const updatePassword = async (index, newPassword) => {
  try {
    const savedPasswords = JSON.parse(await AsyncStorage.getItem('passwords')) || [];
    if (index >= 0 && index < savedPasswords.length) {
      savedPasswords[index] = newPassword;
      await AsyncStorage.setItem('passwords', JSON.stringify(savedPasswords));
    }
  } catch (error) {
    console.error(error);
  }
};

const PasswordList = () => {
  const [passwords, setPasswords] = React.useState([]);
  const [editingIndex, setEditingIndex] = React.useState(null);
  const [newPassword, setNewPassword] = React.useState('');

  React.useEffect(() => {
    const fetchPasswords = async () => {
      try {
        const savedPasswords = JSON.parse(await AsyncStorage.getItem('passwords')) || [];
        setPasswords(savedPasswords);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPasswords();
  }, []);

  const handleDeletePassword = (index) => {
    deletePassword(index);
    setPasswords(passwords.filter((_, i) => i !== index));
  };

  const handleUpdatePassword = (index) => {
    if (newPassword) {
      updatePassword(index, newPassword);
      setPasswords(passwords.map((password, i) => (i === index ? newPassword : password)));
      setEditingIndex(null);
      setNewPassword('');
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={passwords}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.passwordContainer}>
            {editingIndex === index ? (
              <>
                <TextInput
                  style={styles.input}
                  value={newPassword}
                  onChangeText={setNewPassword}
                  placeholder="Nova Senha"
                />
                <View style={styles.buttonWrapper}>
                  <Button title="Salvar" onPress={() => handleUpdatePassword(index)} color="#ff69b4" />
                </View>
              </>
            ) : (
              <>
                <Text style={styles.password}>{item}</Text>
                <View style={styles.buttonsWrapper}>
                  <View style={styles.buttonWrapper}>
                    <Button title="Alterar" onPress={() => setEditingIndex(index)} color="#ff69b4" />
                  </View>
                  <View style={styles.buttonWrapper}>
                    <Button title="Apagar" onPress={() => handleDeletePassword(index)} color="#ff69b4" />
                  </View>
                </View>
              </>
            )}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    padding: 20,
  },
  passwordContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  password: {
    fontSize: 18,
    fontFamily: 'Calibri',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 10,
    flex: 1,
    paddingHorizontal: 20,
  },
  buttonWrapper: {
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 15,
  },
  buttonsWrapper: {
    flexDirection: 'row',
    marginRight: 20
  },
});

export default PasswordList;
