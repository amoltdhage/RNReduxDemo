import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { signOut, updateUser } from '../features/user/userSlice';
import { setLoading, clearLoading, setError, clearError } from '../features/ui/uiSlice';
import Button from '../components/Button';

export default function ProfileScreen({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const { loading, error } = useSelector((state) => state.ui);

  const [editMode, setEditMode] = useState(false);
  const [updatedPhone, setUpdatedPhone] = useState(user?.phone || '');
  const [updatedPassword, setUpdatedPassword] = useState(user?.password || '');

  // Redirect to Login if user doesn't exist
  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.noUserText}>No user data found.</Text>
        <Button
          title="Go to Login"
          onPress={() => navigation.replace('Login')}
        />
      </View>
    );
  }

  // Handle profile update
  const handleUpdate = async () => {
    if (!/^[0-9]{10}$/.test(updatedPhone)) {
      return Alert.alert('Error', 'Phone number must be 10 digits');
    }

    if (!updatedPassword || updatedPassword.length < 6) {
      return Alert.alert('Error', 'Password must be at least 6 characters');
    }

    try {
      dispatch(setLoading(true));
      dispatch(clearError());

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      dispatch(updateUser({ ...user, phone: updatedPhone, password: updatedPassword }));

      Alert.alert('Success', 'Profile updated successfully!');
      setEditMode(false);
    } catch (err) {
      dispatch(setError('Failed to update profile.'));
    } finally {
      dispatch(clearLoading());
    }
  };

  // Handle logout
  const onLogout = () => {
    Alert.alert('Log out', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Log out',
        style: 'destructive',
        onPress: () => {
          dispatch(signOut());
          navigation.replace('Login');
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {loading && (
          <ActivityIndicator size="large" color="#FF4081" style={{ marginBottom: 10 }} />
        )}

        {/* Heading */}
        <Text style={styles.heading}>{user?.fullName || 'No name provided'}</Text>

        {/* Email */}
        <Text style={styles.row}>Email: {user?.email || 'Not provided'}</Text>

        {/* Editable Phone */}
        {editMode ? (
          <TextInput
            style={styles.input}
            placeholder="Enter phone number"
            value={updatedPhone}
            onChangeText={setUpdatedPhone}
            keyboardType="phone-pad"
          />
        ) : (
          <Text style={styles.row}>Phone: {user?.phone || 'Not provided'}</Text>
        )}

        {/* Editable Password */}
        {editMode ? (
          <TextInput
            style={styles.input}
            placeholder="Enter new password"
            value={updatedPassword}
            onChangeText={setUpdatedPassword}
            secureTextEntry
          />
        ) : (
          <Text style={styles.row}>
            Password: {user?.password ? '*'.repeat(user.password.length) : 'Not set'}
          </Text>
        )}

        {/* Joined Date */}
        <Text style={styles.row}>
          Joined: {user?.createdAt ? new Date(user.createdAt).toLocaleString() : 'N/A'}
        </Text>
      </View>

      {/* Edit / Save Button */}
      {editMode ? (
        <Button title="Save Changes" onPress={handleUpdate} />
      ) : (
        <Button title="Edit Profile" onPress={() => setEditMode(true)} />
      )}

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutBtn} onPress={onLogout}>
        <Text style={styles.logoutText}>Log out</Text>
      </TouchableOpacity>

      {/* Error Message */}
      {error && <Text style={{ color: 'red', marginTop: 10 }}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, gap: 16, backgroundColor: '#f9fafb' },
  card: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#eee',
    elevation: 3,
    marginBottom: 20,
  },
  heading: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111',
    marginBottom: 10,
  },
  row: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  input: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    marginBottom: 10,
  },
  logoutBtn: {
    marginTop: 10,
    alignItems: 'center',
    paddingVertical: 12,
    backgroundColor: '#f43f5e',
    borderRadius: 10,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  noUserText: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginBottom: 20,
  },
});
