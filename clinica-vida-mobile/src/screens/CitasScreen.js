// src/screens/CitasScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { citasService } from '../services/api';
import Input from '../components/Input';
import Button from '../components/Button';
import { COLORS, SIZES } from '../utils/constants';

const CitasScreen = ({ route, navigation }) => {
  const { doctor } = route.params || {};
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    especialidad: doctor?.especialidad || 1,
    doctor: doctor?.id || 1,
    fecha: '',
    hora: '09:00',
    motivo: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!formData.nombre || !formData.email || !formData.fecha) {
      Alert.alert('Error', 'Completa los campos requeridos');
      return;
    }
    setLoading(true);
    try {
      await citasService.create(formData);
      Alert.alert('¡Éxito!', 'Cita agendada correctamente', [
        { text: 'OK', onPress: () => navigation.navigate('Home') }
      ]);
    } catch (err) {
      Alert.alert('Error', 'No se pudo agendar la cita');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Agendar Cita</Text>
      </View>
      <Input label="Nombre" value={formData.nombre} onChangeText={(v) => setFormData({...formData, nombre: v})} />
      <Input label="Email" value={formData.email} onChangeText={(v) => setFormData({...formData, email: v})} />
      <Input label="Teléfono" value={formData.telefono} onChangeText={(v) => setFormData({...formData, telefono: v})} />
      <Input label="Fecha" value={formData.fecha} onChangeText={(v) => setFormData({...formData, fecha: v})} placeholder="YYYY-MM-DD" />
      <Input label="Motivo" value={formData.motivo} onChangeText={(v) => setFormData({...formData, motivo: v})} />
      <Button title={loading ? 'Agendando...' : 'Confirmar Cita'} onPress={handleSubmit} loading={loading} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.light },
  header: { padding: SIZES.padding, paddingTop: SIZES.padding * 2 },
  title: { fontSize: 24, fontWeight: 'bold', color: COLORS.primary },
});

export default CitasScreen;