// ============================================
//           Número que más se repite
// ============================================

// Función tradicional
function numero_mas_repetido(numeros) {
    let mapa = {};
    for (let num of numeros) {
        mapa[num] = (mapa[num] || 0) + 1;
    }
    let numeroVencedor = numeros[0];
    for (let num in mapa) {
        if (mapa[num] > mapa[numeroVencedor]) {
            numeroVencedor = num;
        }
    }
    return parseInt(numeroVencedor);
}

// Función flecha
const numero_mas_repetido_arrow = (numeros) => {
    const mapa = numeros.reduce((acumulador, num) => {
        acumulador[num] = (acumulador[num] || 0) + 1;
        return acumulador;
    }, {});

    return parseInt(
    Object.keys(mapa).reduce((ganador, contendiente) => 
        mapa[ganador] > mapa[contendiente] ? ganador : contendiente)
    );
};

// Prueba
console.log("EJERCICIO 6 - Número que más se repite");
console.log("=====================================");
console.log("Función tradicional:");
console.log(numero_mas_repetido([8, 9, 2, 3, 3, 3,  3, 2, 4, 4, 4, 5]));
console.log("\nFunción flecha:");
console.log(numero_mas_repetido_arrow([8, 9, 2, 3, 3, 3, 3, 2, 4, 4, 4, 5]));