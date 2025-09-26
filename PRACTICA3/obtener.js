function simularPeticionAPI() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve("Datos recibidos correctamente");
        }, 5000);
    });
}

async function obtenerDatos() {
    console.log("Buscando API...");
    await simularPeticionAPI().then(res => console.log(res));
}

obtenerDatos();
