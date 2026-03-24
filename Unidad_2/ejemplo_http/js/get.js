const API_URL = "http://localhost:3001/posts";

const getData = () => {
    fetch(API_URL)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en el servidor: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.length === 0) {
                showResult("No hay posts guardados. ¡Crea uno nuevo!");
            } else {
                showResult(data);
            }
        })
        .catch(error => showResult(error.message, true));
};