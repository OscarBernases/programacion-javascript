class Ordenador {
    constructor(marca, modelo, ram = 4, disco = 512, pulgadas = 17) {
        if(typeof marca !== "string" || marca.trim() === "") {
          throw new Error("La marca es obligatoria.");
        }

        if(typeof modelo !== "string" || modelo.trim() === "") {
          throw new Error("El modelo es obligatorio.");
        }
        
        this.marca = marca;
        this.modelo = modelo;
        this.ram = ram;
        this.disco = disco;
        this.pulgadas = pulgadas;
    }

    toString() {
        return `${this.marca} ${this.modelo} RAM: ${this.ram} GB, Disco: ${this.disco} GB, Pantalla: ${this.pulgadas}"`;
    }

    precio() {
      return (200 + (this.ram * 10) + (this.disco * 0.1) + (this.pulgadas * 5));
    }
}

class Portatil extends Ordenador {
  constructor(marca, modelo, ram = 4, disco = 256, pulgadas = 12, autonomia = 4) {
    super(marca, modelo, ram, disco, pulgadas);
    this.autonomia = autonomia;
  }

  toString() {
    return `${super.toString()}, Autonomía: ${this.autonomia}h`;
  }

  precio() {
      return (super.precio() + 100 + (this.autonomia * 15));
    }
}

class Tablet extends Portatil {
  constructor(marca, modelo, ram = 4, disco = 128, pulgadas = 10, autonomia = 10, lapiz = false) {
    super(marca, modelo, ram, disco, pulgadas, autonomia);
    this.lapiz = lapiz;
  }

  toString() {
    return `${super.toString()}, Lápiz: ${this.lapiz ? "Sí" : "No"} `;
  }

  precio() {
      return (super.precio() + (this.lapiz ? 50 : 0));
    }
}

class Servidor extends Ordenador {
  constructor(marca, modelo, nucleos = 8, ram = 32, disco = 2000) {
    super(marca, modelo, ram, disco, 0); 
    this.nucleos = nucleos;
  }

  toString() {
    return `${this.marca} ${this.modelo} — ${this.nucleos} núcleos, RAM: ${this.ram} GB, Disco: ${this.disco} GB, sin pantalla`;
  }

  precio() {
    return 500 + (this.nucleos * 60) + (this.ram * 12) + (this.disco * 0.15);
  }
}

class Gaming extends Ordenador {
  constructor(marca, modelo, grafica, ram = 16, disco = 1024, pulgadas = 27) {
    if(typeof grafica !== "string" || grafica.trim() === "") {
      throw new Error("La tarjeta gráfica es obligatoria.");
    }
    super(marca, modelo, ram, disco, pulgadas);
    this.grafica = grafica;
  }

  toString() {
    return `${super.toString()}, Gráfica: ${this.grafica}`;
  }

  precio() {
    return super.precio() + 400;
  }
}

const inventario = [
  new Ordenador("HP", "EliteDesk", 16, 1024, 24),
  new Ordenador("Acer", "Aspire"),
  new Portatil("Apple", "MacBook Air"),
  new Portatil("Lenovo", "Yoga", 16, 1024, 14, 10),
  new Tablet("Apple", "iPad", 8, 256, 11, 10, true),
  new Tablet("Samsung", "Galaxy Tab"),
  new Servidor("Dell", "PowerEdge", 16, 64, 4000),
  new Gaming("Asus", "ROG", "RTX 4070", 32, 2000),
  new Gaming("HP", "Omen", "RX 7800")
];

function mostrarInventario(lista) {
    console.log("\n--- MOSTRAR INVENTARIO ---");
    lista.forEach((equipo, index) => {
        const tipo = equipo.constructor.name;
        console.log(`${index + 1}. [${tipo}] ${equipo.toString()} — Precio: ${equipo.precio().toFixed(2)} €`);
    });
}

function describir(equipo) {
    console.log(`\n--- DESCRIPCIÓN DE EQUIPO (${equipo.constructor.name}) ---`);
    for (let propiedad in equipo) {
        if (typeof equipo[propiedad] !== "function") {
            console.log(`${propiedad}: ${equipo[propiedad]}`);
        }
    }
}

function contarPortatiles(lista) {
    return lista.filter(equipo => equipo instanceof Portatil).length;
}

function contarSoloPortatiles(lista) {
    return lista.filter(equipo => equipo instanceof Portatil && equipo.constructor.name === "Portatil").length;
}

