// app/(tabs)/perfil.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../src/utils/constants';

export default function PerfilScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Perfil</Text>
        <Text style={styles.text}>Clínica Vida v1.0</Text>
        <Text style={styles.text}>React Native + Expo</Text>
        <Text style={styles.text}>Expo Router</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.light },
  header: { padding: SIZES.padding * 2 },
  title: { fontSize: 24, fontWeight: 'bold', color: COLORS.primary, marginBottom: SIZES.padding },
  text: { fontSize: 16, color: COLORS.gray, marginVertical: SIZES.base },
});