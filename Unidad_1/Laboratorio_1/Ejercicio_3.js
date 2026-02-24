// ============================================
//              Número invertido
// ============================================

// Función tradicional
function invertir_numero(numero) {
    let cadenaNumero = numero.toString();
    let numeroReverso = "";
    for (let i = cadenaNumero.length - 1; i >= 0; i--) {
        numeroReverso += cadenaNumero[i];
    }
    return parseInt(numeroReverso);
}

// Función flecha
const invertir_numero_arrow = (numero) => {
    return parseInt(
        numero
            .toString()
            .split("")
            .reverse()
            .join("")
    );
};

// Prueba
console.log("EJERCICIO 3 - Número invertido");
console.log("==============================");
console.log("Función tradicional:");
console.log(invertir_numero(8976531));
console.log("\nFunción flecha:");
console.log(invertir_numero_arrow(8976531));