// // Importamos React y algunos "hooks" que nos ayudan a manejar estados, efectos y valores animados
// import React, { useEffect, useRef, useState } from "react";

// // Importamos componentes básicos de React Native: vistas, texto, animaciones, estilos y dimensiones de pantalla
// import { View, Text, Animated, StyleSheet, Dimensions,ImageBackground } from "react-native";

// // Importamos el SplashScreen de Expo (la pantalla de carga inicial que aparece al abrir la app)
// import * as SplashScreen from "expo-splash-screen";

// // También importamos un componente que nos permite poner imágenes de fondo


// // Esta línea evita que el splash de Expo se oculte solo.
// // Nosotros controlaremos cuándo desaparece con código.
// SplashScreen.preventAutoHideAsync();

// // Guardamos el ancho y alto de la pantalla del celular en dos variables
// const { height} = Dimensions.get("window");

// // Aquí empieza nuestro componente principal
// export default function SplashScreenPro() {

//   // Este estado sirve para saber qué pantalla mostrar:
//   // false = mostrar el splash animado
//   // true = mostrar la pantalla principal
//   const [showMain, setShowMain] = useState(false);

//   // A continuación creamos las animaciones con useRef (para que los valores no se pierdan al renderizar)
//   // fadeLogo → controla la opacidad (aparece poco a poco)
//   const fadeLogo = useRef(new Animated.Value(0)).current;

//   // scaleLogo → controla el tamaño del logo (empieza pequeño y crece)
//   const scaleLogo = useRef(new Animated.Value(0.5)).current;

//   // rotateLogo → controla la rotación (gira un poquito)
//   const rotateLogo = useRef(new Animated.Value(0)).current;

//   // slideText → hace que el texto suba desde la parte de abajo
//   const slideText = useRef(new Animated.Value(height / 2)).current;

//   // fadeOut → se usa para desvanecer toda la pantalla splash al final, degradado
//   const fadeOut = useRef(new Animated.Value(1)).current;

//   // funcion de react controla las animaciones se ejecuta una sola vez al iniciar el componente
//   useEffect(() => {  



//     // Este bloque hace que las 3 animaciones del logo (aparecer, agrandarse y rotar) se ejecuten al mismo tiempo
//     Animated.parallel([ // ejecuta los tres al mismo tiempo

//       Animated.timing(fadeLogo, {     // Animación de aparición
//         toValue: 1,                   // Termina totalmente visible
//         duration: 1200,               // Dura 1.2 segundos
//         useNativeDriver: false,         
//       }),
//       Animated.spring(scaleLogo, {    // Animación de crecimiento
//         toValue: 1,                   // Tamaño normal
//         friction: 5,                  // Rebote suave
//         useNativeDriver: false,
//       }),
//       Animated.timing(rotateLogo, {   // Animación de rotación
//         toValue: 1,                   // Termina en el valor 1 (luego se traduce a grados)
//         duration: 1200,
//         useNativeDriver: false,
//       }),
//     ]).start(); // Inicia las tres animaciones




//     // Esta animación mueve el texto hacia arriba, apareciendo después del logo
//     Animated.timing(slideText, {
//       toValue: 0,                     // Llega al centro de la pantalla
//       duration: 1000,                 // Dura 1 segundo
//       useNativeDriver: false,
//       delay: 800,                     // Espera un poco para no salir antes del logo
//     }).start();

//     // Aquí usamos un temporizador para controlar cuánto dura el splash en pantalla
//     const timer = setTimeout(async () => {
//       // Después de 3 segundos, se empieza a desvanecer el splash completo
//       Animated.timing(fadeOut, {
//         toValue: 0,                   // Se desvanece a opacidad 0
//         duration: 800,                // En 0.8 segundos
//         useNativeDriver: false,
//       }).start(async () => {
//         // Cuando termine el desvanecimiento, escondemos el splash de Expo
//         await SplashScreen.hideAsync();

//         // Y activamos la pantalla principal
//         setShowMain(true);
//       });
//     }, 3000); // Espera 3 segundos antes de ejecutar esto

//     // Si el componente se cierra antes de terminar el tiempo, limpiamos el temporizador
//     return () => clearTimeout(timer);
//   }, []); // [] significa que este bloque solo se ejecuta una vez

//   // Este bloque traduce el valor de rotación (0→1) a grados reales (0°→10°)
//   const rotateInterpolate = rotateLogo.interpolate({
//     inputRange: [0, 1],
//     outputRange: ["0deg", "10deg"],
//   });

