import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function PantallaReservasPrincipal() {
  const router = useRouter();
  const [guiasDisponibles, setGuiasDisponibles] = useState<any[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarGuias = async () => {
      // 1. Datos base con teléfonos garantizados
      const estaticos = [
        { id: '1', nombre: 'Carlos Mendoza', especialidad: 'Aves', foto: 'https://randomuser.me/api/portraits/men/32.jpg', telefono: '573100000001' },
        { id: '2', nombre: 'Elena Ruiz', especialidad: 'Senderismo', foto: 'https://randomuser.me/api/portraits/women/44.jpg', telefono: '573100000002' },
      ];

      try {
        const local = await AsyncStorage.getItem('@guia_registrado');
        if (local) {
          const guiaLocal = JSON.parse(local);
          // Solo lo agregamos si tiene un ID válido
          if (guiaLocal && guiaLocal.id) {
            setGuiasDisponibles([...estaticos, guiaLocal]);
          } else {
            setGuiasDisponibles(estaticos);
          }
        } else {
          setGuiasDisponibles(estaticos);
        }
      } catch (e) {
        setGuiasDisponibles(estaticos);
      } finally {
        setCargando(false);
      }
    };

    cargarGuias();
  }, []);

  if (cargando) {
    return <ActivityIndicator size="large" color="#e67e22" style={{ marginTop: 50 }} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#e67e22" />
        </TouchableOpacity>
        <Text style={styles.tituloHeader}>Sistema de Reservas</Text>
      </View>

      <View style={styles.banner}>
        <Ionicons name="information-circle" size={20} color="#fff" />
        <Text style={styles.bannerTxt}>Selecciona un guía para programar tu visita.</Text>
      </View>

      <FlatList
        data={guiasDisponibles}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 20 }}
        renderItem={({ item }) => (
          /* USAMOS AS ANY PARA EVITAR ERRORES DE TIPADO EN EL LINK */
          <Link href={{ pathname: "/reservar/[id]", params: { id: item.id } } as any} asChild>
            <TouchableOpacity style={styles.guiaCard}>
              <Image source={{ uri: item.foto || 'https://via.placeholder.com/150' }} style={styles.img} />
              <View style={{ flex: 1 }}>
                <Text style={styles.nombre}>{item.nombre}</Text>
                <Text style={styles.especialidad}>{item.especialidad || 'Guía Local'}</Text>
              </View>
              <View style={styles.btnIr}>
                <Text style={styles.btnIrTxt}>Reservar</Text>
                <Ionicons name="chevron-forward" size={16} color="#fff" />
              </View>
            </TouchableOpacity>
          </Link>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>No hay guías disponibles.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { marginTop: 50, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, gap: 15, marginBottom: 10 },
  tituloHeader: { fontSize: 20, fontWeight: 'bold', color: '#333' },
  banner: { backgroundColor: '#e67e22', margin: 20, padding: 15, borderRadius: 12, flexDirection: 'row', alignItems: 'center', gap: 10 },
  bannerTxt: { color: '#fff', fontSize: 13, flex: 1, fontWeight: '500' },
  guiaCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f9f9f9', padding: 15, borderRadius: 15, marginBottom: 15, borderWidth: 1, borderColor: '#eee' },
  img: { width: 50, height: 50, borderRadius: 25, marginRight: 15 },
  nombre: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  especialidad: { fontSize: 13, color: '#e67e22' },
  btnIr: { backgroundColor: '#e67e22', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 10, gap: 5 },
  btnIrTxt: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  empty: { textAlign: 'center', marginTop: 50, color: '#999' }
});