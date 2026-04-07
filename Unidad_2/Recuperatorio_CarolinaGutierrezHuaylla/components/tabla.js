import cards from "./cards.js";

const API_URL = "http://localhost:3000/tasks";
let editId = null;

const tabla = (() => {
    const cuerpoTabla = document.getElementById('taskTable').getElementsByTagName('tbody')[0];
    const btnForm = document.querySelector('.btnCreate');

    // --- GET ---
    const init = () => {
        fetch(API_URL)
            .then(response => response.json())
            .then(data => {
                cuerpoTabla.innerHTML = ""; 
                data.forEach(task => renderRow(task));
                cards.update();
            })
            .catch(error => console.error("Error al cargar:", error));
    };

    const renderRow = (task) => {
        const nuevaFila = cuerpoTabla.insertRow();
        nuevaFila.dataset.id = task.id;
        nuevaFila.dataset.progreso = task.progreso;
        if (task.completed) nuevaFila.classList.add('completed');

        nuevaFila.insertCell(0).textContent = task.task;
        nuevaFila.insertCell(1).textContent = task.description;
        nuevaFila.insertCell(2).textContent = task.date;
        nuevaFila.insertCell(3).textContent = task.priority;

        const accionCell = nuevaFila.insertCell(4);
        nuevaFila.insertCell(5).textContent = task.responsable;
        nuevaFila.insertCell(6).textContent = task.tag;

        const acciones = document.createElement('div');
        acciones.className = 'actions';

        // --- ESTADO ---
        const completeButton = document.createElement('button');
        completeButton.textContent = 'Hecho';
        completeButton.className = 'view';
        completeButton.onclick = () => {
            const nuevoEstado = !nuevaFila.classList.contains('completed');
            fetch(`${API_URL}/${task.id}`, {
                method: "PATCH",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({ completed: nuevoEstado })
            })
            .then(() => {
                nuevaFila.classList.toggle('completed');
                cards.update();
            });
        };

        // --- EDITAR ---
        const editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.style.backgroundColor = "#ffc107";
        editButton.onclick = () => {
            document.querySelector('[data-input-task]').value = task.task;
            document.querySelector('[data-input-descripcion]').value = task.description;
            document.querySelector('[data-input-fecha]').value = task.date;
            document.querySelector('[data-input-prioridad]').value = task.priority;
            document.querySelector('[data-input-responsable]').value = task.responsable;
            document.querySelector('[data-input-tag]').value = task.tag;
            document.querySelector('[data-input-progreso]').value = task.progreso;
            
            editId = task.id;
            btnForm.innerHTML = 'Actualizar <i class="fas fa-sync"></i>';
        };

        // --- ELIMINAR ---
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.className = 'delete';
        deleteButton.onclick = () => {
            fetch(`${API_URL}/${task.id}`, { method: "DELETE" })
                .then(() => {
                    nuevaFila.remove();
                    cards.update();
                });
        };

        acciones.appendChild(completeButton);
        acciones.appendChild(editButton);
        acciones.appendChild(deleteButton);
        accionCell.appendChild(acciones);
    };

    const saveTask = (task) => {
        if (editId) {
            // (PUT)
            fetch(`${API_URL}/${editId}`, {
                method: "PUT",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({ ...task, completed: false })
            })
            .then(response => response.json())
            .then(() => {
                editId = null; 
                btnForm.innerHTML = 'Agregar <i class="fas fa-plus-circle"></i>';
                init(); 
            });
        } else {
            // (POST)
            fetch(API_URL, {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({ ...task, completed: false })
            })
            .then(response => response.json())
            .then(data => {
                renderRow(data);
                cards.update();
            });
        }
    };

    const getTask = () => {
        return Array.from(cuerpoTabla.rows).map(row => ({
            task: row.cells[0].textContent,
            description: row.cells[1].textContent,
            date: row.cells[2].textContent,
            priority: row.cells[3].textContent,
            responsable: row.cells[5].textContent,
            tag: row.cells[6].textContent,
            progreso: row.dataset.progreso,
            completed: row.classList.contains('completed')
        }));
    };

    return { saveTask, getTask, init };
})();

export default tabla;