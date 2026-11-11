// ---------------------------------------------------------------------------
// FUNCIÓN DE APOYO (ya hecha, no la modifiques)
// Inserta un texto HTML dentro del elemento indicado por su selector CSS.
// Cómo funciona por dentro se estudiará en las unidades de objetos predefinidos
// y DOM. Por ahora, úsala como una "caja negra":
//   mostrar("#catalogo", "<p>Hola</p>");
// ---------------------------------------------------------------------------

function mostrar(selector, html) {
  document.querySelector(selector).innerHTML = html;
}

// ---------------------------------------------------------------------------
// R1 a R7: funciones de cálculo (no deben usar mostrar ni console.log)
// ---------------------------------------------------------------------------

// R1
// Calcula la valoración media de un libro.
// Recibe: un objeto libro. Devuelve: la media con un decimal, o null si el
// libro no tiene valoraciones.

function valoracionMedia(libro) {
  // Comprobacion si hay valoraciones.
  if (libro.valoraciones.length === 0) {
    return null;
  }

  // Calcula la media y redondea a un decimal.
  const suma = libro.valoraciones.reduce((acumulado, valor) => acumulado + valor, 0);
  return Math.round((suma / libro.valoraciones.length) * 10) / 10;
}

// R2
// Selecciona los libros que no están prestados.
// Recibe: un array de libros. Devuelve: un array nuevo con los disponibles.

function librosDisponibles(libros) {
  return libros.filter((libro) => !libro.prestado);
}

// R3
// Selecciona los libros publicados entre dos años, ambos incluidos.
// Recibe: un array de libros y los años desde y hasta (número o texto).
// Devuelve: un array con los libros del rango; vacío si algún año no es válido
// o si desde es mayor que hasta.

function librosEntre(libros, desde, hasta) {

  // Comprobar que los años son números válidos y convertirlos a Number.
  const añoDesde = desde === null || String(desde).trim() === "" ? NaN : Number(desde);
  const añoHasta = hasta === null || String(hasta).trim() === "" ? NaN : Number(hasta);

  // Verificar que ambos años son finitos y que desde no es mayor que hasta.
  const sonValidos = Number.isFinite(añoDesde) && Number.isFinite(añoHasta);
  if (!sonValidos || añoDesde > añoHasta) {
    return [];
  }

  // Devolver los libros cuyo año esté dentro del rango, ambos incluidos.
  return libros.filter((libro) => libro.anio >= añoDesde && libro.anio <= añoHasta);
}

// R4
// Obtiene los géneros sin repetir.
// Recibe: un array de libros. Devuelve: un array de géneros ordenado
// alfabéticamente.

function generos(libros) {
  const conjunto = new Set(libros.map((libro) => libro.genero));
  return [...conjunto].sort((a, b) => a.localeCompare(b, "es")); // Idioma español para ordenar correctamente acentos y eñes.
}

// R5
// Cuenta cuántos libros tiene cada autor.
// Recibe: un array de libros. Devuelve: un Map autor → número de libros.

function librosPorAutor(libros) {
  return libros.reduce(
    (mapa, libro) => mapa.set(libro.autor, (mapa.get(libro.autor) ?? 0) + 1),
    new Map()
  );
}

// R6
// Obtiene los libros mejor valorados.
// Recibe: un array de libros y n (cuántos devolver, 3 por defecto).
// Devuelve: un array nuevo con los n mejores por valoración media, de mayor a
// menor (empates por título). Excluye los libros sin valoraciones y no
// modifica el array original.

function ranking(libros, n = 3) {
  return libros
    .filter((libro) => libro.valoraciones.length > 0)
    .sort((a, b) => {
      const diferencia = valoracionMedia(b) - valoracionMedia(a);
      return diferencia !== 0 ? diferencia : a.titulo.localeCompare(b.titulo, "es");}).slice(0, Math.max(0, n));
}

// R7
// Resume el estado del fondo.
// Recibe: un array de libros. Devuelve: un objeto con total, prestados,
// disponibles, mediaGlobal (null si no hay valoraciones) y masAntiguo (título
// del libro más antiguo, null si no hay libros).

