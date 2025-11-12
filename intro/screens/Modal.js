import React, { useState } from 'react';
import { Modal, View, Text, Button, StyleSheet, } from 'react-native';

export default function App() {
  const [modalVisible, setModalVisible] = useState(false); 

  const abrirModal = () => {
    setModalVisible(true);
  };

  const cerrarModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ejemplo del componente Modal</Text>

      <Button title="Abrir Modal" onPress={abrirModal} /> 

      <Modal 
        animationType="fade"            
        transparent={true}               
        visible={modalVisible}           
        onRequestClose={cerrarModal}   
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hola soy el modal</Text>
            <Button title="Cerrar" onPress={cerrarModal} /> 
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#b29393ff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.93)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    fontSize:16,
}, 
});
