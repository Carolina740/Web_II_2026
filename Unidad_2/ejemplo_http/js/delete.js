const deleteData = () => {
    fetch(`${API_URL}/1`,{
        method:"DELETE"
    })
    .then(response =>{
        if(!response.ok){
            throw new Error(`Http error estado: ${response.status}`);
        }
        showResult({
            message:"Post con el id 1 eliminado",
            status: response.status
        });
    })
    .catch(error =>(error.message,true));  
}