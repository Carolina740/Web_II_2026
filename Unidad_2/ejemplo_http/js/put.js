const putData = () => {
    const updateData={
        titulo:"ACTUALIZADO",
        descripcion:"ACTUALIZADO",
        fecha: new Date().toISOString()
    };
    fetch(`${API_URL}/1`, {
        method:"PUT",
        headers:{"Content-type":"application/json",
                "Accept":"application/json"
            },
        body:JSON.stringify(updateData)
    })
    .then(response =>{
        if(!response.ok){
            throw new Error(`Http error estado: ${response.status}`);
        }
        return response.json(); 
    })
    .then(data => showResult(data))
    .catch(error => showResult(error.message,true)) 
}