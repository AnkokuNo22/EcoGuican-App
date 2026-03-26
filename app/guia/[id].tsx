import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export default function DetalleGuia() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [guia, setGuia] = useState<any>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarPerfil = async () => {
      // 1. Datos de ejemplo para el directorio
      const guiasEstaticos = [
        { id: '1', nombre: 'Carlos Mendoza', especialidad: 'Avistamiento de Aves', foto: 'https://randomuser.me/api/portraits/men/32.jpg', telefono: '573100000001' },
        { id: '2', nombre: 'Elena Ruiz', especialidad: 'Alta Montaña', foto: 'https://randomuser.me/api/portraits/women/44.jpg', telefono: '573100000002' },
      ];

      const encontradoEstatico = guiasEstaticos.find(g => g.id === id);

      if (encontradoEstatico) {
        setGuia(encontradoEstatico);
      } else {
        // 2. Buscar en el registro local (Tu perfil guardado)
        try {
          const res = await AsyncStorage.getItem('@guia_registrado');
          if (res) {
            const guiaLocal = JSON.parse(res);
            // Verificamos que el ID coincida con el de la ruta
            if (guiaLocal.id === id) {
              setGuia(guiaLocal);
            }
          }
        } catch (e) {
          console.error("Error cargando perfil local", e);
        }
      }
      setCargando(false);
    };

    cargarPerfil();
  }, [id]);

  if (cargando) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2e7d32" />
      </View>
    );
  }

  if (!guia) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorTxt}>Guía no encontrado</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.btnError}>
          <Text style={{ color: '#fff' }}>Regresar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* CABECERA Y BOTÓN ATRÁS */}
      <View style={styles.headerNav}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backIcon}>
          <Ionicons name="arrow-back" size={24} color="#2e7d32" />
        </TouchableOpacity>
      </View>

      {/* PERFIL VISUAL */}
      <View style={styles.profileCard}>
        <Image 
          source={{ uri: guia.foto || 'https://via.placeholder.com/150' }} 
          style={styles.avatar} 
        />
        <Text style={styles.nombre}>{guia.nombre}</Text>
        <Text style={styles.especialidad}>{guia.especialidad}</Text>
        
        <View style={styles.badge}>
          <Ionicons name="checkmark-circle" size={16} color="#fff" />
          <Text style={styles.badgeTxt}>Guía Autorizado</Text>
        </View>
      </View>

      {/* INFORMACIÓN ADICIONAL */}
      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>Sobre este guía</Text>
        <Text style={styles.infoText}>
          Disponible para expediciones en la Sierra Nevada del Cocuy. 
          Conocimiento profundo de las rutas hacia el Ritacuba Blanco y el Púlpito del Diablo.
        </Text>
      </View>

      {/* BOTÓN DE ACCIÓN: RESERVAR */}
      <Link href={{ pathname: "/reservar/[id]", params: { id: guia.id } } as any} asChild>
        <TouchableOpacity style={styles.btnReserva}>
          <Ionicons name="calendar-outline" size={22} color="#fff" />
          <Text style={styles.btnReservaTxt}>Solicitar Reserva Ahora</Text>
        </TouchableOpacity>
      </Link>

      <Text style={styles.disclaimer}>
        La reserva se coordinará directamente por WhatsApp con el guía seleccionado.
      </Text>
      
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  headerNav: { marginTop: 40, marginBottom: 10 },
  backIcon: { padding: 5 },
  profileCard: { alignItems: 'center', marginBottom: 30 },
  avatar: { width: 150, height: 150, borderRadius: 75, marginBottom: 15, borderWidth: 4, borderColor: '#e8f5e9' },
  nombre: { fontSize: 26, fontWeight: 'bold', color: '#1b5e20' },
  especialidad: { fontSize: 16, color: '#666', marginBottom: 12 },
  badge: { backgroundColor: '#2e7d32', flexDirection: 'row', paddingHorizontal: 15, paddingVertical: 6, borderRadius: 20, alignItems: 'center', gap: 5 },
  badgeTxt: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  infoBox: { backgroundColor: '#f9f9f9', padding: 20, borderRadius: 15, marginBottom: 25 },
  infoTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 8 },
  infoText: { color: '#555', lineHeight: 22 },
  btnReserva: { backgroundColor: '#2e7d32', padding: 20, borderRadius: 18, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10, elevation: 3 },
  btnReservaTxt: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  disclaimer: { textAlign: 'center', color: '#aaa', fontSize: 11, marginTop: 15 },
  errorTxt: { fontSize: 18, color: '#666', marginBottom: 20 },
  btnError: { backgroundColor: '#2e7d32', padding: 10, borderRadius: 10 }
});