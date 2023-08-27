import * as React from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import * as apiClient from '../utilities/apiClient';
import * as cookies from '../utilities/cookies';
import { LoginScreenProps } from '../stacks/AccountStack';

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const [email, setEmail] = React.useState('calebfaruki@proton.me');
  const [password, setPassword] = React.useState('AQM4qrx7rdc1ndu.fcq');

  const handleLogin = async () => {
    try {
      const [cookie, user] = await apiClient.login(email, password);
      await cookies.set(cookie as string);
      Alert.alert('Success', 'Logged in successfully!')
      navigation.reset({
        index: 0,
        routes: [{ name: 'Profile', params: { user } }],
      })
    } catch (error) {
      Alert.alert('Error', 'Login failed. Please check your credentials.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});
