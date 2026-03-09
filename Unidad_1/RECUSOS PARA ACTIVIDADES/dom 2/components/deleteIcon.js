const deleteIcon = ()=>{
        const i = document.createElement('i');
        i.classList.add('fas', 'fa-times-circle', 'trashIcon', 'icon');
        i.style.color = "#e74c3c"
        i.addEventListener('click',deleteTask);
        return i;
}
const deleteTask = (evento) =>{
        const parent = evento.target.parentElement;
        parent.remove();
} 
export default deleteIcon;