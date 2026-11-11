// A1. Conversiones de tipos.
// Cada expresión se guarda como texto y como función para poder mostrar
// la expresión, su resultado real y su typeof en una tabla de la consola.
const expresiones = [
  ['"5" + 3', () => "5" + 3],
  ['"5" * 3', () => "5" * 3],
  ['"5" - "2"', () => "5" - "2"],
  ['Number("")', () => Number("")],
  ['Number("12px")', () => Number("12px")],
  ['parseInt("12px")', () => parseInt("12px")],
  ['parseFloat("3.75€")', () => parseFloat("3.75€")],
  ['"10" == 10', () => "10" == 10],
  ['"10" === 10', () => "10" === 10],
  ["null + 1", () => null + 1],
  ["undefined + 1", () => undefined + 1],
  ["typeof NaN", () => typeof NaN],
  ['Boolean("0")', () => Boolean("0")],
  ['0 || "valor por defecto"', () => 0 || "valor por defecto"],
  ['0 ?? "valor por defecto"', () => 0 ?? "valor por defecto"]
];

const filas = expresiones.map(([texto, calcular]) => {
  const resultado = calcular();
  return { Expresión: texto, Resultado: String(resultado), typeof: typeof resultado };
});
console.table(filas);

// Comprobación correcta de NaN
console.log("NaN === NaN:", NaN === NaN);
console.log("Number.isNaN(NaN):", Number.isNaN(NaN));
console.log("Number.isNaN(Number('12px')):", Number.isNaN(Number("12px")));
console.log("Object.is(NaN, NaN):", Object.is(NaN, NaN));
