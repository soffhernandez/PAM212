// Importamos React y los componentes necesarios
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native-web';

// Array con 10 elementos para mapear en tarjetas
const DATA = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
  { id: 7 },
  { id: 8 },
  { id: 9 },
  { id: 10 },
];

// Componente del encabezado
const SimpleHeader = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>ScrollView Vertical</Text>
    </View>
  );
};

// Componente principal que muestra el ScrollView
const SimpleScrollView2 = () => {
  return (
    <View>
      <SimpleHeader />

      {/* ScrollView permite hacer scroll vertical por defecto */}
      <ScrollView
        showsVerticalScrollIndicator={false} // Oculta la barra de scroll
      >
        {/* Mapeamos las tarjetas */}
        {DATA.map(val => {
          return (
            <View style={styles.card} key={val.id}>
              <Text style={styles.subtitle}>¡Soy una tarjeta!</Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default SimpleScrollView2;

// Estilos
const styles = StyleSheet.create({
  header: {
    height: 120,
    backgroundColor: '#181D31',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 25,
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',   // ✅ corregido
    fontSize: 20,
  },
  card: {
    height: 100,
    backgroundColor: '#E6DDC4',
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  subtitle: {
    color: '#181D31',
    fontWeight: 'bold',
  },
});
