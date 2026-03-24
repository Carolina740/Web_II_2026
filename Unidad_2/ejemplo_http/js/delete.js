const deleteData = () => {
    const id = document.getElementById('postId').value;

    if (!id) return alert("Escribe el ID que quieres borrar");

    fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    })
    .then(response => {
        if (!response.ok) throw new Error("ID no encontrado");
        showResult({ message: `Post con id ${id} eliminado con éxito` });
    })
    .catch(error => showResult(error.message, true));
}