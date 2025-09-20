const personas = [
    { nombre: "Ana", edad: 22},
     { nombre: "Luis", edad: 35},
      { nombre: "María", edad: 28}
];

let buscar = personas.find (persona => persona.nombre == "Luis");
console.log(buscar);

personas.forEach(function(nombre, edad){
    console.log(this.value, nombre, edad);
},{ value: "ARREGLO: "});
 

const suma = personas.reduce((acumulador, persona) => acumulador + persona.edad, 0);
console.log(suma);
