import Form from "./components/formulario.js";
import tabla from "./components/tabla.js";
import cards from "./components/cards.js";

(() => {
    tabla.init();

    Form.setDatos((task) => {
        tabla.saveTask(task); 
    });
})();