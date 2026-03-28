// src/screens/HomeScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { especialidadesService } from '../services/api';
import Card from '../components/Card';
import { COLORS, SIZES } from '../utils/constants';

const HomeScreen = ({ navigation }) => {
  const [especialidades, setEspecialidades] = useState([]);
  const [loading, setLoading] = useState(true);

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
            onPress={() => navigation.navigate('Doctores', { especialidad: item })}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.light },
  centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { padding: SIZES.padding, paddingTop: SIZES.padding * 2 },
  title: { fontSize: 28, fontWeight: 'bold', color: COLORS.primary },
});

export default HomeScreen;