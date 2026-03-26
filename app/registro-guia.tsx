import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

export default function RegistroGuia() {
  const router = useRouter();
  
  // Estados del Formulario
  const [nombre, setNombre] = useState('');
  const [especialidad, setEspecialidad] = useState('');
  const [telefono, setTelefono] = useState('');
  const [foto, setFoto] = useState<string | null>(null);

  // 1. Selección de Imagen de la Galería
  const seleccionarImagen = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert("Permiso denegado", "Necesitamos acceso a tus fotos para tu perfil.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1], 
      quality: 0.7,
    });

    if (!result.canceled) {
      setFoto(result.assets[0].uri);
    }
  };

  // 2. Guardar en AsyncStorage
  const guardarRegistro = async () => {
    if (!nombre.trim() || !telefono.trim()) {
      Alert.alert("Campos obligatorios", "Por favor ingresa tu nombre y número de WhatsApp.");
      return;
    }

    // Limpieza de número: eliminamos espacios o guiones antes de guardar
    const numeroLimpio = telefono.replace(/\s/g, '');

    try {
      const nuevoGuia = {
        id: Date.now().toString(), // ID único para que no se confunda con los guías de ejemplo
        nombre: nombre.trim(),
        especialidad: especialidad.trim() || "Guía Local",
        telefono: numeroLimpio, 
        foto: foto,
        fechaRegistro: new Date().toLocaleDateString(),
      };

      // Guardamos bajo la clave @guia_registrado para que el resto de la app lo encuentre
      await AsyncStorage.setItem('@guia_registrado', JSON.stringify(nuevoGuia));
      
      Alert.alert(
        "¡Registro Exitoso!",
        "Tu perfil ha sido creado correctamente.",
        [{ text: "Ir al Inicio", onPress: () => router.replace('/') }]
      );
    } catch (e) {
      Alert.alert("Error", "No se pudo guardar la información.");
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={{ flex: 1, backgroundColor: '#fff' }}
    >
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#2e7d32" />
          <Text style={styles.backTxt}>Regresar</Text>
        </TouchableOpacity>

        <Text style={styles.titulo}>Nuevo Registro de Guía</Text>

        <View style={styles.photoContainer}>
          <TouchableOpacity style={styles.photoBox} onPress={seleccionarImagen}>
            {foto ? (
              <Image source={{ uri: foto }} style={styles.photoPreview} />
            ) : (
              <View style={styles.photoPlaceholder}>
                <Ionicons name="camera" size={40} color="#2e7d32" />
                <Text style={styles.addPhotoTxt}>Añadir Foto</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nombre y Apellido *</Text>
            <TextInput 
              style={styles.input}
              placeholder="Ej. Juan Pérez"
              value={nombre}
              onChangeText={setNombre}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Especialidad (Opcional)</Text>
            <TextInput 
              style={styles.input}
              placeholder="Ej. Alta Montaña / Páramos"
              value={especialidad}
              onChangeText={setEspecialidad}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Número de WhatsApp *</Text>
            <TextInput 
              style={styles.input}
              placeholder="3124567890"
              keyboardType="phone-pad"
              value={telefono}
              onChangeText={setTelefono}
            />
          </View>

          <TouchableOpacity style={styles.btnPrincipal} onPress={guardarRegistro}>
            <Text style={styles.btnTxt}>Publicar Mi Perfil</Text>
            <Ionicons name="checkmark-done" size={20} color="#fff" style={{ marginLeft: 10 }} />
          </TouchableOpacity>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 25 },
  backBtn: { marginTop: 45, flexDirection: 'row', alignItems: 'center', gap: 5, marginBottom: 15 },
  backTxt: { color: '#2e7d32', fontWeight: 'bold' },
  titulo: { fontSize: 26, fontWeight: 'bold', color: '#1b5e20', marginBottom: 30 },
  photoContainer: { alignItems: 'center', marginBottom: 25 },
  photoBox: { 
    width: 130, height: 130, borderRadius: 65, backgroundColor: '#f1f8e9', 
    borderWidth: 2, borderColor: '#2e7d32', borderStyle: 'dashed',
    overflow: 'hidden', justifyContent: 'center', alignItems: 'center' 
  },
  photoPreview: { width: '100%', height: '100%' },
  photoPlaceholder: { alignItems: 'center' },
  addPhotoTxt: { fontSize: 12, color: '#2e7d32', fontWeight: 'bold', marginTop: 5 },
  form: { gap: 20 },
  inputGroup: { gap: 8 },
  label: { fontSize: 14, fontWeight: 'bold', color: '#333' },
  input: { 
    backgroundColor: '#f9f9f9', padding: 16, borderRadius: 15, 
    borderWidth: 1, borderColor: '#eee', fontSize: 16 
  },
  btnPrincipal: { 
    backgroundColor: '#2e7d32', padding: 18, borderRadius: 15, 
    flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 15 
  },
  btnTxt: { color: '#fff', fontWeight: 'bold', fontSize: 17 }
});