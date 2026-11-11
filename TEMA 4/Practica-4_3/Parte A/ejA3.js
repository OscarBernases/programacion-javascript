// A3. Decisiones y bucles: boletín de notas.
const notas = [7.5, 4.9, 10, 5, 6.25, 3, 8.8, 11, 9];

// 1. Bucle for clásico: posición y calificación.
for (let i = 0; i < notas.length; i++) {
  const nota = notas[i];
  let texto;
  if (nota < 0 || nota > 10) {
    texto = "Nota no válida";
  } else if (nota < 5) {
    texto = "Insuficiente";
  } else if (nota < 6) {
    texto = "Suficiente";
  } else if (nota < 7) {
    texto = "Bien";
  } else if (nota < 9) {
    texto = "Notable";
  } else {
    texto = "Sobresaliente";
  }
  console.log(`Alumno ${i + 1}: ${nota} → ${texto}.`);
}

// 2. Bucle for...of: aprobados, media y nota más alta (sin Math.max ni métodos de arrays).
let aprobados = 0;
let suma = 0;
let validas = 0;
let masAlta = null;

for (const nota of notas) {
  if (nota < 0 || nota > 10) {
    continue; // nota no válida: no cuenta en los cálculos
  }
  validas++;
  suma += nota;
  if (nota >= 5) {
    aprobados++;
  }
  if (masAlta === null || nota > masAlta) {
    masAlta = nota;
  }
}

console.log("Aprobados:", aprobados);
console.log("Media de las notas válidas:", validas > 0 ? (suma / validas).toFixed(2) : "sin notas válidas");
console.log("Nota más alta:", masAlta);
