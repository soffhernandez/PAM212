import {View,Text,StyleSheet, Button} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Pressable} from 'react-native';


export default function Profile({navigation}){
    return(
        <View style={styles.container}>
            <View style={styles.iconRow}>
                <Ionicons name="person-outline" size={28} color="green"/>
                <Text style={styles.title}>Perfil de usuario</Text>
               <Pressable  style={[styles.button, styles.buttonProfile]} onPress={()=> navigation.navigate('Detalles')}>
                        <Text style = {styles.buttonText}>Ir a Detalles de usuario</Text>
                        </Pressable>
            </View>
        </View>
        
        
    );
}


const styles = StyleSheet.create({
container:{
    flex:1,
    backgroundColor:'#fff',
    justifyContent:'center',
    alignItems:'center',
    padding:20,
},
iconRow:{
    flexDirection:'column', 
    alignItems:'center',
},
title:{
    fontSize:22,
    fontWeight:'bold',
    marginLeft:10,
    color:'green',
},
button:{
      backgroundColor:'#1bb73dff',
    padding:20,
}
});