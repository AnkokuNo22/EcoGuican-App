import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Linking, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function FormularioReserva() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [guia, setGuia] = useState<any>(null);
  
  // Estados del formulario
  const [fecha, setFecha] = useState('');
  const [personas, setPersonas] = useState('');
  const [ruta, setRuta] = useState('');

  useEffect(() => {
    const cargarGuia = async () => {
      const res = await AsyncStorage.getItem('@guia_registrado');
      if (res) {
        const g = JSON.parse(res);
        if (g.id === id) setGuia(g);
      }
      // También podrías buscar en los guías estáticos aquí
    };
    cargarGuia();
  }, [id]);

  const enviarReserva = () => {
    if (!fecha || !personas || !ruta) {
      Alert.alert("Campos incompletos", "Por favor llena todos los datos para tu expedición.");
      return;
    }

    const mensaje = `¡Hola ${guia?.nombre}! Quiero reservar una ruta con EcoGüicán:
📍 Ruta: ${ruta}
📅 Fecha: ${fecha}
👥 Personas: ${personas}
¿Me confirmas disponibilidad?`;

    let num = guia?.telefono.replace(/\D/g, '');
    if (!num.startsWith('57')) num = `57${num}`;

    const url = `whatsapp://send?phone=${num}&text=${encodeURIComponent(mensaje)}`;
    Linking.openURL(url);
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.back}>
        <Ionicons name="close" size={28} color="#333" />
      </TouchableOpacity>

      <Text style={styles.titulo}>Solicitar Reserva</Text>
      <Text style={styles.sub}>Envía los detalles a tu guía para coordinar el ascenso.</Text>

      <View style={styles.form}>
        <Text style={styles.label}>¿A qué ruta vas?</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Ej: Púlpito del Diablo o Ritacuba" 
          value={ruta} 
          onChangeText={setRuta} 
        />

        <Text style={styles.label}>Fecha del recorrido</Text>
        <TextInput 
          style={styles.input} 
          placeholder="DD/MM/AAAA" 
          value={fecha} 
          onChangeText={setFecha} 
        />

        <Text style={styles.label}>Número de personas</Text>
        <TextInput 
          style={styles.input} 
          placeholder="¿Cuántos van?" 
          keyboardType="numeric" 
          value={personas} 
          onChangeText={setPersonas} 
        />

        <TouchableOpacity style={styles.btn} onPress={enviarReserva}>
          <Text style={styles.btnTxt}>Enviar Solicitud</Text>
          <Ionicons name="paper-plane" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 25 },
  back: { marginTop: 40, alignSelf: 'flex-end' },
  titulo: { fontSize: 28, fontWeight: 'bold', color: '#1b5e20' },
  sub: { color: '#666', marginBottom: 30, marginTop: 5 },
  form: { gap: 20 },
  label: { fontWeight: 'bold', color: '#444' },
  input: { backgroundColor: '#f5f5f5', padding: 18, borderRadius: 12, fontSize: 16 },
  btn: { backgroundColor: '#2e7d32', padding: 20, borderRadius: 15, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10, marginTop: 20 },
  btnTxt: { color: '#fff', fontWeight: 'bold', fontSize: 18 }
});