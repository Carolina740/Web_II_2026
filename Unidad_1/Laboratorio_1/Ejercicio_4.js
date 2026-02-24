// ============================================
//               Números primos
// ============================================

// Función helper - Verifica si un número es primo
function es_primo(numero) {
    if (numero <= 1) return false;
    if (numero <= 3) return true;
    if (numero % 2 === 0 || numero % 3 === 0) return false;
        for (let i = 5; i * i <= numero; i += 6) {
            if (numero % i === 0 || numero % (i + 2) === 0) return false;
        }
        return true;
}

// Función tradicional
function filtrar_primos(numeros) {
    let listaElegidos = [];
    for (let num of numeros) {
        if (es_primo(num)) {
            listaElegidos.push(num);
        }
    }
    return listaElegidos;
}

// Función helper flecha
const es_primo_arrow = (numero) => {
    if (numero <= 1) return false;
    if (numero <= 3) return true;
    if (numero % 2 === 0 || numero % 3 === 0) return false;
        for (let i = 5; i * i <= numero; i += 6) {
            if (numero % i === 0 || numero % (i + 2) === 0) return false;
        }
        return true;
};

// Función flecha
const filtrar_primos_arrow = (numeros) => {
    return numeros.filter(candidato => es_primo_arrow(candidato));
};

// Prueba
console.log("EJERCICIO 4 - Números primos");
console.log("============================");
console.log("Función tradicional:");
console.log(filtrar_primos([8, 9, 10, 11, 12, 13, 14, 15, 29, 31]));
console.log("\nFunción flecha:");
console.log(filtrar_primos_arrow([8, 9, 10, 11, 12, 13, 14, 15, 29, 31]));