// ============================================
// EJERCICIO 11: Número más repetido
// ============================================

// Función tradicional
function numero_mas_repetido(numeros) {
    let maxRepeticiones = 0;
    let numeroRepetido = null;
    
    for (let i = 0; i < numeros.length; i++) {
        let contador = 0;
        for (let j = 0; j < numeros.length; j++) {
            if (numeros[i] === numeros[j]) {
                contador++;
            }
        }
        if (contador > maxRepeticiones) {
            maxRepeticiones = contador;
            numeroRepetido = numeros[i];
        }
    } 
    return { numero: numeroRepetido, repeticiones: maxRepeticiones };
}

// Función flecha
const numero_mas_repetido_arrow = (numeros) => {
    const frecuencias = numeros.reduce((acc, num) => {
        acc[num] = (acc[num] || 0) + 1;
        return acc;
    }, {});
    
    let maxNum = null;
    let maxCount = 0;
    
    for (let num in frecuencias) {
        if (frecuencias[num] > maxCount) {
            maxCount = frecuencias[num];
            maxNum = num;
        }
    } 
    return { numero: parseInt(maxNum), repeticiones: maxCount };
};

// Prueba
console.log("EJERCICIO 11 - Número más repetido");
console.log("==================================");

let numeros1 = [3, 5, 3, 7, 5, 3, 9, 3];
console.log("Función tradicional:");
console.log("Números:", numeros1);
console.log("Resultado:", numero_mas_repetido(numeros1));

console.log("\nFunción flecha:");
console.log("Números:", numeros1);
console.log("Resultado:", numero_mas_repetido_arrow(numeros1));

console.log("\nOtro ejemplo:");
let numeros2 = [1, 2, 3, 2, 4, 2, 5, 3];
console.log("Números:", numeros2);
console.log("Función tradicional:", numero_mas_repetido(numeros2));
console.log("Función flecha:", numero_mas_repetido_arrow(numeros2));

console.log("\nEjemplo con 7 números:");
let siete_numeros = [2, 5, 2, 8, 2, 5, 9];
console.log("Números:", siete_numeros);
console.log("Función tradicional:", numero_mas_repetido(siete_numeros));
console.log("Función flecha:", numero_mas_repetido_arrow(siete_numeros));