// ============================================
//            Palabra más larga
// ============================================

// Función tradicional
function palabra_mas_larga(frase) {
    let listaPalabras = frase.split(" ");
    let palabraMasLarga = "";
    for (let termino of listaPalabras) {
        if (termino.length > palabraMasLarga.length) {
            palabraMasLarga = termino;
        }
    }
    return palabraMasLarga;
}

// Función flecha
const palabra_mas_larga_arrow = (frase) => {
    return frase.split(" ").reduce((palabraMasLarga, termino) => 
        termino.length > palabraMasLarga.length ? termino : palabraMasLarga, ""
    );
};

// Prueba
console.log("EJERCICIO 2 - Palabra más larga");
console.log("===============================");
console.log("Función tradicional:");
console.log(palabra_mas_larga("Ayer comi pan con mermelada mientras leia un libro extraordinario."));
console.log("\nFunción flecha:");
console.log(palabra_mas_larga_arrow("Ayer comi pan con mermelada mientras leia un libro extraordinario."));