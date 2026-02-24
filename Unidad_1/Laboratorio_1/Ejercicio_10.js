// ============================================
// EJERCICIO 10: Ordenamiento Burbuja
// ============================================

// Función tradicional
function ordenar_burbuja(numeros) {
    let arr = [...numeros];
    let n = arr.length;
    
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
            // Intercambiar
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    
    return arr;
}

// Función flecha
const ordenar_burbuja_arrow = (numeros) => {
    let arr = [...numeros];
    
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]; 
            }
        }
    } 
    return arr;
};

// Prueba
console.log("EJERCICIO 10 - Ordenamiento Burbuja");
console.log("====================================");
let numeros = [64, 34, 25, 12, 22, 11, 90, 88, 45, 67];

console.log("Función tradicional:");
console.log("Array original:", numeros);
console.log("Array ordenado:", ordenar_burbuja(numeros));

console.log("\nFunción flecha:");
console.log("Array original:", numeros);
console.log("Array ordenado:", ordenar_burbuja_arrow(numeros));

console.log("\nOtros ejemplos:");
console.log(ordenar_burbuja([5, 2, 8, 1, 9]));
console.log(ordenar_burbuja_arrow([5, 2, 8, 1, 9]));