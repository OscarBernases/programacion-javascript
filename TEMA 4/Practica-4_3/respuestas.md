# Tarea 1 · Biblioteca del IES — Respuestas

## Parte A

### A1. Conversiones de tipos

| Expresión | Mi predicción | Resultado real | Tipo (typeof) | Explicación (una línea) |
|---|---|---|---|---|
| `"5" + 3` | `"53"` | `"53"` | string | Con `+`, si un operando es texto, el otro se convierte a texto y se concatena. |
| `"5" * 3` | `15` | `15` | number | `*` solo opera con números, así que convierte `"5"` a 5. |
| `"5" - "2"` | `3` | `3` | number | `-` convierte ambos textos a número. |
| `Number("")` | `0` | `0` | number | El texto vacío se convierte en 0. |
| `Number("12px")` | `NaN` | `NaN` | number | `Number` exige que todo el texto sea numérico. |
| `parseInt("12px")` | `12` | `12` | number | `parseInt` lee los dígitos iniciales y se detiene en la primera letra. |
| `parseFloat("3.75€")` | `3.75` | `3.75` | number | `parseFloat` lee el número decimal inicial e ignora el resto. |
| `"10" == 10` | `true` | `true` | boolean | `==` convierte los tipos antes de comparar. |
| `"10" === 10` | `false` | `false` | boolean | `===` compara sin convertir: string y number son tipos distintos. |
| `null + 1` | `1` | `1` | number | `null` se convierte en 0 en operaciones numéricas. |
| `undefined + 1` | `NaN` | `NaN` | number | `undefined` se convierte en `NaN`. |
| `typeof NaN` | `"number"` | `"number"` | string | `NaN` es un valor del tipo number ("no es un número válido"); `typeof` devuelve un texto. |
| `Boolean("0")` | `true` | `true` | boolean | Todo texto no vacío es verdadero, aunque sea `"0"`. |
| `0 \|\| "valor por defecto"` | `"valor por defecto"` | `"valor por defecto"` | string | `\|\|` descarta cualquier valor falsy, y 0 lo es. |
| `0 ?? "valor por defecto"` | `0` | `0` | number | `??` solo descarta `null` y `undefined`, no 0. |

**¿Por qué `NaN === NaN` devuelve `false`? ¿Cómo se comprueba correctamente si un valor es NaN?**
Según el estándar, `NaN` no es igual a ningún valor, ni siquiera a sí mismo, porque representa el resultado de una operación numérica que no tiene un valor válido (dos operaciones fallidas distintas no tienen por qué dar "lo mismo"). Para comprobarlo se usa `Number.isNaN(valor)` (recomendado, no convierte el valor antes) o `Object.is(valor, NaN)`. La función global `isNaN()` convierte antes el valor a número y puede dar resultados engañosos (`isNaN("abc")` es `true`).

### A2. Ámbito de las variables

1. `Dentro: 55` (20 × 3 + 5 = 65; como supera 50, se resta el descuento de 10), `Fuera: 0`, y la última línea `console.log(descuento)` lanza un error (`ReferenceError`). Al ejecutarlo coincide con lo analizado.
2. Son dos variables distintas: `let total` dentro de la función crea una variable local que *oculta* (sombrea) la global. La función modifica la local y la global sigue valiendo 0.
3. `ReferenceError: descuento is not defined`. `descuento` se declara con `const` dentro del bloque `if`, así que solo existe en ese bloque (ámbito de bloque) y no es visible fuera.
4. Si se escribe `total = …` sin `let`, la función ya no crea una variable local, sino que usa y modifica la global `total`. Entonces se mostraría `Dentro: 55` y también `Fuera: 55`.
5. `TypeError: Assignment to constant variable.` Una variable declarada con `const` no se puede reasignar.

### A3. Decisiones y bucles: boletín de notas

Resultado con las 9 notas: 6 aprobados, media de las notas válidas 6,81 (la nota 11 se excluye) y nota más alta 10. Código en `ejA3.js`.

### A4. Set y Map: lista de inscripciones

1. Salen **6** correos. No son 4 porque un `Set` compara las cadenas tal cual: `"ana@ies.es"` y `"ANA@ies.es"` son textos distintos (igual con `marta` y `Marta`).
2. Tras normalizar con `toLowerCase()` salen **4**.
3. `ana@ies.es → 2`, `luis@ies.es → 2`, `marta@ies.es → 2`, `pablo@ies.es → 1`.
4. `["ana@ies.es", "luis@ies.es", "marta@ies.es", "pablo@ies.es"]`.

