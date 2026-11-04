class Ordenador {
    constructor(marca, modelo, ram = 4, disco = 512, pulgadas = 17) {
        if (!marca || !modelo) {
            console.log("La marca y el modelo son obligatorios.")
        }
        this.marca = marca;
        this.modelo = modelo;
        this.ram = ram;
        this.disco = disco;
        this.pulgadas = pulgadas;
    }

    toString() {
        return `${this.marca} ${this.modelo} — RAM: ${this.ram} GB, Disco: ${this.disco} GB, Pantalla: ${this.pulgadas}"`;
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
}

// Ordenador indicando marca y modelo
const pc1= new Ordenador("HP", "EliteBook");

// Ordenador indicando todos los valores
const pc2 = new Ordenador("HP", "Gaming", 32, 1024, 27);

// Portátil indicando marca y modelo
const portatil1 = new Portatil("Apple", "MacBook Air");

// Portátil indicando todos los valores
const portatil2 = new Portatil("Asus", "TUF Gaming F15", 16, 1024, 17, 12);

console.log("\nPRUEBAS DE ORDENADOR");
console.log(pc1.toString());
console.log(pc2.toString());

console.log("\nPRUEBAS DE PORTÁTIL");
console.log(portatil1.toString());
console.log(portatil2.toString());