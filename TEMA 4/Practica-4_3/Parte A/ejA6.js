// A6. Depuración.
// Versión original (con errores), conservada para practicar con el depurador:
function mediaAprobadosConErrores(notas) {
  let suma = 0;
  let contador = 0;
  for (let i = 0; i <= notas.length; i++) {      // error 1: <= recorre una posición de más
    if (notas[i] > 5) {                            // error 2: debería ser >= 5
      suma += notas[i];                            // error 3: "7" es texto, suma pasa a ser texto
      contador++;
    }
  }
  return suma / notas.length;                      // error 4: debería dividir entre contador
}

// Versión corregida.
// Calcula la media de las notas aprobadas (5 o más).
// Recibe: un array de notas (números o textos numéricos).
// Devuelve: la media, o null si no hay ninguna nota aprobada.
function mediaAprobados(notas) {
  let suma = 0;
  let contador = 0;
  for (let i = 0; i < notas.length; i++) {
    const nota = Number(notas[i]);
    if (nota >= 5) {
      suma += nota;
      contador++;
    }
  }
  return contador === 0 ? null : suma / contador;
}

console.log("Original con errores:", mediaAprobadosConErrores(["7", 4, 5, 9.5, 3]));
console.log("Corregida:", mediaAprobados(["7", 4, 5, 9.5, 3])); // Esperado: 7.17 aprox.
console.log("Sin aprobados:", mediaAprobados([1, 2, 4.9]));      // Esperado: null
