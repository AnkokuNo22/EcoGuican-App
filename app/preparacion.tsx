import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function PreparacionScreen() {
  const router = useRouter();

  const recomendaciones = [
    { icon: 'shirt', title: 'Sistema de 3 Capas', desc: '1. Térmica (sudor), 2. Polar (calor), 3. Impermeable (viento/lluvia).' },
    { icon: 'footsteps', title: 'Calzado Adecuado', desc: 'Botas de montaña con buen agarre y caña alta para proteger el tobillo.' },
    { icon: 'water', title: 'Hidratación', desc: 'Llevar al menos 2 litros de agua. El aire seco de la sierra deshidrata rápido.' },
    { icon: 'sunny', title: 'Protección Solar', desc: 'Bloqueador solar y gafas con filtro UV. La radiación es más fuerte en la nieve.' },
    { icon: 'leaf', title: 'No tocar los Frailejones', desc: 'Son fábricas de agua. Un frailejón crece solo 1cm al año. ¡Cuídalos!' },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Prepárate para la Sierra</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.intro}>
          Subir a los nevados de <Text style={{fontWeight: 'bold'}}>Güicán</Text> requiere respeto y equipo adecuado. Sigue estas recomendaciones:
        </Text>

        {/* LISTA DE RECOMENDACIONES */}
        {recomendaciones.map((item, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.iconCircle}>
              <Ionicons name={item.icon as any} size={24} color="#2e7d32" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardDesc}>{item.desc}</Text>
            </View>
          </View>
        ))}

        {/* AVISO IMPORTANTE */}
        <View style={styles.alerta}>
          <Ionicons name="warning" size={24} color="#d32f2f" />
          <View style={{ flex: 1 }}>
            <Text style={styles.alertaTitle}>Seguro de Montaña</Text>
            <Text style={styles.alertaDesc}>
              Es obligatorio adquirir el seguro de rescate y asistencia médica antes de ingresar al Parque Nacional.
            </Text>
          </View>
        </View>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { 
    height: 150, 
    backgroundColor: '#1b5e20', 
    justifyContent: 'center', 
    paddingHorizontal: 20, 
    paddingTop: 40 
  },
  headerTitle: { color: '#fff', fontSize: 24, fontWeight: 'bold', marginTop: 10 },
  backBtn: { padding: 5 },
  content: { padding: 20 },
  intro: { fontSize: 16, color: '#555', lineHeight: 24, marginBottom: 25 },
  card: { 
    flexDirection: 'row', 
    backgroundColor: '#f8f9fa', 
    padding: 15, 
    borderRadius: 15, 
    marginBottom: 15, 
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eee'
  },
  iconCircle: { 
    width: 50, 
    height: 50, 
    borderRadius: 25, 
    backgroundColor: '#e8f5e9', 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginRight: 15 
  },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  cardDesc: { fontSize: 14, color: '#666', marginTop: 4 },
  alerta: { 
    backgroundColor: '#ffebee', 
    padding: 20, 
    borderRadius: 15, 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 15,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#ffcdd2'
  },
  alertaTitle: { fontWeight: 'bold', color: '#c62828', fontSize: 16 },
  alertaDesc: { color: '#d32f2f', fontSize: 13, marginTop: 2 }
});