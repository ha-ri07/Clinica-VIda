// src/screens/DoctoresScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { doctoresService } from '../services/api';
import Card from '../components/Card';
import { COLORS, SIZES } from '../utils/constants';

const DoctoresScreen = ({ route, navigation }) => {
  const { especialidad } = route.params || {};
  const [doctores, setDoctores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctores = async () => {
      try {
        const response = especialidad 
          ? await doctoresService.getByEspecialidad(especialidad.id)
          : await doctoresService.getAll();
        setDoctores(response.data);
      } catch (err) {
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctores();
  }, [especialidad]);

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
        <Text style={styles.title}>
          {especialidad ? especialidad.nombre : 'Doctores'}
        </Text>
      </View>
      <FlatList
        data={doctores}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card
            title={`Dr. ${item.nombre} ${item.apellido}`}
            description={`${item.experiencia} años de experiencia`}
            onPress={() => navigation.navigate('Citas', { doctor: item })}
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
  title: { fontSize: 24, fontWeight: 'bold', color: COLORS.primary },
});

export default DoctoresScreen;