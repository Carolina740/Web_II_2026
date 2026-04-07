const API_URL ="http://localhost:3001/posts";
const getData = () => {
    fetch(API_URL)//conexion a servidor
        .then(response=>{
            if(!response.ok){
                throw new Error(`Http error! estado: ${response.status}`);
            }
            return response.json();
    })
    .then (data => showResult(data))
    .catch(error=>(error.message,true));  
}