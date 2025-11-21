import { View, Text, StyleSheet, Pressable } from 'react-native';

export default function Detalles({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.iconRow}>
        <Text style={styles.title}>Bienvenido a detalles de usuario</Text>
               <Pressable  style={[styles.button, styles.buttonProfile]} onPress={()=> navigation.navigate('Home')}>
                        <Text style = {styles.buttonText}>Regresar al inicio</Text>
                        </Pressable>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#fff'
  },
  iconRow:{
    alignItems:'center'
  },
  title:{
    fontSize:20,
    marginBottom:20,
    fontWeight:'bold',
  },
  button:{
    backgroundColor:'#1bb73dff',
  },
});
