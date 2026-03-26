import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Linking, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function FormularioReserva() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [guia, setGuia] = useState<any>(null);
  
  // Estados del formulario
  const [fechaTexto, setFechaTexto] = useState('');
  const [personas, setPersonas] = useState('');
  const [ruta, setRuta] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  useEffect(() => {
    const cargarGuia = async () => {
      const res = await AsyncStorage.getItem('@guia_registrado');
      if (res) {
        const g = JSON.parse(res);
        if (g.id === id) setGuia(g);
      }
    };
    cargarGuia();
  }, [id]);

  // Funciones del Calendario
  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);

  const handleConfirm = (date: Date) => {
    // Formateamos la fecha a algo legible: DD/MM/YYYY
    const opciones: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
    setFechaTexto(date.toLocaleDateString('es-ES', opciones));
    hideDatePicker();
  };

  const enviarReserva = () => {
    if (!fechaTexto || !personas || !ruta) {
      Alert.alert("Campos incompletos", "Por favor selecciona una fecha y llena los datos.");
      return;
    }

    const mensaje = `¡Hola ${guia?.nombre}! Quiero reservar una ruta con EcoGüicán:
📍 Ruta: ${ruta}
📅 Fecha: ${fechaTexto}
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
        <Ionicons name="close-circle" size={32} color="#ccc" />
      </TouchableOpacity>

      <Text style={styles.titulo}>Tu Expedición</Text>
      <Text style={styles.sub}>Completa los detalles para coordinar con {guia?.nombre || 'tu guía'}.</Text>

      <View style={styles.form}>
        <Text style={styles.label}>¿Qué ruta deseas realizar?</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Ej: Laguna Grande de la Sierra" 
          value={ruta} 
          onChangeText={setRuta} 
        />

        <Text style={styles.label}>Fecha del recorrido</Text>
        <TouchableOpacity style={styles.inputDate} onPress={showDatePicker}>
          <Text style={{ color: fechaTexto ? '#333' : '#999', fontSize: 16 }}>
            {fechaTexto || "Seleccionar fecha en calendario"}
          </Text>
          <Ionicons name="calendar" size={20} color="#2e7d32" />
        </TouchableOpacity>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          minimumDate={new Date()} // No permite fechas pasadas
        />

        <Text style={styles.label}>Número de aventureros</Text>
        <TextInput 
          style={styles.input} 
          placeholder="¿Cuántas personas van?" 
          keyboardType="numeric" 
          value={personas} 
          onChangeText={setPersonas} 
        />

        <TouchableOpacity style={styles.btn} onPress={enviarReserva}>
          <Ionicons name="logo-whatsapp" size={24} color="#fff" />
          <Text style={styles.btnTxt}>Solicitar por WhatsApp</Text>
        </TouchableOpacity>
      </View>
      
      <View style={{height: 50}} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 25 },
  back: { marginTop: 40, alignSelf: 'flex-end', marginBottom: 10 },
  titulo: { fontSize: 28, fontWeight: 'bold', color: '#1b5e20' },
  sub: { color: '#666', marginBottom: 30, marginTop: 5, fontSize: 15 },
  form: { gap: 15 },
  label: { fontWeight: 'bold', color: '#444', fontSize: 14, marginLeft: 5 },
  input: { backgroundColor: '#f5f5f5', padding: 18, borderRadius: 15, fontSize: 16, borderWidth: 1, borderColor: '#eee' },
  inputDate: { 
    backgroundColor: '#f5f5f5', padding: 18, borderRadius: 15, 
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    borderWidth: 1, borderColor: '#eee' 
  },
  btn: { 
    backgroundColor: '#2e7d32', padding: 20, borderRadius: 18, 
    flexDirection: 'row', justifyContent: 'center', alignItems: 'center', 
    gap: 12, marginTop: 25, elevation: 4 
  },
  btnTxt: { color: '#fff', fontWeight: 'bold', fontSize: 18 }
});