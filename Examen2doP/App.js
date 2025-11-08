// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';


// const SimpleHeader = () => {
//   return (
//     <View style ={styles.header}>
//     <View style={styles.header}>
//       <Text style={styles.title}>ScrollView Vertical</Text>
//     </View>
//      </View>
//   );
// };

// export default function App() {
  

// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

// Importamos React y los componentes necesarios
import React from 'react';
import { ScrollView, StyleSheet, Text, View} from 'react-native-web';

// Array con 10 elementos para mapear en tarjetas
const DATA = [
 {id:1},
 {id:2},
 {id:3},
 {id:4},
 {id:5},
 {id:6},
 {id:7},
 {id:8},
 {id:9},
 {id:10},
]; 

// Componente del encabezado
const SimpleHeader = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>EL RINCÓN DEL CHISME</Text>
    </View>
  );
};

const SimpleScrollView = () => {
  return (
    <View>
         <View style={styles.container}></View>
      {/* ScrollView permite hacer scroll vertical por defecto */}
        <SimpleHeader />
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

const styles = StyleSheet.create({
  header: {
    height: 120,
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
     subtitle: {
    color: '#181D31',
    fontWeight: 'bold',
      },
      },
});
