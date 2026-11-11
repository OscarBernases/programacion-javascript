// A2. Ámbito de las variables.
const gastosEnvio = 5;
let total = 0;

function calcularTotal(precio, unidades) {
  let total = precio * unidades + gastosEnvio;
  if (total > 50) {
    const descuento = 10;
    total = total - descuento;
  }
  console.log("Dentro:", total);
  return total;
}

calcularTotal(20, 3);
console.log("Fuera:", total);

// La variable descuento solo existe dentro del bloque if (const tiene ámbito de
// bloque). Para comprobar el error sin detener el resto de ejercicios, se captura:
try {
  console.log(descuento);
} catch (error) {
  console.log("Error esperado:", error.name, "-", error.message);
}

// Apartado 5: asignar a una constante lanza TypeError.
try {
  gastosEnvio = 7;
} catch (error) {
  console.log("Error esperado:", error.name, "-", error.message);
}
