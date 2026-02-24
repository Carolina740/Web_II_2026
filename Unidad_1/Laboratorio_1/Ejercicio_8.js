// ============================================
// EJERCICIO 8: Palíndromo
// ============================================

// Función tradicional
function es_palindromo(cadena) {
    let cadenaLimpia = cadena.toLowerCase().replace(/\s+/g, "");
    let cadenaReversa = "";
    
    for (let i = cadenaLimpia.length - 1; i >= 0; i--) {
        cadenaReversa += cadenaLimpia[i];
    }
    
    return cadenaLimpia === cadenaReversa;
}

// Función flecha
const es_palindromo_arrow = (cadena) => {
    const cadenaLimpia = cadena.toLowerCase().replace(/\s+/g, "");
    const cadenaReversa = cadenaLimpia.split("").reverse().join("");
    return cadenaLimpia === cadenaReversa;
};

// Prueba
console.log("EJERCICIO 8 - Palíndromo");
console.log("========================");
console.log("Función tradicional:");
console.log(`"oso" es palíndromo: ${es_palindromo("oso")}`);
console.log(`"casa" es palíndromo: ${es_palindromo("casa")}`);
console.log(`"anilina" es palíndromo: ${es_palindromo("anilina")}`);
console.log(`"hola" es palíndromo: ${es_palindromo("hola")}`);

console.log("\nFunción flecha:");
console.log(`"oso" es palíndromo: ${es_palindromo_arrow("oso")}`);
console.log(`"casa" es palíndromo: ${es_palindromo_arrow("casa")}`);
console.log(`"anilina" es palíndromo: ${es_palindromo_arrow("anilina")}`);
console.log(`"hola" es palíndromo: ${es_palindromo_arrow("hola")}`);