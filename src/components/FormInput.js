import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';


export default function FormInput({ label, value, onChangeText, placeholder, secureTextEntry, keyboardType }) {
return (
<View style={styles.wrapper}>
<Text style={styles.label}>{label}</Text>
<TextInput
style={styles.input}
value={value}
onChangeText={onChangeText}
placeholder={placeholder}
secureTextEntry={secureTextEntry}
keyboardType={keyboardType}
autoCapitalize="none"
/>
</View>
);
}


const styles = StyleSheet.create({
wrapper: { marginBottom: 16 },
label: { marginBottom: 6, fontSize: 14, fontWeight: '500' },
input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 10, padding: 12, fontSize: 16, backgroundColor: '#fff' },
});