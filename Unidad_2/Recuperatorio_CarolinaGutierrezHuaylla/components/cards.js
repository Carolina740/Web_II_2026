import tabla from "./tabla.js";

const cards = (() => {
    const taskCards = document.getElementById('taskCards');

    const update = () => {
        const tasks = tabla.getTask();
        taskCards.innerHTML = ''; 

        tasks.forEach(task => {
            const card = document.createElement('div');
            card.className = 'taskCard';
            card.innerHTML = ` 
                <p><strong>Nombre:</strong> ${task.task}</p>
                <p><strong>Descripción:</strong> ${task.description}</p>
                <p><strong>Fecha:</strong> ${task.date}</p>
                <p><strong>Prioridad:</strong> ${task.priority}</p>
                <p><strong>Estado:</strong> ${task.completed ? '✅ Completada' : '⏳ Pendiente'}</p>
                <p><strong>Responsable:</strong> ${task.responsable}</p>
                <p><strong>Etiqueta:</strong> ${task.tag}</p>
                <div style="background:#eee; width:100%; height:12px; border-radius:10px; margin-top:10px; overflow:hidden;">
                    <div style="background:#28a745; width:${task.progreso}%; height:100%;"></div>
                </div>
                <p>Progreso: ${task.progreso}%</p>
            `;
            taskCards.appendChild(card);
        });
    };

    return { update };
})();

export default cards;