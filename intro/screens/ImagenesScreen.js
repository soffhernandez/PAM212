// Importación de React y hooks: useEffect, useRef, useState
// useEffect ejecuta código cuando el componente se monta
// useRef guarda valores animados sin que se reinicien al renderizar
// useState maneja estados (por ejemplo, mostrar u ocultar pantallas)
import React, { useEffect, useRef, useState } from "react";

// Importación de componentes de React Native
// View y Text estructuran la pantalla
// Animated maneja animaciones
// StyleSheet define estilos
// Dimensions obtiene tamaño de pantalla
// ImageBackground coloca una imagen como fondo
import {
  View,
  Text,
  Animated,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from "react-native";

// Importa el módulo SplashScreen de Expo para controlar la pantalla de carga inicial
import * as SplashScreen from "expo-splash-screen";

// Evita que el splash desaparezca automáticamente al abrir la app
SplashScreen.preventAutoHideAsync();

// Obtiene la altura de la ventana del dispositivo (para las animaciones verticales)
const { height } = Dimensions.get("window");

// Componente principal que se exporta (la pantalla Splash con animación)
export default function SplashScreenPro() {

  // Estado que indica cuándo mostrar el contenido principal (después del Splash)
  const [showMain, setShowMain] = useState(false);
  const fadeLogo = useRef(new Animated.Value(0)).current;
  const scaleLogo = useRef(new Animated.Value(0.5)).current;
  const rotateLogo = useRef(new Animated.Value(0)).current;
  const slideText = useRef(new Animated.Value(height / 2)).current;
  const fadeOut = useRef(new Animated.Value(1)).current;



  useEffect(() => {
    // === Primera animación: entrada del logo ===
    Animated.parallel([     // Se ejecutan 3 animaciones al mismo tiempo (en paralelo):
      Animated.timing(fadeLogo, {
        toValue: 1,         // termina visible
        duration: 1200,     // dura 1.2 segundos
        useNativeDriver: false,
      }),
      Animated.spring(scaleLogo, {
        toValue: 1,         // tamaño normal
        friction: 5,        // rebote suave
        useNativeDriver: false,
      }),
      Animated.timing(rotateLogo, {
        toValue: 1,         // pasa de 0° a 10° (ver abajo)
        duration: 1200,
        useNativeDriver: false,
      }),
    ]).start(); // Inicia las animaciones

    // === Segunda animación: texto que sube y aparece ===
    Animated.timing(slideText, {
      toValue: 0,          // se mueve hacia su posición final (arriba)
      duration: 1000,      // 1 segundo
      useNativeDriver: false,
      delay: 800,         
    }).start();

    // === Tercera parte: desaparecer el splash y mostrar el contenido principal ===
    // Espera 3 segundos antes de iniciar el fade-out
    const timer = setTimeout(async () => {
      Animated.timing(fadeOut, {
        toValue: 0,        // opacidad 0 = invisible
        duration: 800,     // tarda 0.8 segundos
        useNativeDriver: false,
      }).start(async () => {
        // Cuando termina, oculta el splash original de Expo
        await SplashScreen.hideAsync();
        // Cambia el estado para mostrar el contenido principal
        setShowMain(true);
      });
    }, 3000);

    // Limpia el temporizador si el componente se desmonta
    return () => clearTimeout(timer);
  }, []);

  // Interpolación para la rotación del logo
  // Convierte valores de 0 a 1 en ángulos "0deg" a "10deg"
  const rotateInterpolate = rotateLogo.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "10deg"],
  });

   if (showMain) {
    return (
      <ImageBackground
        source={require("../assets/descarga.jpeg")} // Imagen de fondo
        style={styles.background}                   // Estilo que hace que ocupe toda la pantalla
        resizeMode='cover'                          // Ajusta la imagen sin distorsionar
      >
        {/* Capa oscura encima de la imagen para que el texto se vea bien */}
        <View style={styles.content}>
          <Text style={styles.text}>¡Bienvenido!</Text> {/* Texto que aparece al final */}
        </View>
      </ImageBackground>
    );
  }

  // Si todavía no se muestra la pantalla principal, mostramos el splash animado
  return (
    <Animated.View style={[styles.container, { opacity: fadeOut }]}> {/* Vista principal del splash */}
      
      {/* Imagen (logo) con animaciones de opacidad, tamaño y rotación */}
      <Animated.Image
        source={require("../assets/descarga.jpeg")}
        resizeMode="contain"
        style={[
          styles.logoImage,
          {
            opacity: fadeLogo, // Se va volviendo visible
            transform: [
              { scale: scaleLogo },         // Aumenta el tamaño
              { rotate: rotateInterpolate } // Gira un poco
            ],
          },
        ]}
      />

      {/* Texto animado que sube desde abajo */}
      <Animated.Text
        style={[styles.text, { transform: [{ translateY: slideText }] }]}
      >¡ImageBackground & Splash Screen!
      </Animated.Text>

      {/* Barra animada que da efecto de "cargando" */}
      <Animated.View
        style={[
          styles.loader,
          {
            opacity: fadeLogo, // Aparece junto con el logo
            transform: [
              {
                translateX: slideText.interpolate({
                  inputRange: [0, height / 2], // Usa la animación del texto
                  outputRange: [0, -50],       // Se mueve un poco a la izquierda
                }),
              },
            ],
          },
        ]}
      />
    </Animated.View>
  );
}

// ======== ESTILOS ========
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#007bffff", // fondo azul
    justifyContent: "center",
    alignItems: "center",
  },
  loader: {
    width: 60,
    height: 6,
    backgroundColor: "#fff",
    borderRadius: 3,
  },
  logoImage: {
    width: 300,
    height: 300,
    marginBottom: 5,
  },
  background: {
    flex: 1, // ocupa toda la pantalla
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    backgroundColor: "rgba(0, 0, 0, 0.5)", // caja semi-transparente
    padding: 20,
    borderRadius: 10,
  },
  text: {
    color: "white",
    fontSize: 24,
    marginBottom: 10,
    textAlign: "center",
  },
});
