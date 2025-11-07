// Importamos React y los componentes necesarios desde react-native
import React from 'react';
import {
  View,          // Contenedor (como un div)
  Text,          // Mostrar texto
  FlatList,      // Lista optimizada para mostrar muchos elementos
  SectionList,   // Lista por secciones con encabezados
  StyleSheet,    // Estilos en React Native
} from 'react-native';

// ✅ Datos para la FlatList (lista simple)
// Cada objeto representa un alumno con id y nombre
const alumnos = [
  { id: '1', nombre: 'Rafa' },
  { id: '2', nombre: 'Fer' },
  { id: '3', nombre: 'Emily' },
  { id: '4', nombre: 'Cris' },
  { id: '5', nombre: 'David' },
];

// ✅ Datos para la SectionList (lista con encabezados y elementos dentro)
const categorias = [
  {
    titulo: 'Primavera',     // Nombre del encabezado (título de la sección)
    data: ['Marzo', 'Abril', 'Mayo'], // Elementos dentro de la sección
  },
  {
    titulo: 'Verano',
    data: ['Junio', 'Julio', 'Agosto'],
  },
  {
    titulo: 'Otoño',
    data: ['Septiembre', 'Octubre', 'Noviembre'],
  },
  {
    titulo: 'Invierno',
    data: ['Diciembre', 'Enero', 'Febrero'],
  },
];

// ✅ Componente principal que se exporta
export default function FlatListScreen() {
  return (
    // Vista principal que envuelve todo
    <View style={styles.container}>

      {/* Título para la FlatList */}
      <Text style={styles.title}>Ejemplo de FlatList</Text>

      {/* 📌 FLATLIST
          Lista que renderiza cada alumno */}
      <FlatList
        data={alumnos}                        // Arreglo que se va a recorrer
        keyExtractor={(item) => item.id}      // Clave única por cada elemento (obligatorio)
        renderItem={({ item }) => (           // Cómo se muestra cada elemento de la lista
          <View style={styles.itemBox}>
            <Text style={styles.itemText}>* {item.nombre}</Text>
          </View>
        )}
      />

      {/* Título para la SectionList */}
      <Text style={styles.title}>Ejemplo de SectionList</Text>

      {/* 📌 SECTIONLIST
          Lista dividida por secciones con encabezados */}
      <SectionList
        sections={categorias}                                 // Las secciones que se van a mostrar
        keyExtractor={(item, index) => item + index}          // Llave única por cada elemento
        renderItem={({ item }) => (                           // Cómo se muestra cada dato dentro de cada sección
          <Text style={styles.itemText}>• {item}</Text>
        )}
        renderSectionHeader={({ section: { titulo } }) => (   // Cómo se muestra el encabezado de cada sección
          <Text style={styles.sectionHeader}>{titulo}</Text>
        )}
      />
    </View>
  );
}

// 🎨 Estilos para los componentes
const styles = StyleSheet.create({
  container: {
    flex: 1,                // Ocupa toda la pantalla
    backgroundColor: '#0B0B0B',
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
  },
  itemBox: {
    backgroundColor: '#1e1e1e',
    padding: 10,
    marginVertical: 5,    // Espacio entre elementos
    borderRadius: 8,      // Bordes redondeados
  },
  itemText: {
    color: '#fff',
    fontSize: 16,
  },
  sectionHeader: {
    color: '#00bfff',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
  },
});
