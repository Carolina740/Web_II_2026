import checkComplete from "./components/checkComplete.js";
import deleteIcon from "./components/deleteIcon.js";

(()=>{
    const btn = document.querySelector('[data-form-btn]')
    console.log(btn)

    const createTask=(evento)=>{
        evento.preventDefault();
        const input = document.querySelector('[data-form-input]');
        const value = input.value.trim();//recupero el valor del input
        const list = document.querySelector('[data-list]');
        if(value === '') {
            alert("No puedes agregar una tarea vacia");
            return;
        } //si el valor es vacio no se crea la tarea
        const task = document.createElement('li');
        task.classList.add('card'); //agrega clase de la li
        input.value = ''; 
        const contTask = document.createElement('div');
        const titleTask = document.createElement('span');
        titleTask.classList.add('task');
        titleTask.innerText = value;
        contTask.appendChild(checkComplete()); //agrego el check al div
        contTask.appendChild(titleTask);

        task.appendChild(contTask);
        task.appendChild(deleteIcon());
        list.appendChild(task);
    }
    //llamar a crear task
    btn.addEventListener('click',createTask);  
    //cada ves que vea una funcion diferente se coloca en diferentes flechas
})();