### A5. Funciones y callbacks

- Apartado 3: duplicar `[3, 8, 1, 6]` da `[6, 16, 2, 12]`, y todos son pares (el doble de un entero siempre lo es).
- Apartado 4: el resultado con `map` y `filter` es el mismo.
- **Qué tienen en común mis funciones y los métodos de los arrays:** ambas reciben una función como argumento (callback) y la aplican a cada elemento, de modo que quien programa solo decide *qué* hacer con cada elemento y no *cómo* recorrer el array. Ambas devuelven un array nuevo y no modifican el original.
- Apartado 5: total con IVA de los productos de más de 10 € = **225,06 €**.

### A6. Depuración

| Línea | Error | Cómo lo detectaste | Corrección |
|---|---|---|---|
| 4 (`for`) | `i <= notas.length` recorre una posición de más (`notas[5]` es `undefined`). | Con el punto de interrupción, `i` llegaba a 5 y `notas[i]` valía `undefined`. | `i < notas.length` |
| 5 (`if`) | `> 5` excluye el 5, que sí es aprobado. | Al pasar con `notas[i]` = 5 el `if` no entraba y `contador` no aumentaba. | `>= 5` |
| 6 (`suma +=`) | `"7"` es un texto: `0 + "7"` da `"07"` y a partir de ahí `suma` es un string que concatena. | Al vigilar `typeof suma` cambiaba de `number` a `string`. | Convertir antes con `Number(notas[i])` |
| 10 (`return`) | Divide entre `notas.length` (todas las notas) en lugar de entre `contador` (las aprobadas). | Al comparar `contador` (3) con `notas.length` (5) al final. | `suma / contador` |
| 10 (`return`) | Si no hay aprobados, `contador` es 0 y se divide entre 0. | Razonamiento sobre el caso límite. | `contador === 0 ? null : suma / contador` |

Resultado de la versión original con la llamada del enunciado: `15.9` (en vez de 7,17). La versión corregida devuelve `7.1666…` y `null` si no hay aprobados. Código en `ejA6.js`.

La captura del depurador está en `capturas/A6-depurador.png`.

---

## Parte B — Investigación previa: carga de scripts

**1. `defer` y `async` (MDN, elemento `<script>`).**
Ambos atributos hacen que el navegador descargue el script en paralelo sin bloquear la lectura del HTML. Con `defer`, el script se ejecuta cuando el documento ya está analizado por completo y, si hay varios, siempre en el orden en que aparecen en el HTML. Con `async`, el script se ejecuta en cuanto termina de descargarse, sea cual sea el momento (incluso interrumpiendo la lectura del HTML) y sin ningún orden garantizado entre varios scripts.

**2. Quitar `defer` de los dos `<script>`.**
Error que aparece en la consola (Chrome): `Uncaught TypeError: Cannot set properties of null (setting 'innerHTML')`. Sin `defer`, los scripts se ejecutan al encontrarlos en el `<head>`, antes de que el navegador haya creado los elementos del `<body>`. Al ejecutarse `app.js`, `document.querySelector("#resumen")` devuelve `null` y `mostrar` intenta asignar `innerHTML` a `null`. *(El texto exacto depende del navegador; confírmalo en el tuyo.)*

**3. Con `defer`, pero `app.js` antes que `datos.js`.**
Error: `Uncaught ReferenceError: LIBROS is not defined`. Con `defer` los scripts se ejecutan en orden de aparición, así que `app.js` se ejecuta primero y usa `LIBROS` cuando `datos.js` todavía no la ha declarado.

**4. ¿Por qué `defer` es más adecuado que `async` aquí?**
Porque `app.js` depende de `datos.js` (necesita `LIBROS`) y además necesita que el HTML esté ya cargado para poder escribir en los `div`. `defer` garantiza las dos cosas: orden de ejecución y documento listo. Con `async`, el orden no está garantizado (según qué archivo termine antes de descargarse, el programa fallaría unas veces sí y otras no) y el script podría ejecutarse antes de que existan los elementos de la página.

`index.html` ha quedado como estaba (con `defer` y el orden original), más `pruebas.js` después de `app.js`.