function masCaro(lista) {
    return lista.reduce((prev, actual) => (actual.precio() > prev.precio() ? actual : prev));
}

function dentroDePresupuesto(lista, maximo) {
    return lista
        .filter(equipo => equipo.precio() <= maximo)
        .sort((a, b) => a.precio() - b.precio());
}

function totalPorMarca(lista) {
    const totales = {};

    for (let equipo in lista) {
        const marca = lista[equipo].marca;
        if (!totales[marca]) {
            totales[marca] = 0;
        }
        totales[marca] += lista[equipo].precio();
    }

    return totales;
}

function ampliarRam(lista, clase, gb) {
    lista.forEach(equipo => {
        if (equipo instanceof clase) {
            equipo.ram += gb;
        }
    });
}

// --- PRUEBAS EN CONSOLA ---

mostrarInventario(inventario);

console.log("\n--- ESTADÍSTICAS Y BÚSQUEDAS ---");
console.log(`Contar portátiles (incluyendo tablets): ${contarPortatiles(inventario)}`);
console.log(`Contar solo portátiles (sin tablets): ${contarSoloPortatiles(inventario)}`);

const equipoMasCaro = masCaro(inventario);
console.log(`Más caro: ${equipoMasCaro.constructor.name} - ${equipoMasCaro.marca} ${equipoMasCaro.modelo} (${equipoMasCaro.precio().toFixed(2)} €)`);

const presupuesto700 = dentroDePresupuesto(inventario, 700);
console.log(`Equipos dentro de 700 € (${presupuesto700.length} encontrados):`);
presupuesto700.forEach(e => console.log(`- ${e.marca} ${e.modelo}: ${e.precio().toFixed(2)} €`));

console.log("\n--- TOTAL POR MARCA ---");
const totalesMarca = totalPorMarca(inventario);
for (let marca in totalesMarca) {
    console.log(`${marca}: ${totalesMarca[marca].toFixed(2)} €`);
}

// Ampliar RAM de todos los ordenadores en el inventario y mostrar el inventario actualizado
ampliarRam(inventario, Ordenador, 8);
mostrarInventario(inventario);


/*
Parte 7 — Preguntas y Respuestas teóricas:

1. ¿Por qué contarPortatiles y contarSoloPortatiles dan resultados distintos? ¿Qué significa que una Tablet «es un» Portatil?
   - Dan resultados distintos porque Tablet hereda de Portatil. Por tanto, al usar `instanceof Portatil`, las tablets también son consideradas portátiles en JavaScript. Contar solo portátiles filtra explícitamente por el constructor exacto ("Portatil").

2. En mostrarInventario llamas a precio() sin saber de qué clase es cada equipo. ¿Cómo se llama esta característica? ¿Qué versión de precio() se ejecuta para una Tablet?
   - Esta característica se llama polimorfismo. Para una Tablet se ejecuta el método `precio()` definido específicamente dentro de la clase Tablet (que a su vez invoca al de Portatil mediante `super.precio()`).

3. Tablet y Servidor sobrescriben precio() de forma distinta. ¿En qué se diferencian? ¿Cuándo conviene cada opción?
   - Tablet utiliza `super.precio()` para reutilizar la lógica del padre. Servidor calcula el precio de forma completamente independiente sin usar `super.precio()`.

4. ¿Por qué describir no muestra precio ni toString?
   - Porque `precio()` y `toString()` son métodos definidos en el prototipo/clase como funciones, no propiedades de datos almacenadas directamente en la instancia (como marca, modelo, ram, etc.). El bucle `for...in` recorre las propiedades enumerables del objeto.

5. Después de llamar a ampliarRam, ¿cambia el inventario original? ¿Por qué?
   - Sí cambia, porque los objetos en JavaScript se pasan y manipulan por referencia. El array contiene referencias directas a las mismas instancias de objetos creadas en memoria.

6. ¿Qué pasaría en ampliarRam(inventario, Ordenador, 8)?
   - Como prácticamente todas las clases creadas (`Portatil`, `Tablet`, `Servidor`, `Gaming`) heredan directa o indirectamente de `Ordenador`, el operador `instanceof Ordenador` devolverá `true` para absolutamente todos los elementos del inventario. Por lo tanto, se incrementará la RAM en 8 GB a todos los equipos del inventario.
*/