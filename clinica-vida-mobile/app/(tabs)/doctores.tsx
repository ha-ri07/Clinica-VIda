// app/(tabs)/doctores.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { doctoresService } from '../../src/services/api';
import Card from '../../src/components/Card';
import { COLORS, SIZES } from '../../src/utils/constants';

export default function DoctoresScreen() {
  const [doctores, setDoctores] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchDoctores = async () => {
      try {
        const response = await doctoresService.getAll();
        setDoctores(response.data);
      } catch (err) {
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctores();
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
        <Text style={styles.title}>Doctores</Text>
      </View>
      <FlatList
        data={doctores}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card
            title={`Dr. ${item.nombre} ${item.apellido}`}
            description={`${item.experiencia} años de experiencia`}
            onPress={() => router.push('/citas')}
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
  title: { fontSize: 24, fontWeight: 'bold', color: COLORS.primary },
});