import { clientService } from "../service/client-service.js";
const formulario = document.querySelector('[data-form]');
formulario.addEventListener("submit", (evento)=>{
    evento.preventDefault();
    const nombre = document.querySelector("[data-nombre]").value;
    const email = document.querySelector("[data-email]").value;
    clientService.crearCliente(nombre,email).then((respuesta)=>{
        console.log("todo ok",respuesta);
        window.location.href="./registro_completado.html";
    }).catch((error)=>{
        console.log("todo mal",error)
    });
});