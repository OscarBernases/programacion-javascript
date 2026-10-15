function dibujarTabla(filas = 10, columnas = 4, color = "black") {

  let estiloTabla = "width: 100%; border-collapse: collapse; border: 3px solid " + color + "; margin-bottom: 20px;";
  let estiloCelda = "border: 1px solid " + color + "; padding: 8px;";

  document.write("<table style='" + estiloTabla + "'>");

  for (let f = 0; f < filas; f++) {
    document.write("<tr>");

    for (let c = 0; c < columnas; c++) {
      document.write("<td style='" + estiloCelda + "'></td>");
    }

    document.write("</tr>");
  }
  document.write("</table>");
}

// 1) Tabla de 10 filas y 4 columnas con borde negro
document.write("<h2>Tablas 1</h2>");
dibujarTabla();

// 2) Tabla de 20 filas y 10 columnas con borde negro
document.write("<h2>Tablas 2</h2>");
dibujarTabla(20, 10, "black");

// 3) Diez tablas de 5 filas y 4 columnas con borde verde
document.write("<h2>Tablas 3</h2>");
for (let i = 0; i < 10; i++) {
  dibujarTabla(5, 4, "green");
}