import cards from "./cards.js";

const tabla = (() => {
    const cuerpoTabla = document.getElementById('taskTable').getElementsByTagName('tbody')[0];

    const addTask = (task) => {
        const nuevaFila = cuerpoTabla.insertRow();
        
        // Insertar datos en orden exacto según el HTML
        nuevaFila.insertCell(0).textContent = task.task;         
        nuevaFila.insertCell(1).textContent = task.description;  
        nuevaFila.insertCell(2).textContent = task.date;         
        nuevaFila.insertCell(3).textContent = task.priority;   
        
        // Celda de Acciones (Posición 4 en el HTML)
        const accionCell = nuevaFila.insertCell(4);
        
        nuevaFila.insertCell(5).textContent = task.responsable;  
        nuevaFila.insertCell(6).textContent = task.tag;        
        
        nuevaFila.dataset.progreso = task.progreso;
        const acciones = document.createElement('div');
        acciones.className = 'actions';

        const editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.style.backgroundColor = "#ffc107";
        editButton.addEventListener('click', () => {
            document.querySelector('[data-input-task]').value = task.task;
            document.querySelector('[data-input-descripcion]').value = task.description;
            document.querySelector('[data-input-fecha]').value = task.date;
            document.querySelector('[data-input-prioridad]').value = task.priority;
            document.querySelector('[data-input-responsable]').value = task.responsable;
            document.querySelector('[data-input-tag]').value = task.tag;
            document.querySelector('[data-input-progreso]').value = task.progreso;
            nuevaFila.remove();
            cards.update();
        });

        const completeButton = document.createElement('button');
        completeButton.textContent = 'Hecho';
        completeButton.className = 'view';
        completeButton.addEventListener('click', () => {
            nuevaFila.classList.toggle('completed');
            cards.update();
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.className = 'delete';
        deleteButton.addEventListener('click', () => {
            nuevaFila.remove(); // Más seguro que rowIndex
            cards.update();
        });

        acciones.appendChild(completeButton);
        acciones.appendChild(editButton);
        acciones.appendChild(deleteButton);
        accionCell.appendChild(acciones);
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

    return { addTask, getTask };
})();

export default tabla;