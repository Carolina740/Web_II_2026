const postData = () => {
    const idInput = document.getElementById('postId').value;
    const tituloInput = document.getElementById('postTitulo').value;
    const descripcionInput = document.getElementById('postDescripcion').value;
    const fechaInput = document.getElementById('postFecha').value;

    if (!idInput) {
        alert("Debes ingresar un ID numérico para que no sea automático");
        return;
    }

    const newPost = {
        id: Number(idInput), 
        titulo: tituloInput,
        descripcion: descripcionInput,
        fecha: fechaInput
    };

    fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(newPost)
    })
    .then(response => {
        if (!response.ok) throw new Error("Ese ID ya existe en el servidor");
        return response.json();
    })
    .then(data => showResult(data))
    .catch(error => showResult(error.message, true));
}