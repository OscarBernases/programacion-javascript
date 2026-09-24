const nombre = prompt("Introduce tu nombre:");
const apellido1 = prompt("Introduce tu primer apellido:");
const apellido2 = prompt("Introduce tu segundo apellido:");
const sal = prompt("Introduce tu salario:");
const edad = prompt("Introduce tu edad:");

let salario = parseFloat(sal);
let salarioFinal = 0;

if (salario > 2000) {
    salarioFinal = salario;
} else if (salario >= 1000) {
    if (edad > 45) {
        salarioFinal = salario * 1.03;
    } else {
        salarioFinal = salario * 1.10;
    }
} else {
    if (edad < 30) {
        salarioFinal = 1100;
    } else if (edad <= 45) {
        salarioFinal = salario * 1.03;
    } else {
        salarioFinal = salario * 1.15;
    }
}

document.getElementById("nombre").textContent = `Nombre: ${nombre}`;
document.getElementById("apellido1").textContent = `Primer apellido: ${apellido1}`;
document.getElementById("apellido2").textContent = `Segundo apellido: ${apellido2}`;
document.getElementById("edad").textContent = `Edad: ${edad}`;
document.getElementById("salario").textContent = `Salario: ${salarioFinal}€`;