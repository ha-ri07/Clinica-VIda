// app/(tabs)/index.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { especialidadesService } from '../../src/services/api';
import Card from '../../src/components/Card';
import { COLORS, SIZES } from '../../src/utils/constants';

export default function HomeScreen() {
  const [especialidades, setEspecialidades] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchEspecialidades = async () => {
      try {
        const response = await especialidadesService.getAll();
        setEspecialidades(response.data);
      } catch (err) {
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchEspecialidades();
  }, []);

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Especialidades</Text>
      </View>
      <FlatList
        data={especialidades}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card
            title={item.nombre}
            description={item.descripcion}
            color={item.color}
            onPress={() => router.push('/doctores')}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.light },
  centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { padding: SIZES.padding, paddingTop: SIZES.padding * 2 },
  title: { fontSize: 28, fontWeight: 'bold', color: COLORS.primary },
});