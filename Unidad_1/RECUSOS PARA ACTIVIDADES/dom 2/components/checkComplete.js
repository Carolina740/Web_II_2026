const checkComplete = ()=>{
        const i = document.createElement('i');
        i.classList.add('far','fa-check-circle','icon');//estilos de icono
        i.addEventListener('click',completTask);
        return i;
}
const completTask = (evento) => {
        const element =evento.target;
        element.classList.toggle('fas');
        element.classList.toggle('completeIcon');
        element.classList.toggle('far')
}; 

export default checkComplete;