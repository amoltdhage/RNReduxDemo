import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';


export default function Button({ title, onPress, disabled, loading }) {
return (
<TouchableOpacity style={[styles.btn, disabled && { opacity: 0.6 }]} onPress={onPress} disabled={disabled}>
{loading ? <ActivityIndicator /> : <Text style={styles.label}>{title}</Text>}
</TouchableOpacity>
);
}


const styles = StyleSheet.create({
btn: { backgroundColor: '#4F46E5', borderRadius: 12, paddingVertical: 14, alignItems: 'center' },
label: { color: '#fff', fontWeight: '600', fontSize: 16 },
});