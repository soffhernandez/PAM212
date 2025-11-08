
import { Button, ImageBackground, ScrollView, StyleSheet, Text, View} from 'react-native-web';

const DATA = [
 {id:1},
 {id:2},
 {id:3},

]; 

const SimpleHeader = () => {
  return (
    <View style ={styles.header}>
      <Text style={styles.title}>EL RINCÓN DEL CHISME</Text>
    </View>
  );
};

const SimpleScrollView2 = () => {
  return (
    <View>
      <SimpleHeader/>
   
      <ScrollView 
      showVerticalScrollIndicator={false}>
        {DATA.map(val => {
          return (
            <View style={styles.card} key = {val.id}>
                 <Text style={styles.subtitle}> Nombre: El medio ambiente</Text>
             <Text style={styles.subtitle}> zi</Text>
              <Button title="Presionar" onPress={() => alert("Leer más")} />
            </View>
          );
        })}

            {DATA.map(val => {
          return (
            <View style={styles.card} key = {val.id}>
                 <Text style={styles.subtitle}> Nombre: El medio ambiente</Text>
             <Text style={styles.subtitle}> zi</Text>
              <Button title="Presionar" onPress={() => alert("Leer más")} />
            </View>
          );
        })}


            {DATA.map(val => {
          return (
            <View style={styles.card} key = {val.id}>
                 <Text style={styles.subtitle}> Nombre: Mejores lugares de comida</Text>
             <Text style={styles.subtitle}> zi</Text>
              <Button title="Presionar" onPress={() => alert("Leer más")} />
            </View>
          );
        })}
    </ScrollView>
  </View>
  );
};


const styles = StyleSheet.create({
  header: {
    height: 120,
    backgroundColor: '#000000ff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 0,
  },
  title: {
    color: '#fff',
    fontWeigt: 'bold',
    fontSize: 20,
  },
  card: {
    height: 100,
    length:100,
    backgroundColor: '#E6DDC4',
    marginTop: 10, 
    //justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  subtitle: {
    color: '#181D31',
    fontWeight: 'bold',
  },
});