// Importamos React y los componentes necesarios de React Native
import React, { useState } from 'react';
import { View, Text, TextInput, Alert, Button, StyleSheet } from 'react-native';

// Componente principal
export default function TextScreen() {

  // ✅ Estados (valores que cambian en tiempo real cuando el usuario escribe)
  const [nombre, setNombre] = useState('');         // Guarda el nombre ingresado
  const [contraseña, setContraseña] = useState(''); // Guarda la contraseña ingresada
  const [comentario, setComentario] = useState(''); // Guarda el comentario
  const [mensaje, setMensaje] = useState('');       // Mensaje dinámico para mostrar resultado

  // ✅ Función que se ejecuta cuando el usuario presiona el botón
  const enviarDatos = () => {

    // Validación para evitar que envíen campos vacíos
    if (nombre.trim() === '' || contraseña.trim() === '' || comentario.trim() === '') {

      // Ventanas emergentes mostrando error (Alert = React Native, alert = navegador)
      Alert.alert('Error', 'Por favor completa todos los campos');
      alert('Error: Por favor completa todos los campos');

      // Cambia el mensaje dinámico
      setMensaje('Faltan campos por llenar');
    } else {

      // Mensaje de éxito
      Alert.alert('¡Éxito!', 'Datos enviados correctamente');
      alert('¡Éxito! Datos enviados correctamente');

      // Cambia el mensaje dinámico
      setMensaje('Datos enviados correctamente');
    }
  };

  return (
    // Vista principal que envuelve todo el contenido
    <View style={styles.container}>

      {/* Título de la pantalla */}
      <Text style={styles.title}>Formulario de ejemplo</Text>

      {/* ✅ Input para el nombre del usuario */}
      <TextInput
        style={styles.input}
        placeholder="Escribe tu nombre"
        value={nombre}          // El valor actual que se muestra en el TextInput
        onChangeText={setNombre} // Función que cambia el estado cuando el usuario escribe
        keyboardType='numeric'   // Opcional: fuerza teclado numérico (aunque nombre no es numérico)
      />

      {/* ✅ Input para contraseña */}
      <TextInput
        style={styles.input}
        placeholder="Escribe tu contraseña"
        value={contraseña}
        onChangeText={setContraseña}
        secureTextEntry={true}   // Oculta los caracteres (****)
      />

      {/* ✅ Input para comentario con varias líneas */}
      <TextInput
        style={[styles.input, { height: 100, textAlignVertical: 'top' }]} 
        placeholder="Escribe un comentario"
        value={comentario}
        onChangeText={setComentario}
        multiline={true}       // Permite salto de línea
        numberOfLines={4}      // Altura del área de texto
      />

      {/* ✅ Botón que ejecuta la función enviarDatos() */}
      <Button title="Enviar" onPress={enviarDatos} />

      {/* ✅ Contenedor donde aparece el mensaje dinámico */}
      <Text style={styles.mensaje}>{mensaje}</Text>
    </View>
  );
}

// ✅ Estilos de la interfaz
const styles = StyleSheet.create({
  container:{
    flex:1,                      // Ocupa toda la pantalla
    justifyContent:'center',     // Centra verticalmente
    alignItems:'center',         // Centra horizontalmente
    padding:20,
    gap:10                       // Espaciado entre elementos
  },
  title:{
    fontSize:25,
    fontWeight:'bold'
  },
  input:{
    width:'80%',
    borderWidth:3,
    borderColor:'#a47bf7ff',     // Color morado del borde
    padding:12,
    borderRadius:9
  },
  mensaje:{
    marginTop:20,
    fontSize:18,
    color:'#e431f1ff',           // Color del texto del mensaje
    textAlign:'center'
  }
});
