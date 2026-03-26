🏔️ EcoGüicán App: Ecoturismo y Gestión de Guías
Plataforma móvil para la Sierra Nevada del Cocuy, Güicán y El Cocuy.
EcoGüicán es una solución tecnológica diseñada para cerrar la brecha entre el turista de alta montaña y el guía local certificado. La app centraliza la información de seguridad, el registro de profesionales y la gestión de reservas en un entorno nativo y fluido.
📖 Fundamentos del Proyecto
Esta aplicación se basa en la necesidad de digitalizar el sector turístico en Güicán de la Sierra, permitiendo que los guías locales tengan presencia digital y los turistas puedan prepararse adecuadamente para las condiciones extremas del páramo y el nevado.
Objetivos del Modelo:
•	Formalización: Permitir a los guías registrar su perfil profesional de forma local.
•	Seguridad: Educar al visitante sobre el sistema de 3 capas y el respeto al ecosistema.
•	Eficiencia: Automatizar la estructura de reserva para minimizar errores de comunicación.

🛠️ Stack Tecnológico
•	Lenguaje: TypeScript (Superset de JavaScript que aporta tipado fuerte y seguridad al código).
•	Framework: React Native con Expo SDK 50+.
•	Enrutamiento: Expo Router (Navegación basada en archivos de alta eficiencia).
•	Persistencia: AsyncStorage para el almacenamiento local de perfiles y configuraciones.
•	UI/UX: Componentes nativos optimizados, iconos de @expo/vector-icons y layouts responsivos.


🚀 Funcionalidades Implementadas
1. Gestión de Perfiles (Registro de Guías)
El núcleo de la app permite a los guías registrar su Nombre, Especialidad, WhatsApp e Imagen de perfil. Los datos se guardan de forma persistente en el dispositivo del usuario mediante AsyncStorage.
2. Directorio Dinámico e Inteligente
La pantalla de guías es híbrida: muestra guías pre-cargados (estáticos) y los guías nuevos que se registren en el dispositivo, permitiendo una navegación dinámica mediante IDs únicos hacia sus perfiles detallados.
3. Sistema de Reservas con Calendario
Integración de react-native-modal-datetime-picker para una selección de fecha visual. La lógica de envío está "blindada" contra errores de datos nulos y dispara un mensaje de WhatsApp pre-formateado al guía seleccionado.
4. Módulo de Preparación y Sostenibilidad
Sección dedicada a la educación ambiental:
•	Equipo: Recomendaciones de calzado y vestimenta técnica.
•	Conservación: Concientización sobre el cuidado del Frailejón y gestión de residuos.
•	Seguridad: Recordatorio sobre el Seguro de Montaña obligatorio.

📦 Instalación y Despliegue
1.	Clonar el repositorio:
Bash
git clone https://github.com/TuUsuario/EcoGuican-App.git
2.	Instalar dependencias:
Bash
npm install
3.	Librerías críticas utilizadas:
Bash
npx expo install expo-router @react-native-async-storage/async-storage react-native-modal-datetime-picker @react-native-community/datetimepicker expo-image-picker
4.	Ejecutar en desarrollo:
Bash
npx expo start

🗺️ Hoja de Ruta (Roadmap)
•	[ ] Módulo de Clima: Integración con API meteorológica para alertas en tiempo real en la Sierra.
•	[ ] Mapas Offline: Descarga de rutas GPX para navegación sin señal celular.
•	[ ] Galería de Biodiversidad: Identificación de flora y fauna local mediante fotos.

Desarrollado por: Cristian Daniel Buitrago Jején – 2026.
