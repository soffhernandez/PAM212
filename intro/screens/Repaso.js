// Importamos React y algunos hooks importantes
import React, { useState, useEffect, useRef } from 'react';

// Importamos componentes de React Native
import {
  View,        // Contenedor (como un div)
  Text,        // Mostrar texto
  TextInput,   // Caja de texto para escribir
  Switch,      // Botón tipo interruptor (On/Off)
  Button,      // Botón nativo
  StyleSheet,  // Permite crear estilos
  Animated,    // Nos permite crear animaciones
  ImageBackground, // Fondo con imagen
  Image        // Imágenes normales
} from 'react-native';


// Componente principal
export default function Repaso() {

  // Estados (variables que cambian cuando el usuario escribe o interactúa)
  const [nombre, setNombre] = useState('');   // Guarda el nombre del usuario
  const [correo, setCorreo] = useState('');   // Guarda el correo del usuario
  const [acepta, setAcepta] = useState(false); // Guarda si aceptó los términos
  const [showMain, setShowMain] = useState(false); // Cambia entre splash y pantalla principal
  const [alerta, setAlerta] = useState(''); // Guarda un mensaje de alerta o error

  // Valores animados para el splash screen
  const fadeLogo = useRef(new Animated.Value(0)).current;   // Opacidad inicial (0 = invisible)
  const scaleLogo = useRef(new Animated.Value(0.5)).current; // Tamaño inicial reducido

  // useEffect se ejecuta al cargar la pantalla (solo una vez)
  useEffect(() => {

    // Animación paralela: fade + escala
    Animated.parallel([
      Animated.timing(fadeLogo, { toValue: 1, duration: 1000, useNativeDriver: true }), // Aparece
      Animated.spring(scaleLogo, { toValue: 1, friction: 5, useNativeDriver: true })     // Se hace grande
    ]).start();

    // Después de 2 segundos, cambiar a la pantalla principal
    const timer = setTimeout(() => setShowMain(true), 2000);

    // Limpiar el temporizador cuando el componente se elimine
    return () => clearTimeout(timer);
  }, []);


  // Función para mostrar mensajes de alerta en pantalla
  const mostrarAlerta = (mensaje) => {
    setAlerta(mensaje);           // Se muestra el mensaje recibido
    setTimeout(() => setAlerta(''), 5000); // Se borra en 5 segundos
  };


  // Función para registrar usuario
  const registrar = () => {

    // Validación: si un campo está vacío
    if (!nombre.trim() || !correo.trim()) {
      mostrarAlerta('Por favor completa todos los campos.');
      return;
    }

    // Validación: si no ha aceptado los términos
    if (!acepta) {
      mostrarAlerta(' Debes aceptar los términos y condiciones.');
      return;
    }

    // Si todo está bien → mostrar mensaje de registro exitoso
    mostrarAlerta(`Registro exitoso! Bienvenido, ${nombre} con correo ${correo}.`);

    // Limpiar campos
    setNombre('');
    setCorreo('');
    setAcepta(false);
  };


  // Mientras showMain sea false, se muestra el SPLASH
  if (!showMain) {
    return (
      <View style={styles.splashContainer}>
        <Animated.Image
          source={require('../assets/descarga.png')} // Logo del splash
          style={[
            styles.logo,
            { opacity: fadeLogo, transform: [{ scale: scaleLogo }] } // Animaciones aplicadas
          ]}
          resizeMode="contain"
        />
        <Text style={styles.splashText}>Bienvenido</Text>
      </View>
    );
  }


  // Si showMain es true, se muestra la pantalla principal
  return (
    <ImageBackground
      source={require('../assets/hogwarts-harry-potter-11461.jpg')} // Imagen de fondo
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>

        <Text style={styles.titulo}>Registro de Usuario</Text>

        {/* Si hay alerta, se muestra aquí */}
        {alerta ? <Text style={styles.alerta}>{alerta}</Text> : null}

        {/* Campo Nombre */}
        <TextInput
          style={styles.input}
          placeholder="Nombre completo"
          value={nombre}
          onChangeText={setNombre} // Actualiza el estado
        />

        {/* Campo Correo */}
        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          value={correo}
          onChangeText={setCorreo}
          keyboardType="email-address" // Cambia el teclado a uno con '@'
        />

        {/* Switch de aceptar términos */}
        <View style={styles.switchContainer}>
          <Text style={styles.textoTerminos}>Aceptar términos</Text>
          <Switch value={acepta} onValueChange={setAcepta} />
        </View>

        {/* Botón de registrar */}
        <Button title="Registrarse" onPress={registrar} />
      </View>
    </ImageBackground>
  );
}


// Estilos del componente
const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#181D31'
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20
  },
  splashText: {
    fontSize: 28,
    color: 'white',
    fontWeight: 'bold'
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    width: '90%',
    padding: 20,
    gap: 15,
    backgroundColor: 'rgba(255,255,255,0.85)',
    borderRadius: 15
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center'
  },
  alerta: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ff3333',
    marginBottom: 10,
    textAlign: 'center'
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#555',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#fff'
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10
  },
  textoTerminos: {
    fontSize: 16,
    fontWeight: '500'
  }
});
