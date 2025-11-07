// Importamos hooks de React
// useState: para manejar el estado del switch (ON / OFF)
// useEffect: para ejecutar animaciones cuando cambia el estado
// useRef: para guardar valores animados sin causar re-render
import { useState, useEffect, useRef } from 'react';

// Importamos componentes de React Native
// Animated nos permite animar componentes
// Pressable detecta pulsaciones (para que el usuario active el switch)
import { Text, StyleSheet, View, Pressable, Animated } from 'react-native';

// Componente SwitchButton
// Recibe props:
// - temporal: estado inicial (true = encendido, false = apagado)
// - isButton: si true, el usuario puede presionarlo; si false, solo se muestra
export default function SwitchButton({ temporal, isButton }) {

  // toggle es un valor animado (0 = OFF / 1 = ON)
  const toggle = useRef(new Animated.Value(temporal ? 1 : 0)).current;

  // value es el estado real del switch (booleano)
  const [value, setValue] = useState(temporal);

  // Se ejecuta cuando cambia el estado (value)
  // Activa la animación del movimiento del círculo
  useEffect(() => {
    Animated.timing(toggle, {
      toValue: value ? 1 : 0,   // 1 = mover a ON | 0 = mover a OFF
      duration: 250,            // duración de la animación
      useNativeDriver: false    // false porque animamos estilos (no posiciones físicas)
    }).start();
  }, [value]);  // Dependencia: se ejecuta cuando cambia "value"

  // Interpolación de animación para mover el círculo blanco de izquierda a derecha
  const animatedStyles = {
    transform: [
      {
        translateX: toggle.interpolate({
          inputRange: [0, 1],      // 0 = inicio, 1 = final
          outputRange: [2.5, 25.4],// valores en píxeles para mover el círculo
          extrapolate: 'clamp'     // evita que la animación se salga del rango
        })
      }
    ]
  };

  return (
    <View style={styles.container}>

      {/* isButton define si se puede presionar o solo mostrar el switch */}
      {isButton ? (

        // Pressable permite interacción del usuario
        <Pressable onPress={() => setValue(!value)}>

          {/* Contenedor del switch */}
          <View style={[styles.button, { backgroundColor: value ? '#14949c' : '#adadad' }]}>

            {/* Círculo animado que se mueve */}
            <Animated.View style={[styles.circle, animatedStyles]} />

            {/* Texto dinámico que cambia dependiendo de ON/OFF */}
            <View style={[styles.titlebox, { left: value ? 8 : 27 }]}>
              <Text style={styles.titletext}>{value ? 'on' : 'off'}</Text>
            </View>
          </View>
        </Pressable>

      ) : (

        // Si isButton es false, solo se muestra el switch sin interacción
        <View style={[styles.button, { backgroundColor: value ? '#14949c' : '#adadad' }]}>
          <Animated.View style={[styles.circle, animatedStyles]} />
          <View style={[styles.titlebox, { left: value ? 8 : 27 }]}>
            <Text style={styles.titletext}>
              {value ? 'on' : 'off'}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}

// ====== ESTILOS ======
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  },
  button: {
    width: 48,               // ancho del switch
    height: 24.8,            // alto del switch
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 35,        // bordes redondeados
    overflow: 'hidden'       // evita que el círculo se salga del contenedor
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 35,
    position: 'absolute',    // permite moverlo con translateX
    backgroundColor: '#fff',
    left: 0,                 // punto inicial antes de animarse
  },
  titlebox: {
    position: 'absolute'     // coloca el texto dentro del switch
  },
  titletext: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 7.5,
    paddingBottom: 1.5
  }
});
