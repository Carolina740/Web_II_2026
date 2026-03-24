const putData = () => {
    const id = document.getElementById('postId').value;
    
    if (!id) return alert("Ingresa el ID para actualizar");

    const updateData = {
        id: Number(id), 
        titulo: document.getElementById('postTitulo').value,
        descripcion: document.getElementById('postDescripcion').value,
        fecha: document.getElementById('postFecha').value
    };

    fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(updateData)
    })
    .then(response => {
        if (!response.ok) throw new Error("No se encontró el post para actualizar");
        return response.json();
    })
    .then(data => showResult(data))
    .catch(error => showResult(error.message, true));
}