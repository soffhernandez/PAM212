import React, { useState } from 'react';
import { Text, StyleSheet, View, Button } from 'react-native';
import ContadorScreen from './ContadorScreen';
import BotonesScreen from './Botones/BotonesScreen';
import ImagenesScreen from './ImagenesScreen';
import TextScreen from './TextScreen' ;
import Activity from './Activity';
import Flatlist from './Flatlist';
import Modal from './Modal';
import BottomsScreent from './BottomsScreent';
import SimpleScrollView from './Scrollview'
import SimpleScrollView2 from './scrollVertical'
import Repaso from './Repaso';

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
      return <TextScreen />;

    case 'scrollview':
      return <SimpleScrollView/>;

     case 'scrollVertical':
      return <SimpleScrollView2 />;

    case 'activity':
      return <Activity />;

    case 'flatlist':
      return <Flatlist />;

    case 'modal':
      return <Modal />;

    case 'bottomsheet':
      return <BottomsScreent />;

      case 'repaso':
  return <Repaso/>;

    case 'menu':
    default:
      return (
        <View style={styles.container}>
          <Text style={styles.texto2}>Menú de prácticas</Text>

          <View style={styles.contenedorBotones}>
            <Button color={'blue'} onPress={() => setScreen('contador')} title="Pract: Contador" />
            <Button onPress={() => setScreen('botones')} title="Prac: Botones" />
            <Button onPress={() => setScreen('imagen')} title="Prac: ImageBackground y SplashScreen" />
            <Button onPress={() => setScreen('textinputalert')} title="Prac: Text Input y Alert" />
            <Button onPress={() => setScreen('scrollview')} title="Prac: Scrollview Horizontal" />
            <Button onPress={() => setScreen('scrollVertical')} title="Prac: Scrollview Vertical" />
            <Button onPress={() => setScreen('activity')} title="Prac: Activity Indicator" />
            <Button onPress={() => setScreen('flatlist')} title="Prac: FlatList y Section List" />
            <Button onPress={() => setScreen('modal')} title="Prac: Modal" />
            <Button onPress={() => setScreen('bottomsheet')} title="Prac: BottomSheet" />
            <Button onPress={() => setScreen('repaso')} title="Prac: Actividad de repaso" />

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
