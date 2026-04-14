//recepcion de datos
/*const crearFila = (nombre,email) =>{
     const fila = document.createElement('tr');//creamos nueva fila
     //html como variable
     const contenido = `
    <td class="td" data-td>
      ${nombre}
    </td>
    <td>${email}</td>
    <td>
      <ul class="table__button-control">
        <li>
          <a
            href="../screens/editar_cliente.html"
            class="simple-button simple-button--edit"
          >
            Editar
          </a>
        </li>
        <li>
          <button class="simple-button simple-button--delete" type="button">
            Eliminar
          </button>
        </li>
      </ul>
    </td>
`;
    fila.innerHTML = contenido;
    return fila;
}*/

/*
const listar_clientes = () =>{//metodo antiguo
    const promesa = new Promise ((resolve,reject)=>{
        const http = new XMLHttpRequest();//VARIABLE PARA REQUEST CON HTTTP
        http.open("GET","http://localhost:3000/perfil")
        http.send();
        http.onload =()=>{
            const response = JSON.parse(http.response)
            if(http.response >= 400){
                reject(response)
            }else
                resolve(response)
        }
    })
    return promesa;
}
listar_clientes().then((data)=>{
    data.forEach((perfil) => {
        const nuevafila = crearFila(perfil.nombre,perfil.email);
        table.appendChild(nuevafila)
    });
})
.catch((error)=>alert("No existe conexion"));
*/
 //------optimizado------//

// client-service.js

// --- CLIENTES ---

const listar_clientes = () => 
    fetch("http://localhost:3000/perfil")
    .then((respuesta) => respuesta.json());

const crearCliente = (nombre, email) => {
    return fetch("http://localhost:3000/perfil", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ nombre, email, id: uuid.v4() })
    });
};

const eliminarCliente = (id) => {
    return fetch(`http://localhost:3000/perfil/${id}`, {
        method: "DELETE"
    });
};

const detalleCliente = (id) => {
    return fetch(`http://localhost:3000/perfil/${id}`)
    .then((respuesta) => respuesta.json());
};

const actualizarCliente = (nombre, email, id) => {
    return fetch(`http://localhost:3000/perfil/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ nombre, email }) 
    })
    .then((respuesta) => respuesta)
    .catch((err) => console.log(err));
};

export const clientService = {
    listar_clientes,
    crearCliente,
    eliminarCliente,
    detalleCliente, 
    actualizarCliente,
};