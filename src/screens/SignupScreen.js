import React, { useState } from 'react';
import { View, StyleSheet, Alert, Text, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { signUp } from '../features/user/userSlice';
import FormInput from '../components/FormInput';
import Button from '../components/Button';

export default function SignupScreen({ navigation }) {
  const dispatch = useDispatch();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const validateEmail = (value) => /\S+@\S+\.\S+/.test(value);

  const onSubmit = () => {
  if (!fullName?.trim() || !phone?.trim() || !email?.trim() || !password?.trim()) {
    return Alert.alert('Error', 'All fields are required');
  }

  if (!/\S+@\S+\.\S+/.test(email)) {
    return Alert.alert('Error', 'Invalid email format');
  }

  if (!/^[0-9]{10}$/.test(phone)) {
    return Alert.alert('Error', 'Phone number must be 10 digits');
  }

  if (!password || password.length < 6) {
    return Alert.alert('Error', 'Password must be at least 6 characters');
  }

  dispatch(
    signUp({
      id: Date.now().toString(),
      fullName,
      email: email.toLowerCase(),
      phone,
      password,
      createdAt: new Date().toISOString(),
    })
  );

  Alert.alert('Success', 'Signup successful!');
  navigation.replace('Profile');
};


  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <FormInput
          label="Full Name"
          value={fullName}
          onChangeText={setFullName}
          placeholder="John Doe"
        />
        <FormInput
          label="Phone"
          value={phone}
          onChangeText={setPhone}
          placeholder="9876543210"
          keyboardType="phone-pad"
        />
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

        <Button title="Sign Up" onPress={onSubmit} loading={loading} />

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginText}>
            Already have an account? Login here
          </Text>
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
  loginText: {
    textAlign: 'center',
    marginTop: 15,
    color: '#2563EB',
    fontWeight: '600',
  },
});
