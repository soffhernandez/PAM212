// Importamos React y los componentes necesarios desde react-native-web
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native-web';

// Creamos un arreglo con objetos para simular datos que vamos a mostrar
const DATA = [
  { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 },
  { id: 6 }, { id: 7 }, { id: 8 }, { id: 9 }, { id: 10 },
];

// Componente de encabezado simple
const SimpleHeader = () => {
  return (
    // View funciona como un contenedor (div)
    <View style={styles.header}>
      {/* Texto que aparece dentro del encabezado */}
      <Text style={styles.title}>ScrollView Horizontal</Text>
    </View>
  );
};

// Componente principal que muestra ScrollView horizontal
const SimpleScrollView = () => {
  return (
    <View style={styles.container}>

      {/* Llamamos al componente Header */}
      <SimpleHeader />

      {/* ScrollView sirve para hacer scroll en pantalla */}
      <ScrollView
        horizontal={true}                 // ← Hace que el scroll sea horizontal
        showsHorizontalScrollIndicator={false} // ← Oculta la barra de scroll
        contentContainerStyle={styles.scrollContent} // ← Estilos del contenido dentro del scroll
      >

        {/* Recorremos los elementos del arreglo DATA */}
        {DATA.map(val => {
          return (
            <View style={styles.card} key={val.id}>
              <Text style={styles.subtitle}>Soy una tarjeta</Text>
            </View>
          );
        })}

      </ScrollView>
    </View>
  );
};

export default SimpleScrollView;

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1, // Ocupa todo el espacio disponible
  },
  header: {
    height: 120,
    backgroundColor: '#181D31',
    justifyContent: 'center',  // Centra verticalmente
    alignItems: 'center',      // Centra horizontalmente
    paddingTop: 25,
  },
  title: {
    color: '#fff',
    fontWeight: 'bold', // ← estaba mal escrito como "boild"
    fontSize: 20,
  },
  scrollContent: {
    paddingVertical: 10,
  },
  card: {
    width: 100,
    height: 150,
    backgroundColor: '#E6DDC4',
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  subtitle: {
    color: '#181D31',
    fontWeight: 'bold',
  },
});
