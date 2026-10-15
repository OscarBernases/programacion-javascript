let jugarDeNuevo = true;

while (jugarDeNuevo) {
    const numeroAleatorio = Math.floor(Math.random() * 100) + 1;
    let acertada = false;
    let cancelada = false;
    let intentos = 0;

    do {
        const respuesta = prompt("Introduce un número del 1 al 100:");

        if (respuesta === null) { // El usuario pulsa "Cancelar"
            cancelada = true;
            jugarDeNuevo = false;
            alert("Juego terminado.");
        }

        const texto = respuesta.trim();
        const respuestaNumero = Number(texto);

        if (texto === "" || !Number.isInteger(respuestaNumero)) {
            alert("Tienes que introducir un número entero.");
        } else if (respuestaNumero === numeroAleatorio) {
            acertada = true;
            alert(`Has acertado en ${intentos} intentos.`);
        } else if (respuestaNumero > numeroAleatorio) {
            alert("El número es menor.");
        } else {
            alert("El número es mayor.");
        }

        intentos++;

    } while (!acertada && !cancelada);

    if (acertada) {
        jugarDeNuevo = confirm("¿Quieres volver a jugar?");
    }
}