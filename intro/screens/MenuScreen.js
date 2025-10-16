import React, { useState } from 'react';
import { Text, StyleSheet, View, Button } from 'react-native';
import ContadorScreen from './ContadorScreen';
import BotonesScreen from './BotonesScreen';
import ImagenesScreen from './ImagenesScreen';


export default function MenuScreen() {
  const [screen, setScreen] = useState('menu');

switch (screen) {
    case 'contador':
      return <ContadorScreen />;

    case 'botones':
      return <BotonesScreen />;

    case 'imagen':
      return <ImagenesScreen />;

    case 'textinputalert':
      return <TextInputAlertScreen />;

    case 'scrollview':
      return <ScrollViewScreen />;

    case 'activity':
      return <ActivityIndicatorScreen />;

    case 'flatlist':
      return <FlatListSectionListScreen />;

    case 'modal':
      return <ModalScreen />;

    case 'bottomsheet':
      return <BottomSheetScreen />;

    case 'menu':
    default:
      return (
        <View style={styles.container}>
          <Text style={styles.texto2}>Menú de prácticas</Text>

          <View style={styles.contenedorBotones}>
            <Button onPress={() => setScreen('contador')} title="Pract: Contador" />
            <Button onPress={() => setScreen('botones')} title="Prac: Botones" />
            <Button onPress={() => setScreen('imagen')} title="Prac: ImageBackground y SplashScreen" />
            <Button onPress={() => setScreen('imagen')} title="Prac: Text Input y Alert" />
            <Button onPress={() => setScreen('contador')} title="Prac: Scrollview" />
            <Button onPress={() => setScreen('botones')} title="Prac: Activity Indicator" />
            <Button onPress={() => setScreen('contador')} title="Prac: FlatList y Section List" />
            <Button onPress={() => setScreen('botones')} title="Prac: Modal" />
            <Button onPress={() => setScreen('botones')} title="Prac: BottomSheet" />
          </View>
        </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(17, 5, 5, 1)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  texto: {
    color: 'rgba(172, 172, 172, 1)',
    fontSize: 30,
    fontFamily: 'Times New Roman',
    fontWeight: '900',
    fontStyle: 'italic',
    textDecorationLine: 'line-through',
  },
  texto2: {
    color: 'rgba(209, 245, 6, 1)',
    fontSize: 40,
    fontFamily: 'Courier',
    fontWeight: '400',
    fontStyle: 'italic',
    textDecorationLine: 'underline',
    marginBottom: 20,
  },
  contenedorBotones: {
    marginTop: 15,
    gap: 10,
    width: '100%',
  },
});
