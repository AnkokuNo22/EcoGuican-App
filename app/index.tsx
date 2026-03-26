import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const { width } = Dimensions.get('window');

export default function DashboardInicio() {
  const [guiaLogueado, setGuiaLogueado] = useState<any>(null);

  // Cargar datos del guía si existen en el teléfono
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const valor = await AsyncStorage.getItem('@guia_registrado');
        if (valor !== null) {
          setGuiaLogueado(JSON.parse(valor));
        }
      } catch (e) {
        console.log("Error al cargar datos de la memoria");
      }
    };
    cargarDatos();
  }, []);

  const cerrarPerfil = async () => {
    Alert.alert(
      "Cerrar Perfil", 
      "¿Deseas eliminar tu registro de este dispositivo?", 
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Eliminar", 
          style: "destructive",
          onPress: async () => {
            await AsyncStorage.removeItem('@guia_registrado');
            setGuiaLogueado(null);
          } 
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle="light-content" />
      
      {/* HEADER CON IMAGEN DE LA SIERRA */}
      <View style={styles.header}>
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b' }} 
          style={styles.headerImage} 
        />
        <View style={styles.overlay}>
          <Text style={styles.welcomeText}>
            {guiaLogueado ? `¡Hola, ${guiaLogueado.nombre}!` : 'Bienvenido a'}
          </Text>
          <Text style={styles.cityText}>Güicán de la Sierra</Text>
        </View>
      </View>

      <View style={styles.content}>
        
        {/* SECCIÓN DE REGISTRO DINÁMICA */}
        {guiaLogueado ? (
          <View style={styles.perfilActivoCard}>
            <View style={{ flex: 1 }}>
              <Text style={styles.perfilActivoTitle}>Tu perfil está activo</Text>
              <Text style={styles.perfilActivoSub}>Apareces en el directorio local.</Text>
            </View>
            <TouchableOpacity onPress={cerrarPerfil} style={styles.btnTrash}>
              <Ionicons name="trash-outline" size={20} color="#d32f2f" />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.registrationBanner}>
            <View style={{ flex: 1 }}>
              <Text style={styles.regTitle}>¿Eres guía en Güicán?</Text>
              <Text style={styles.regSub}>Regístrate para recibir reservas.</Text>
            </View>
            <Link href={"/registro-guia" as any} asChild>
              <TouchableOpacity style={styles.regButton}>
                <Text style={styles.regButtonText}>Registrarme</Text>
              </TouchableOpacity>
            </Link>
          </View>
        )}

        <Text style={styles.sectionTitle}>Explora la Montaña</Text>

        {/* GRID DE BOTONES PRINCIPALES */}
        <View style={styles.grid}>
          
          {/* BOTÓN: DIRECTORIO */}
          <Link href={"/guias" as any} asChild>
            <TouchableOpacity style={styles.card}>
              <View style={[styles.iconCircle, { backgroundColor: '#e8f5e9' }]}>
                <Ionicons name="people" size={28} color="#2e7d32" />
              </View>
              <Text style={styles.cardLabel}>Guías</Text>
            </TouchableOpacity>
          </Link>

          {/* BOTÓN: RESERVAS */}
          <Link href={"/reservas" as any} asChild>
            <TouchableOpacity style={styles.card}>
              <View style={[styles.iconCircle, { backgroundColor: '#fff3e0' }]}>
                <Ionicons name="calendar" size={28} color="#f57c00" />
              </View>
              <Text style={styles.cardLabel}>Reservas</Text>
            </TouchableOpacity>
          </Link>

          {/* BOTÓN: PREPARACIÓN (EL NUEVO) */}
          <Link href={"/preparacion" as any} asChild>
            <TouchableOpacity style={styles.card}>
              <View style={[styles.iconCircle, { backgroundColor: '#e3f2fd' }]}>
                <Ionicons name="shield-checkmark" size={28} color="#1976d2" />
              </View>
              <Text style={styles.cardLabel}>Preparación</Text>
            </TouchableOpacity>
          </Link>

          {/* BOTÓN: RUTA (PRÓXIMAMENTE) */}
          <TouchableOpacity 
            style={styles.card} 
            onPress={() => Alert.alert("Próximamente", "Estamos mapeando los senderos de la Sierra.")}
          >
            <View style={[styles.iconCircle, { backgroundColor: '#fce4ec' }]}>
              <Ionicons name="map" size={28} color="#d81b60" />
            </View>
            <Text style={styles.cardLabel}>Rutas</Text>
          </TouchableOpacity>

        </View>

        {/* NOTA AL PIE */}
        <View style={styles.footerInfo}>
          <Ionicons name="leaf-outline" size={16} color="#2e7d32" />
          <Text style={styles.footerText}>Turismo Responsable en el Cocuy</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { height: 280, position: 'relative' },
  headerImage: { width: '100%', height: '100%' },
  overlay: { 
    position: 'absolute', 
    bottom: 40, 
    left: 20, 
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.35)', 
    padding: 15, 
    borderRadius: 15 
  },
  welcomeText: { color: '#fff', fontSize: 16, opacity: 0.9 },
  cityText: { color: '#fff', fontSize: 32, fontWeight: 'bold' },
  content: { 
    padding: 20, 
    backgroundColor: '#fff', 
    borderTopLeftRadius: 35, 
    borderTopRightRadius: 35, 
    marginTop: -35 
  },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#333', marginBottom: 20, marginTop: 10 },
  
  // Banner de Registro
  registrationBanner: { 
    backgroundColor: '#f1f8e9', 
    padding: 20, 
    borderRadius: 20, 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 25,
    borderWidth: 1,
    borderColor: '#dcedc8'
  },
  regTitle: { fontWeight: 'bold', color: '#1b5e20', fontSize: 16 },
  regSub: { fontSize: 13, color: '#558b2f' },
  regButton: { backgroundColor: '#2e7d32', paddingVertical: 10, paddingHorizontal: 15, borderRadius: 12 },
  regButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 13 },

  // Card Perfil Activo
  perfilActivoCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
    borderWidth: 1,
    borderColor: '#eee',
    elevation: 2
  },
  perfilActivoTitle: { fontWeight: 'bold', color: '#2e7d32', fontSize: 16 },
  perfilActivoSub: { fontSize: 13, color: '#999' },
  btnTrash: { padding: 10, backgroundColor: '#ffebee', borderRadius: 10 },

  // Grid
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  card: { 
    width: (width - 60) / 2, 
    backgroundColor: '#f8f9fa', 
    padding: 25, 
    borderRadius: 25, 
    alignItems: 'center', 
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#f1f1f1'
  },
  iconCircle: { padding: 15, borderRadius: 25, marginBottom: 12 },
  cardLabel: { fontSize: 14, fontWeight: 'bold', color: '#444' },

  footerInfo: { 
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginTop: 10, 
    gap: 8,
    opacity: 0.5
  },
  footerText: { fontSize: 12, color: '#333', fontWeight: '500' }
});