import React, { useState } from 'react';
import { View, StyleSheet, Alert, Text, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { signUp } from '../features/user/userSlice';
import FormInput from '../components/FormInput';
import Button from '../components/Button';

export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const onLogin = () => {
    if (!email.trim() || !password.trim()) {
      return Alert.alert('Error', 'Please enter email and password');
    }

    if (!user || user.email !== email || user.password !== password) {
      return Alert.alert('Login Failed', 'Invalid email or password');
    }

    Alert.alert('Success', 'Login successful!');
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <FormInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="you@example.com"
          keyboardType="email-address"
        />
        <FormInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          placeholder="••••••••"
          secureTextEntry
        />
        <Button title="Login" onPress={onLogin} loading={loading} />
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.signupText}>Don’t have an account? Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#f9fafb' },
  card: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#eee',
    elevation: 3,
  },
  signupText: {
    textAlign: 'center',
    marginTop: 15,
    color: '#2563EB',
    fontWeight: '600',
  },
});
