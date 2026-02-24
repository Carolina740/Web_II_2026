// ============================================
//       Suma de propiedad específica
// ============================================

// Función tradicional
function sumar_propiedad(objetos, propiedad) {
    let totalAcumulado = 0;
    for (let item of objetos) {
        totalAcumulado += item[propiedad];
    }
    return totalAcumulado;
}

// Función flecha
const sumar_propiedad_arrow = (objetos, propiedad) => {
    return objetos.reduce((totalAcumulado, item) => totalAcumulado + item[propiedad], 0);
};

// Datos de prueba
const productos = [
    { nombre: "Laptop", precio: 1500 },
    { nombre: "Mouse", precio: 70 },
    { nombre: "Teclado", precio: 150 },
    { nombre: "Monitor", precio: 500 },
    { nombre: "Impresora", precio: 1200 }
];

// Prueba
console.log("EJERCICIO 7 - Suma de propiedad específica");
console.log("=========================================");
console.log("Función tradicional:");
console.log("Suma total de precios:", sumar_propiedad(productos, "precio"));
console.log("\nFunción flecha:");
console.log("Suma total de precios:", sumar_propiedad_arrow(productos, "precio"));
console.log("\nDetalles de productos:");
console.log(productos);