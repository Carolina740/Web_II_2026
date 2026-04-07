const Form = (() => {
    const form = document.querySelector('[data-form]');
    const inputTask = document.querySelector('[data-input-task]');
    const inputDescription = document.querySelector('[data-input-descripcion]');
    const inputFecha = document.querySelector('[data-input-fecha]');
    const inputPrioridad = document.querySelector('[data-input-prioridad]');
    const inputResponsable = document.querySelector('[data-input-responsable]');
    const inputTag = document.querySelector('[data-input-tag]');
    const inputProgreso = document.querySelector('[data-input-progreso]');

    const datosForm = () => {
        return {
            task: inputTask.value.trim(),
            description: inputDescription.value.trim(),
            date: inputFecha.value.trim(),
            priority: inputPrioridad.value.trim(),
            responsable: inputResponsable.value.trim(),
            tag: inputTag.value.trim(),
            progreso: inputProgreso.value.trim() || "0"
        };
    };

    const reset =()=>{
        inputTask.value="";
        inputDescription.value="";
        inputFecha.value="";
        inputPrioridad.value="";
        inputResponsable.value=""; 
        inputTag.value="";
        inputProgreso.value="";
      }
    

    const setDatos = (callback) => {
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            callback(datosForm());
            reset();
        });
    };

    return { setDatos };
})();
export default Form;