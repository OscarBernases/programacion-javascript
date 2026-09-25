const numeroAleatorio = Math.floor(Math.random() * 100) + 1;
let acertada = false;
let intentos = 0;
let salir = false;

do {
    const respuesta = prompt("Introduce un número del 1 al 100:");

    if (respuesta === null) { // El usuario pulsó "Cancelar"

        const seguir = confirm("¿Quieres seguir jugando?");

        if (seguir === false) {
            salir = true;
            alert("Terminado exitosamente.");
        }
        // si seguir === true, no hacemos nada más y el bucle vuelve a preguntar

    } else {

        const respuestaNumero = parseInt(respuesta);
        intentos++;

        if (!Number.isInteger(respuestaNumero)) {
            alert("Tienes que introducir un número.");
            intentos--;
        } else if (respuestaNumero === numeroAleatorio) {
            acertada = true;
            alert(`Has acertado en ${intentos} intentos.`);
        } else if (respuestaNumero > numeroAleatorio) {
            alert("El número es menor.");
        } else {
            alert("El número es mayor.");
        }
    }

} while (!acertada && !salir);