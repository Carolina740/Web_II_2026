// ============================================
//              Decimal a binario
// ============================================

// Función tradicional
function decimal_a_binario(numero) {
    let resultadoBinario = "";
    if (numero === 0) return "0";
    let temporal = numero;
    while (temporal > 0) {
        resultadoBinario = (temporal % 2) + resultadoBinario;
        temporal = Math.floor(temporal / 2);
    }
    return resultadoBinario;
}

// Función flecha
const decimal_a_binario_arrow = (numero) => {
    return numero.toString(2);
};

// Prueba
console.log("EJERCICIO 5 - Decimal a binario");
console.log("===============================");
console.log("Función tradicional:");
console.log("10 a binario:", decimal_a_binario(10));
console.log("25 a binario:", decimal_a_binario(25));
console.log("50 a binario:", decimal_a_binario(54));
console.log("100 a binario:", decimal_a_binario(73));
console.log("\nFunción flecha:");
console.log("10 a binario:", decimal_a_binario_arrow(10));
console.log("25 a binario:", decimal_a_binario_arrow(25));
console.log("50 a binario:", decimal_a_binario_arrow(54));
console.log("100 a binario:", decimal_a_binario_arrow(73));