// Import: Zona de declaraciones
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , Button} from 'react-native';
import React,{useState} from 'react';


// Zona del main: Se ponen componentes
export default function App() {

  const[contador,setContador]=useState(0);
  return (

    <View style={styles.container}>

      <Text>Contador: {contador} </Text>
     
      <Button title = "incrementar " onPress={()=>setContador(contador +1)}/>
      
      <StatusBar style="auto" />
      <Button title = "quitar" onPress={()=>setContador(contador -1)}/>
      <Button title = "reiniciar " onPress={()=>setContador(contador -contador)}/>
      


    </View>
  );
}




// Zona de estilos: Zona donde se da la estética a los componentes y su funcionamiento
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
