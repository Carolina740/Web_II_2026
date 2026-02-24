// ============================================
//                  Anagrama
// ============================================

// Función tradicional
function es_anagrama(palabra1, palabra2) {
    let p1 = palabra1.toLowerCase().split("").sort().join("");
    let p2 = palabra2.toLowerCase().split("").sort().join("");
    return p1 === p2;
}

// Función flecha
const es_anagrama_arrow = (palabra1, palabra2) => {
    return palabra1.toLowerCase().split("").sort().join("") === palabra2.toLowerCase().split("").sort().join("");
};

// Prueba
console.log("EJERCICIO 9 - Anagrama");
console.log("======================");
console.log("Función tradicional:");
console.log(`"bolo" y "lobo" son anagrama: ${es_anagrama("bolo", "lobo")}`);
console.log(`"roma" y "amor" son anagrama: ${es_anagrama("roma", "amor")}`);
console.log(`"gato" y "taco" son anagrama: ${es_anagrama("gato", "taco")}`);
console.log(`"hola" y "mundo" son anagrama: ${es_anagrama("hola", "mundo")}`);

console.log("\nFunción flecha:");
console.log(`"bolo" y "lobo" son anagrama: ${es_anagrama_arrow("bolo", "lobo")}`);
console.log(`"roma" y "amor" son anagrama: ${es_anagrama_arrow("roma", "amor")}`);
console.log(`"gato" y "taco" son anagrama: ${es_anagrama_arrow("gato", "taco")}`);
console.log(`"hola" y "mundo" son anagrama: ${es_anagrama_arrow("hola", "mundo")}`);