//   // Si el estado showMain es verdadero, mostramos la pantalla principal (después del splash)
//   if (showMain) {
//     return (
//       <ImageBackground
//         source={require("../assets/descarga.jpeg")} // Imagen de fondo
//         style={styles.background}                   // Estilo que hace que ocupe toda la pantalla
//         resizeMode='cover'                          // Ajusta la imagen sin distorsionar
//       >
//         {/* Capa oscura encima de la imagen para que el texto se vea bien */}
//         <View style={styles.content}>
//           <Text style={styles.text}>¡Bienvenido!</Text> {/* Texto que aparece al final */}
//         </View>
//       </ImageBackground>
//     );
//   }

//   // Si todavía no se muestra la pantalla principal, mostramos el splash animado
//   return (
//     <Animated.View style={[styles.container, { opacity: fadeOut }]}> {/* Vista principal del splash */}
      
//       {/* Imagen (logo) con animaciones de opacidad, tamaño y rotación */}
//       <Animated.Image
//         source={require("../assets/descarga.jpeg")}
//         resizeMode="contain"
//         style={[
//           styles.logoImage,
//           {
//             opacity: fadeLogo, // Se va volviendo visible
//             transform: [
//               { scale: scaleLogo },         // Aumenta el tamaño
//               { rotate: rotateInterpolate } // Gira un poco
//             ],
//           },
//         ]}
//       />

//       {/* Texto animado que sube desde abajo */}
//       <Animated.Text
//         style={[styles.text, { transform: [{ translateY: slideText }] }]}
//       >
//         ¡ImageBackground & Splash Screen!
//       </Animated.Text>

//       {/* Barra animada que da efecto de "cargando" */}
//       <Animated.View
//         style={[
//           styles.loader,
//           {
//             opacity: fadeLogo, // Aparece junto con el logo
//             transform: [
//               {
//                 translateX: slideText.interpolate({
//                   inputRange: [0, height / 2], // Usa la animación del texto
//                   outputRange: [0, -50],       // Se mueve un poco a la izquierda
//                 }),
//               },
//             ],
//           },
//         ]}
//       />
//     </Animated.View>
//   );
// }

// // Aquí están todos los estilos del componente
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,                        // Ocupa toda la pantalla
//     backgroundColor: "#007bffff",   // Fondo azul
//     justifyContent: "center",       // Centra verticalmente
//     alignItems: "center",           // Centra horizontalmente
//   },
//   text: {
//     color: 'white',                 // Texto blanco
//     fontSize: 24,                   // Tamaño de letra
//     marginBottom: 10,               // Espacio debajo del texto
//     textAlign: 'center',            // Texto centrado
//   },
//   loader: {
//     width: 60,                      // Ancho de la barra
//     height: 6,                      // Alto de la barra
//     backgroundColor: "#fff",        // Color blanco
//     borderRadius: 3,                // Bordes redondeados
//   },
//   logoImage: {
//     width: 300,                     // Tamaño del logo (ancho)
//     height: 300,                    // Tamaño del logo (alto)
//     marginBottom: 5,                // Espacio debajo del logo
//   },
//   background: {
//     flex: 1,
//     width: '100%',
//     height: '100%',
//     justifyContent: 'center',       // Centra el contenido verticalmente
//     alignItems: 'center',           // Centra horizontalmente
//   },
//   content: {
//     backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo negro semitransparente sobre la imagen
//     padding: 20,                            // Espacio interno
//     borderRadius: 10,                       // Bordes redondeados
//   },
// });







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

  // ======== Definición de animaciones =========

  // Animación de opacidad del logo (fade)
  const fadeLogo = useRef(new Animated.Value(0)).current;

  // Animación de escala del logo (zoom)
  const scaleLogo = useRef(new Animated.Value(0.5)).current;

  // Animación de rotación del logo
  const rotateLogo = useRef(new Animated.Value(0)).current;

  // Animación para mover el texto verticalmente
  const slideText = useRef(new Animated.Value(height / 2)).current;

  // Animación de salida (fade out de toda la pantalla Splash)
  const fadeOut = useRef(new Animated.Value(1)).current;

  // useEffect se ejecuta al cargar el componente
  useEffect(() => {
    // === Primera animación: entrada del logo ===
    // Se ejecutan 3 animaciones al mismo tiempo (en paralelo):
    // - Fade del logo
    // - Escalado (zoom)
    // - Rotación ligera
    Animated.parallel([
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
      delay: 800,          // empieza un poco después del logo
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
      >
        ¡ImageBackground & Splash Screen!
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
