import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const ESTATICOS = [
  { id: '1', nombre: 'Carlos Mendoza', especialidad: 'Aves', telefono: '573100000001', foto: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { id: '2', nombre: 'Elena Ruiz', especialidad: 'Senderismo', telefono: '573100000002', foto: 'https://randomuser.me/api/portraits/women/44.jpg' },
];

export default function Directorio() {
  const [lista, setLista] = useState(ESTATICOS);

  useEffect(() => {
    const cargar = async () => {
      const res = await AsyncStorage.getItem('@guia_registrado');
      if (res) {
        const nuevo = JSON.parse(res);
        setLista([...ESTATICOS, nuevo]);
      }
    };
    cargar();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Guías Disponibles</Text>
      <FlatList
        data={lista}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Link href={{ pathname: "/guia/[id]", params: { id: item.id } } as any} asChild>
            <TouchableOpacity style={styles.card}>
              <Image source={{ uri: item.foto || 'https://via.placeholder.com/150' }} style={styles.img} />
              <View>
                <Text style={styles.name}>{item.nombre}</Text>
                <Text style={styles.sub}>{item.especialidad}</Text>
              </View>
            </TouchableOpacity>
          </Link>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 50, backgroundColor: '#fff' },
  titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, color: '#1b5e20' },
  card: { flexDirection: 'row', padding: 15, backgroundColor: '#f9f9f9', borderRadius: 12, marginBottom: 10, alignItems: 'center' },
  img: { width: 50, height: 50, borderRadius: 25, marginRight: 15 },
  name: { fontWeight: 'bold', fontSize: 16 },
  sub: { color: '#666', fontSize: 13 }
});