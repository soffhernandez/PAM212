// Importación de React y los hooks useEffect, useRef y useState
// useEffect → ejecuta acciones cuando el componente se monta
// useRef → crea valores que NO se reinician cuando el componente se vuelve a renderizar
// useState → maneja estados internos del componente
import React, { useEffect, useRef, useState } from "react";

// Importación de componentes desde React Native
import {
  View,            // Contenedor (como un div)
  Text,            // Etiqueta de texto
  Animated,        // Permite animaciones (scale, fade, rotate, slide, etc.)
  StyleSheet,      // Maneja los estilos en RN
  Dimensions,      // Permite obtener dimensiones de la pantalla
  ImageBackground, // Imagen como fondo
} from "react-native";

// Módulo de Expo para controlar el splash screen nativo
import * as SplashScreen from "expo-splash-screen";

// Evita que el splash original desaparezca automáticamente
SplashScreen.preventAutoHideAsync();

// Obtenemos la altura de la pantalla del dispositivo
// Esto se usa para animar el texto desde fuera de la pantalla hacia arriba
const { height } = Dimensions.get("window");

// ===========================================================
// ✅ Componente principal: Splash Screen animado
// ===========================================================
export default function SplashScreenPro() {

  // Estado que controla cuándo mostrar la pantalla principal
  const [showMain, setShowMain] = useState(false);

  // Valores animados (Animated.Value)
  // Se inicializan con valores por defecto
  const fadeLogo = useRef(new Animated.Value(0)).current;     // Opacidad del logo (0 = invisible)
  const scaleLogo = useRef(new Animated.Value(0.5)).current;  // Tamaño del logo (0.5 = más pequeño)
  const rotateLogo = useRef(new Animated.Value(0)).current;   // Rotación (0 = sin giro)
  const slideText = useRef(new Animated.Value(height / 2)).current; // Texto inicia fuera de pantalla (abajo)
  const fadeOut = useRef(new Animated.Value(1)).current;      // Opacidad del splash completo

  // useEffect se ejecuta una sola vez cuando el componente carga
  useEffect(() => {
    
    // === PRIMERA ANIMACIÓN: animación del logo ===
    Animated.parallel([ // Ejecuta varias animaciones al mismo tiempo
      Animated.timing(fadeLogo, {
        toValue: 1,        // Opacidad pasa de 0 → 1
        duration: 1200,    // dura 1200 ms
        useNativeDriver: false,
      }),
      Animated.spring(scaleLogo, {
        toValue: 1,        // Escala de 0.5 → 1 (rebote)
        friction: 5,
        useNativeDriver: false,
      }),
      Animated.timing(rotateLogo, {
        toValue: 1,        // Se convertirá en un ángulo usando interpolate()
        duration: 1200,
        useNativeDriver: false,
      }),
    ]).start(); // aquí se ejecutan

    // === SEGUNDA ANIMACIÓN: texto sube desde abajo ===
    Animated.timing(slideText, {
      toValue: 0,          // Posición final
      duration: 1000,
      delay: 800,          // Se ejecuta un poco después del logo
      useNativeDriver: false,
    }).start();

    // === TERCERA ANIMACIÓN: desaparece el splash y carga la app ===
    const timer = setTimeout(async () => {

      Animated.timing(fadeOut, {
        toValue: 0,        // Se hace transparente
        duration: 800,
        useNativeDriver: false,
      }).start(async () => {
        await SplashScreen.hideAsync(); // Esconde el splash nativo de Expo
        setShowMain(true);             // Cambia a la pantalla principal
      });

    }, 3000); // Espera 3 segundos antes de empezar a desvanecer

    return () => clearTimeout(timer);
  }, []);

  // Interpolación de rotación (convierte el 0 a 1 en ángulos)
  const rotateInterpolate = rotateLogo.interpolate({
    inputRange: [0, 1],        // De 0 → 1
    outputRange: ["0deg", "10deg"], // De 0° → 10° (leve giro)
  });

  // ======================================================
  // 📌 Si ya terminó el splash, renderiza el contenido final
  // ======================================================
  if (showMain) {
    return (
      <ImageBackground
        source={require("../assets/descarga.jpeg")} // Imagen de fondo
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.content}>
          <Text style={styles.text}>¡Bienvenido!</Text>
        </View>
      </ImageBackground>
    );
  }

  // ======================================================
  // 📌 Si NO ha terminado, mostramos la pantalla animada
  // ======================================================
  return (
    <Animated.View style={[styles.container, { opacity: fadeOut }]}>

      {/* Logo animado */}
      <Animated.Image
        source={require("../assets/descarga.jpeg")}
        resizeMode="contain"
        style={[
          styles.logoImage,
          {
            opacity: fadeLogo, // Fade in
            transform: [
              { scale: scaleLogo },        // Aumenta o disminuye el tamaño
              { rotate: rotateInterpolate } // Gira ligeramente
            ],
          },
        ]}
      />

      {/* Texto que sube desde abajo */}
      <Animated.Text
        style={[styles.text, { transform: [{ translateY: slideText }] }]}
      >
        ¡ImageBackground & Splash Screen!
      </Animated.Text>

      {/* Barra de carga animada */}
      <Animated.View
        style={[
          styles.loader,
          {
            opacity: fadeLogo,
            transform: [
              {
                translateX: slideText.interpolate({
                  inputRange: [0, height / 2],
                  outputRange: [0, -50], // Se desliza ligeramente
                }),
              },
            ],
          },
        ]}
      />
    </Animated.View>
  );
}

// ===========================================================
// ✅ Estilos
// ===========================================================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#007bffff",
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
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Oscurece el fondo para que el texto se vea
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