function resumen(libros) {
  const prestados = libros.filter((libro) => libro.prestado).length;
  const valoraciones = libros.flatMap((libro) => libro.valoraciones);
  const suma = valoraciones.reduce((acumulado, valor) => acumulado + valor, 0);
  const libroMasAntiguo = libros.reduce(
    (masAntiguo, libro) => (masAntiguo === null || libro.anio < masAntiguo.anio ? libro : masAntiguo),
    null
  );
  return {
    total: libros.length,
    prestados: prestados,
    disponibles: libros.length - prestados,
    mediaGlobal: valoraciones.length === 0 ? null : Math.round((suma / valoraciones.length) * 10) / 10,
    masAntiguo: libroMasAntiguo === null ? null : libroMasAntiguo.titulo
  };
}

// ---------------------------------------------------------------------------
// R8: funciones que generan HTML
// ---------------------------------------------------------------------------

// Genera la tabla del catálogo; las filas de libros prestados llevan la clase
// "prestado" y los libros sin valoraciones muestran "Sin valorar".
// Recibe: un array de libros. Devuelve: un string HTML con la tabla.

function tablaLibros(libros) {
  const filas = libros
    .map(
      (libro) => `
      <tr${libro.prestado ? ' class="prestado"' : ""}>
        <td>${libro.titulo}</td>
        <td>${libro.autor}</td>
        <td>${libro.genero}</td>
        <td>${libro.anio}</td>
        <td>${libro.prestado ? "No disponible" : "Disponible"}</td>
        <td>${valoracionMedia(libro) ?? "Sin valoraciones"}</td>
      </tr>`
    )
    .join("");
  return `
    <table>
      <thead>
        <tr>
          <th>Título</th><th>Autor</th><th>Género</th><th>Año</th><th>Estado</th><th>Valoración</th>
        </tr>
      </thead>
      <tbody>
      ${filas}
      </tbody>
    </table>`;
}

// Genera la lista de géneros.
// Recibe: un array de nombres de género. Devuelve: un string HTML con la lista.

function listaGeneros(listaDeGeneros) {
  const elementos = listaDeGeneros.map((genero) => `<li>${genero}</li>`).join("");
  return `<ul class="etiquetas">${elementos}</ul>`;
}

// Genera el ranking de libros mejor valorados.
// Recibe: un array de libros ya ordenado. Devuelve: un string HTML con una
// lista numerada.

function listaRanking(librosOrdenados) {
  const elementos = librosOrdenados
    .map((libro) => `<li>${libro.titulo} <span class="nota">(${valoracionMedia(libro) ?? "Sin valorar"})</span></li>`)
    .join("");
  return `<ol>${elementos}</ol>`;
}

// Genera el bloque con el resumen del fondo.
// Recibe: el objeto devuelto por resumen(). Devuelve: un string HTML.

function bloqueResumen(datos) {
  return `
    <ul class="resumen">
      <li>Total de libros: ${datos.total}</li>
      <li>Prestados: ${datos.prestados}</li>
      <li>Disponibles: ${datos.disponibles}</li>
      <li>Valoración media global: ${datos.mediaGlobal ?? "Sin valorar"}</li>
      <li>Libro más antiguo: ${datos.masAntiguo ?? "—"}</li>
    </ul>`;
}

// Genera la lista de autores con su número de libros.
// Recibe: un Map autor → número de libros. Devuelve: un string HTML con la lista.

function listaAutores(mapaAutores) {
  const elementos = [...mapaAutores]
    .map(([autor, cantidad]) => `<li>${autor}: ${cantidad} ${cantidad === 1 ? "libro" : "libros"}</li>`)
    .join("");
  return `<ul>${elementos}</ul>`;
}

// ---------------------------------------------------------------------------
// Programa principal
// ---------------------------------------------------------------------------

mostrar("#resumen", bloqueResumen(resumen(LIBROS)));
mostrar("#catalogo", tablaLibros(LIBROS));
mostrar("#generos", listaGeneros(generos(LIBROS)));
mostrar("#ranking", listaRanking(ranking(LIBROS)));
mostrar("#autores", listaAutores(librosPorAutor(LIBROS)));
