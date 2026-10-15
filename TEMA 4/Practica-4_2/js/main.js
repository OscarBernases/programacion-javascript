function esPrimo(numero) {
 
  if (numero < 2) {
    return false;
  }

  for (let divisor = 2; divisor < numero; divisor++) {
    if (numero % divisor === 0) {
      return false;
    }
  }

  return true;
}

let lista = document.createElement("p");
let primos = [];
 
for (let n = 1; n <= 1000; n++) {
  if (esPrimo(n)) {
    document.write(n + ", ");
  }
}