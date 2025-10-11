//Import:Zona de declaraciones
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import React, {useState} from 'react';

//MAIN: Zona de componentes
export default function App() {
  const[contador,setContador]= useState(0);
  return (
    
    <View style={styles.container}>
      
      <Text style={styles.texto}>Contador:</Text>
      <Text style={styles.texto2}> {contador} </Text>
      <View style={styles.contenedorBotones}>
      <Button title='Incrementar'onPress={()=>setContador(contador+1)}/>
        <Button title='Quitar' onPress={()=>setContador(contador-1)}/>
          <Button title='Reiniciar' onPress={()=>setContador(contador-contador)}/>
      </View>
      <StatusBar style="auto"/>
    </View>

  );
}
//Estilos: Zona de estetica y posicionamineto
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(17, 5, 5, 1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  texto:{
    color:'rgba(172, 172, 172, 1)',
    fontSize:30,
    fontFamily:'Times New Roman',
    fontWeight:'900',
    fontStyle:'italic',
    textDecorationLine:'line-through',
  },
  texto2:{
    color:'rgba(209, 245, 6, 1)',
    fontSize:40,
    fontFamily:'Courier',
    fontWeight:'400',
    fontStyle:'italic',
    textDecorationLine:'underline',
  },
  contenedorBotones:{
    marginTop:15,
    flexDirection:'row-reverse',
gap:20
},
});
