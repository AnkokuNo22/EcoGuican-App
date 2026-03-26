import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function FormularioReserva() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  
  const [guia, setGuia] = useState<any>(null);
  const [cargando, setCargando] = useState(true);
  
  // Estados del formulario
  const [fechaTexto, setFechaTexto] = useState('');
  const [personas, setPersonas] = useState('');
  const [ruta, setRuta] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  useEffect(() => {
    const cargarGuia = async () => {
      try {
        // 1. Datos de prueba por si se reserva con ellos
        const guiasEstaticos = [
          { id: '1', nombre: 'Carlos Mendoza', telefono: '573100000001' },
          { id: '2', nombre: 'Elena Ruiz', telefono: '573100000002' },
        ];

        const encontradoEstatico = guiasEstaticos.find(g => g.id === id);

        if (encontradoEstatico) {
          setGuia(encontradoEstatico);
        } else {
          // 2. Buscar en el registro local del teléfono
          const res = await AsyncStorage.getItem('@guia_registrado');
          if (res) {
            const guiaLocal = JSON.parse(res);
            // Solo lo asignamos si el ID coincide
            if (guiaLocal.id === id) {
              setGuia(guiaLocal);
            }
          }
        }
      } catch (error) {
        console.error("Error cargando guía para reserva", error);
      } finally {
        setCargando(false);
      }
    };
    cargarGuia();
  }, [id]);

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);

  const handleConfirm = (date: Date) => {
    const opciones: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
    setFechaTexto(date.toLocaleDateString('es-ES', opciones));
    hideDatePicker();
  };

  const enviarReserva = () => {
    // VALIDACIÓN DE SEGURIDAD PARA EVITAR EL ERROR 'UNDEFINED'
    if (!guia || !guia.telefono) {
      Alert.alert("Error de Contacto", "No pudimos obtener el número del guía. Intenta registrarte de nuevo.");
      return;
    }

    if (!fechaTexto || !personas || !ruta) {
      Alert.alert("Datos Incompletos", "Por favor llena la ruta, fecha y cantidad de personas.");
      return;
    }

    // Limpieza de número segura (toString() asegura que no falle si el dato viene nulo)
    let num = guia.telefono.toString().replace(/\D/g, '');
    
    // Solo aplicamos startsWith si el número tiene contenido
    if (num.length > 0 && !num.startsWith('57')) {
      num = `57${num}`;
    }

    const mensaje = `¡Hola ${guia.nombre}! Quiero reservar una ruta con EcoGüicán:\n📍 Ruta: ${ruta}\n📅 Fecha: ${fechaTexto}\n👥 Personas: ${personas}\n¿Me confirmas disponibilidad?`;

    const url = `whatsapp://send?phone=${num}&text=${encodeURIComponent(mensaje)}`;
    
    Linking.openURL(url).catch(() => {
      Alert.alert("WhatsApp no disponible", "Asegúrate de tener instalada la aplicación de WhatsApp.");
    });
  };

  if (cargando) {
    return (
      <View style={[styles.container, { justifyContent: 'center' }]}>
        <ActivityIndicator size="large" color="#2e7d32" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <TouchableOpacity onPress={() => router.back()} style={styles.back}>
        <Ionicons name="close-circle" size={32} color="#ccc" />
      </TouchableOpacity>

      <Text style={styles.titulo}>Tu Expedición</Text>
      <Text style={styles.sub}>Coordinando con: {guia?.nombre || 'Guía local'}</Text>

      <View style={styles.form}>
        <Text style={styles.label}>¿A qué lugar de la Sierra vas?</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Ej: El Púlpito del Diablo" 
          value={ruta} 
          onChangeText={setRuta} 
        />

        <Text style={styles.label}>¿Cuándo es el ascenso?</Text>
        <TouchableOpacity style={styles.inputDate} onPress={showDatePicker}>
          <Text style={{ color: fechaTexto ? '#333' : '#999', fontSize: 16 }}>
            {fechaTexto || "Seleccionar en el calendario"}
          </Text>
          <Ionicons name="calendar" size={20} color="#2e7d32" />
        </TouchableOpacity>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          minimumDate={new Date()}
        />

        <Text style={styles.label}>¿Cuántas personas viajan?</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Ej: 3" 
          keyboardType="numeric" 
          value={personas} 
          onChangeText={setPersonas} 
        />

        <TouchableOpacity style={styles.btn} onPress={enviarReserva}>
          <Ionicons name="logo-whatsapp" size={24} color="#fff" />
          <Text style={styles.btnTxt}>Enviar Solicitud</Text>
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
  sub: { color: '#666', marginBottom: 30, marginTop: 5, fontSize: 16 },
  form: { gap: 18 },
  label: { fontWeight: 'bold', color: '#444', fontSize: 14, marginLeft: 5 },
  input: { backgroundColor: '#f9f9f9', padding: 18, borderRadius: 15, fontSize: 16, borderWidth: 1, borderColor: '#eee' },
  inputDate: { 
    backgroundColor: '#f9f9f9', padding: 18, borderRadius: 15, 
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    borderWidth: 1, borderColor: '#eee' 
  },
  btn: { 
    backgroundColor: '#2e7d32', padding: 20, borderRadius: 18, 
    flexDirection: 'row', justifyContent: 'center', alignItems: 'center', 
    gap: 12, marginTop: 20, elevation: 4 
  },
  btnTxt: { color: '#fff', fontWeight: 'bold', fontSize: 18 }
});