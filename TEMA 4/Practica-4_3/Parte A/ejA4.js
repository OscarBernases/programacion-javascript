// A4. Set y Map: lista de inscripciones.
const inscripciones = [
  "ana@ies.es", "luis@ies.es", "ANA@ies.es", "marta@ies.es",
  "luis@ies.es", "pablo@ies.es", "Marta@ies.es"
];

// 1. Set sin normalizar: "ana@ies.es" y "ANA@ies.es" son cadenas distintas.
const sinNormalizar = new Set(inscripciones);
console.log("1. Sin normalizar:", sinNormalizar.size, [...sinNormalizar]);

// 2. Set normalizando a minúsculas.
const normalizados = inscripciones.map((correo) => correo.toLowerCase());
const correosUnicos = new Set(normalizados);
console.log("2. Normalizados:", correosUnicos.size, [...correosUnicos]);

// 3. Map con el número de apariciones de cada correo normalizado.
const apariciones = new Map();
for (const correo of normalizados) {
  apariciones.set(correo, (apariciones.get(correo) ?? 0) + 1);
}
for (const [correo, veces] of apariciones) {
  console.log(`${correo} → ${veces}`);
}

// 4. Set convertido en array ordenado alfabéticamente.
const ordenados = [...correosUnicos].sort((a, b) => a.localeCompare(b));
console.log("4. Ordenados:", ordenados);
