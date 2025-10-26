import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  Switch,
  Button,
  StyleSheet,
  Animated,
  ImageBackground,
  Image
} from 'react-native';

export default function Repaso() {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [acepta, setAcepta] = useState(false);
  const [showMain, setShowMain] = useState(false);
  const [alerta, setAlerta] = useState(''); // Mensaje de error o éxito

  const fadeLogo = useRef(new Animated.Value(0)).current;
  const scaleLogo = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    // Animación del splash
    Animated.parallel([
      Animated.timing(fadeLogo, { toValue: 1, duration: 1000, useNativeDriver: true }),
      Animated.spring(scaleLogo, { toValue: 1, friction: 5, useNativeDriver: true })
    ]).start();

    const timer = setTimeout(() => setShowMain(true), 2000); // Duración splash
    return () => clearTimeout(timer);
  }, []);

  const mostrarAlerta = (mensaje) => {
    setAlerta(mensaje);
    setTimeout(() => setAlerta(''), 5000);
  };

  // Función para registrar usuario
  const registrar = () => {
    if (!nombre.trim() || !correo.trim()) {
      mostrarAlerta('Por favor completa todos los campos.');
      return;
    }
    if (!acepta) {
      mostrarAlerta(' Debes aceptar los términos y condiciones.');
      return;
    }

    mostrarAlerta(`Registro exitoso! Bienvenido, ${nombre} con correo ${correo}.`);
    setNombre('');
    setCorreo('');
    setAcepta(false);
  };

  if (!showMain) {
    // Splash que ocupa toda la pantalla con imagen
    return (
      <View style={styles.splashContainer}>
        <Animated.Image
          source={require('../assets/descarga.png')} 
          style={[
            styles.logo,
            { opacity: fadeLogo, transform: [{ scale: scaleLogo }] }
          ]}
          resizeMode="contain"
        />
        <Text style={styles.splashText}>Bienvenido</Text>
      </View>
    );
  }

  return (
    <ImageBackground
      source={require('../assets/hogwarts-harry-potter-11461.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.titulo}>Registro de Usuario</Text>

        {alerta ? <Text style={styles.alerta}>{alerta}</Text> : null} {/** alerta de la página*/}

        <TextInput
          style={styles.input}
          placeholder="Nombre completo"
          value={nombre}
          onChangeText={setNombre}
        />

        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          value={correo}
          onChangeText={setCorreo}
          keyboardType="email-address"
        />

        <View style={styles.switchContainer}>
          <Text style={styles.textoTerminos}>Aceptar términos</Text>
          <Switch value={acepta} onValueChange={setAcepta} />
        </View>

        <Button title="Registrarse" onPress={registrar} />
      </View>
    </ImageBackground>
  );
}

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
