// A5. Funciones y callbacks.

// 1. Devuelve un array nuevo aplicando fn a cada elemento (con bucle, sin map).
// Recibe: un array y una función. Devuelve: el array transformado.
function transformar(array, fn) {
  const resultado = [];
  for (const elemento of array) {
    resultado.push(fn(elemento));
  }
  return resultado;
}

// 2. Devuelve un array nuevo con los elementos que cumplen la condición (con bucle, sin filter).
// Recibe: un array y una función que devuelve true/false. Devuelve: el array filtrado.
function quedarse(array, condicion) {
  const resultado = [];
  for (const elemento of array) {
    if (condicion(elemento)) {
      resultado.push(elemento);
    }
  }
  return resultado;
}

// 3. Con funciones flecha: duplicar [3, 8, 1, 6] y quedarse con los pares.
const numeros = [3, 8, 1, 6];
const duplicados = transformar(numeros, (n) => n * 2);
console.log("3. Duplicados:", duplicados);
console.log("3. Pares:", quedarse(duplicados, (n) => n % 2 === 0));

// 4. Lo mismo con map y filter.
const conMetodos = numeros.map((n) => n * 2).filter((n) => n % 2 === 0);
console.log("4. Con map y filter:", conMetodos);

// 5. Total con IVA (21 %) de los productos de más de 10 €, redondeado a 2 decimales.
const precios = [12, 45, 8, 99, 30];
const totalConIva = precios
  .filter((precio) => precio > 10)
  .map((precio) => precio * 1.21)
  .reduce((acumulado, precio) => acumulado + precio, 0);
console.log("5. Total con IVA:", Math.round(totalConIva * 100) / 100);
