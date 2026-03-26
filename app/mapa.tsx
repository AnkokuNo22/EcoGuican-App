import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// 1. Importaciones necesarias de react-native-maps
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';

export default function MapaRutas() {
  const router = useRouter();

  // 2. Coordenadas Centrales de Güicán, Boyacá, Colombia
  const regionInicial = {
    latitude: 6.2625, // Latitud de Güicán
    longitude: -72.4150, // Longitud de Güicán
    latitudeDelta: 0.1, // Zoom (0.1 es un buen balance)
    longitudeDelta: 0.1,
  };

  // 3. Puntos de una Ruta de Ejemplo (Simulando el Sendero Ritacuba)
  // Estos puntos dibujan la línea en el mapa
  const [rutaSimulada] = useState([
    { latitude: 6.2625, longitude: -72.4150 }, // Pueblo de Güicán
    { latitude: 6.2700, longitude: -72.3900 }, 
    { latitude: 6.2850, longitude: -72.3700 }, // Punto medio
    { latitude: 6.2950, longitude: -72.3500 }, // Base del Nevado
  ]);

  return (
    <View style={styles.container}>
      {/* 4. EL COMPONENTE DEL MAPA */}
      <MapView
        provider={PROVIDER_GOOGLE} // Recomendado para compatibilidad
        style={styles.map}
        initialRegion={regionInicial}
        showsUserLocation={true} // Muestra el puntito azul si hay GPS
        followsUserLocation={true} // Sigue al usuario si se mueve
      >
        {/* Marcador 1: El pueblo (Punto de inicio) */}
        <Marker 
          coordinate={{ latitude: 6.2625, longitude: -72.4150 }}
          title="Güicán de la Sierra"
          description="Punto de encuentro y registro"
          pinColor="#2e7d32" // Color verde Ecoturismo
        />

        {/* Marcador 2: Destino final (El Nevado) */}
        <Marker 
          coordinate={{ latitude: 6.2950, longitude: -72.3500 }}
          title="Nevado del Cocuy"
          description="Base del Glaciar Ritacuba"
        />

        {/* 5. POLILÍNEA: Dibuja el sendero entre los puntos */}
        <Polyline 
          coordinates={rutaSimulada}
          strokeColor="#1b5e20" // Verde oscuro para el sendero
          strokeWidth={4} // Grosor de la línea
        />
      </MapView>

      {/* 6. BOTÓN FLOTANTE PARA VOLVER (Arriba a la izquierda) */}
      <TouchableOpacity style={styles.btnVolver} onPress={() => router.back()}>
        <Text style={styles.txtVolver}>← Volver</Text>
      </TouchableOpacity>

      {/* 7. PANEL DE INFORMACIÓN DE LA RUTA (Abajo) */}
      <View style={styles.infoPanel}>
        <View style={styles.infoTitleRow}>
          <Ionicons name="trail-sign" size={24} color="#1b5e20" />
          <Text style={styles.infoTitulo}>Sendero El Paraíso (Ritacuba)</Text>
        </View>
        <Text style={styles.infoDetalle}>Dificultad: Alta | Tiempo aprox: 8 horas</Text>
        <Text style={styles.infoAviso}>Recuerda ir siempre con un Guía Local certificado.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // Asegura que el contenedor y el mapa ocupen toda la pantalla
  container: { 
    ...StyleSheet.absoluteFillObject, 
    justifyContent: 'flex-end', 
    alignItems: 'center' 
  },
  map: { 
    ...StyleSheet.absoluteFillObject 
  },
  
  // Estilos del Botón Volver
  btnVolver: { 
    position: 'absolute', 
    top: 50, 
    left: 20, 
    backgroundColor: 'white', 
    padding: 10, 
    borderRadius: 10, 
    elevation: 8, // Sombra para Android
    shadowColor: '#000', // Sombra para iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  txtVolver: { 
    color: '#2e7d32', 
    fontWeight: 'bold' 
  },

  // Estilos del Panel de Información
  infoPanel: { 
    backgroundColor: 'white', 
    width: '90%', 
    padding: 20, 
    borderRadius: 20, 
    marginBottom: 30, 
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
  },
  infoTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoTitulo: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#1b5e20',
    marginLeft: 10,
  },
  infoDetalle: { 
    fontSize: 14, 
    color: '#333', 
    marginBottom: 5,
    fontStyle: 'italic',
  },
  infoAviso: {
    fontSize: 12,
    color: '#d32f2f', // Color rojo para aviso de seguridad
    fontWeight: 'bold',
    marginTop: 5,
  }
});