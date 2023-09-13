// Ejercicio 1: Promesas Encadenadas
// Crea una función que realice las siguientes tareas:
// Inicia una promesa que se resuelva después de 2 segundos con un número aleatorio entre 1 y 100.
// Luego, toma ese número y crea una segunda promesa que se resuelva después de 3 segundos con el resultado de elevar ese número al cuadrado.
// Finalmente, toma el resultado de la segunda promesa y crea una tercera promesa que se resuelva después de 1 segundo con la raíz cuadrada del número resultante.

new Promise(function (resolve, reject) {
  setTimeout(() => resolve(Math.floor(Math.random() * 100) + 1), 2000);
})
  .then(function (result) {
    console.log("Random", result);
    return new Promise(function (resolve, reject) {
      setTimeout(() => resolve(result * result), 3000);
    });
  })
  .then(function (result) {
    console.log("Al cuadrado", result);
    return new Promise(function (resolve, reject) {
      setTimeout(() => resolve(Math.sqrt(result)), 1000);
    });
  })
  .then(function (result) {
    console.log("Raiz", result);
    return result;
  })
  .catch(function (error) {
    console.error("Error:", error);
  });

//Ejercicio 2: Promesa de Múltiples Solicitudes
//   Crea una función que realice las siguientes tareas:
//   Recibe un array de URLs como argumento.
//   Utiliza fetch y promesas para realizar una solicitud GET a cada URL en el array.
//   Devuelve una promesa que se resuelva con un array de los resultados de todas las solicitudes.

function fetchMultiple(urls) {
  const fetchPromises = urls.map((url) =>
    fetch(url).then((response) => response.json())
  );
  return Promise.all(fetchPromises);
}

const urls = [
  "https://jsonplaceholder.typicode.com/users",
  "https://pokeapi.co/api/v2/pokemon/ditto",
];
fetchMultiple(urls)
  .then((result) => {
    console.log("Result:",result);
  })
  .catch((error) => {
    console.error("Error:",error);
  });


// Ejercicio 3: Promesas Paralelas
// Crea una función que realice las siguientes tareas:    
// Recibe un array de funciones que devuelven promesas como argumento.
// Ejecuta todas las funciones en paralelo y espera a que todas las promesas se resuelvan.
// Devuelve una promesa que se resuelva con un array de los resultados de todas las promesas.


function promesasParalelas(funciones) {
    return Promise.all(funciones.map(funcion => funcion()))
    .then(result => {
            return result;
    })
    .catch(error => {
            console.log(error);
    });
}

const promesa1 = () => new Promise(resolve => setTimeout(() => resolve(2), 1000));
const promesa2 = () => new Promise(resolve => setTimeout(() => resolve(2), 2000));
const promesa3 = () => new Promise(resolve => setTimeout(() => resolve(2), 1500));
const funciones = [promesa1, promesa2, promesa3];


promesasParalelas(funciones)
  .then(result => {
    console.log("Result:", result);
  })
  .catch(error => {
    console.error("Error:", error);
  });


// Ejercicio 4: Promesas en Cadena con Retraso
// Crea una función que realice las siguientes tareas:
// Recibe un número n como argumento.
// Utiliza un bucle para crear una cadena de promesas, donde cada promesa se resuelve después de N segundos con el número actual en el bucle.
// Cada promesa debe imprimir el número en la consola antes de resolverse.
// Finalmente, devuelve una promesa que se resuelva después de N segundos con el mensaje "Todas las promesas se resolvieron".


function cadenaRetraso(n) {
    const promises = [];
   
    for (let i = 0; i < n; i++) {
      const promise = new Promise((resolve) => {
        setTimeout(() => {
          console.log("i",i);
          resolve(i);
        }, i * 1000);
      });
      promises.push(promise);
    }
   
    return Promise.all(promises)
      .then(() => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve("Todas las promesas se resolvieron");
          }, n * 1000);
        });
      });
  }
 
  cadenaRetraso(3)
    .then((result) => {
      console.log("Result: ",result);
    })
    .catch((error) => {
      console.error("Error: ",error);
    });


// Ejercicio 5: Promesa con Cancelación
// Crea una función que realice las siguientes tareas:
// Inicia una promesa que se resuelva después de 5 segundos con un mensaje.
// Si se llama a una función cancel antes de que se cumplan los 5 segundos, la promesa debe rechazarse con el mensaje "Promesa cancelada".



let isCancelled=false;
const conCancelacion = ()=>{
    setTimeout(()=>{
        if(isCancelled){
            cancel().then(result=>console.log(result))
        }else{
            new Promise((resolve,reject)=>{
                resolve(console.log(`Promesa resuelta`));
            })
        }
    },5000);
}  
const cancel = ()=>{
    isCancelled = true;
    new Promise((resolve,reject)=>{
        reject(`Promesa cancelada`);
    })
}  

conCancelacion();
cancel();
