// ============================================
//          Números pares e impares
// ============================================

// Función tradicional
function contar_pares_impares(numeros) {
    let totalPar = 0, totalImpar = 0;
    for (let num of numeros) {
        if (num % 2 === 0) {
            totalPar++;
        } else {
            totalImpar++;
        }
    }
    return { totalPar, totalImpar };
}

// Función flecha
const contar_pares_impares_arrow = (numeros) => {
    let totalPar = 0, totalImpar = 0;
        numeros.forEach(num => {
            num % 2 === 0 ? totalPar++ : totalImpar++;
        });
        return { totalPar, totalImpar };
};

// Prueba
console.log("EJERCICIO 1 - Números pares e impares");
console.log("=====================================");
console.log("Función tradicional:");
console.log(contar_pares_impares([17, 24, 35, 42, 53, 66]));
console.log("\nFunción flecha:");
console.log(contar_pares_impares_arrow([17, 24, 35, 42, 53, 66]));