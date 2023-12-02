import * as React from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import * as apiClient from '../utilities/apiClient';
import Button from '../components/Button';
import { useUser } from '../context/user';

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const { setUser } = useUser();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleLogin = async () => {
    try {
      const [_cookie, user] = await apiClient.login(email, password);
      setUser(user)
      navigation.popToTop();
    } catch (error) {
      Alert.alert('Error', 'Login failed. Please check your credentials.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        textContentType="emailAddress"
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        textContentType="password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button onPress={() => handleLogin()}>
        <Text style={{ color: 'white', fontSize: 18 }}>Login</Text>
      </Button>
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
    color: 'white',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});
