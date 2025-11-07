// Importamos React y el hook useState para manejar estados
import React, { useState } from 'react';

// Importamos componentes desde react-native-web
import { View, Text, Button, ActivityIndicator, StyleSheet } from 'react-native-web';

// Componente principal de la pantalla
export default function ActivityIndicatorScreen() {

    // Hook useState: almacenará si está cargando o no (true/false)
    const [cargando, setCargando] = useState(false);

    // Función que activa la carga por 3 segundos
    const iniciarCarga = () => {
        setCargando(true);              // Muestra el ActivityIndicator
        setTimeout(() => setCargando(false), 3000);  // Después de 3 segundos lo oculta
    };

    // Función para detener la carga inmediatamente
    const detenerCarga = () => { 
        setCargando(false);
    };

    // Lo que se va a renderizar en pantalla
    return (
        <View style={styles.container}>
            
            {/* Título de la pantalla */}
            <Text style={styles.texto}>Práctica: Activity Indicator</Text>

            {/* Botón verde para iniciar la carga */}
            <View style={styles.boton}>
                <Button 
                    color='green'
                    title={cargando ? 'Cargando...' : 'Iniciar carga'} // Cambia el texto según el estado
                    onPress={iniciarCarga}
                />
            </View>

            {/* Botón rojo para detener la carga */}
            <View style={styles.boton}>
                <Button 
                    color='red'
                    title="Detener carga"
                    onPress={detenerCarga}
                />
            </View>

            {/* Sección donde aparece el ActivityIndicator */}
            <View style={styles.carga}>

                <ActivityIndicator
                    size="large"          // Tamaño del spinner
                    color="#000000ff"     // Color del spinner
                    animating={cargando}  // Solo se muestra cuando cargando = true
                    hidesWhenStopped={true} // Se oculta automáticamente cuando deja de cargar
                />

                {/* Texto dinámico debajo del ActivityIndicator */}
                <Text style={styles.textoCarga}>
                    {cargando ? 'Cargando datos...' : 'Presiona el botón verde :)'}
                </Text>

            </View>

        </View>
    );
}


// Estilos de la pantalla
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    texto: {
        color: "#000000ff",
        fontSize: 30,
        fontFamily: 'Times New Roman',
        fontWeight: 'bold',
        marginBottom: 20,
    },
    boton: {
        width: 220,
        marginBottom: 16,
    },
    carga: {
        alignItems: 'center',
        marginTop: 20,
    },
    textoCarga: {
        marginTop: 12,
        fontSize: 16,
        color: '#000000',
    },
});
