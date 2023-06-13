const userForm = document.getElementById('userForm');

userForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const nombre = document.getElementById('nombre').value;
  const apellido = document.getElementById('apellido').value;
  const telefono = document.getElementById('telefono').value;
  const membresia = document.getElementById('membresia').value;


  const usuario = {
    nombre,
    apellido,
    telefono,
    membresia
  };

  // Enviar solicitud POST para crear un nuevo usuario
  fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(usuario)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Usuario creado:', data);

      // Limpiar el formulario después de crear el usuario
      userForm.reset();
    })
    .catch(error => {
      console.error('Error al crear el usuario:', error);
    });
});

// Obtener todos los usuarios
function obtenerYRenderizarUsuarios() {
  fetch('/api/users')
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById('contenedorUsuarios'); // Elemento contenedor en tu página
      let html = '';

      data.forEach(item => {
        html += `<div className='col-md-12'>
        <div className='contTabla' >
          <table className="table">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Apellido</th>
                  <th scope="col">Celular</th>
                  <th scope="col">Membresía</th>
                </tr>
              </thead>
              <tbody>
              <tr>
                  <td>${item.id}</td>
                  <td>${item.nombre}</td>
                  <td>${item.apellido}</td>
                  <td>${item.celular}</td>
                  <td>${item.membresia}</td>
                  <td>
                     <Button color="danger" onclick="eliminarUsuario(${item.id})">Eliminar</Button>
                     <Button onclick="editarUsuario(${item.id})">Editar</Button>
                  </td>
              </tr>
              </tbody>
            </table>
        </div>
      </div>`;
      });
      container.innerHTML = html;

    })
    .catch(error => {
      console.error('Error al obtener los usuarios:', error);
    });
}

obtenerYRenderizarUsuarios()

// Obtener un usuario específico
fetch(`/api/users/:id`)
  .then(response => response.json())
  .then(data => {
    console.log('Usuario obtenido:', data);
  })
  .catch(error => {
    console.error('Error al obtener el usuario:', error);
  });

// // Actualizar un usuario existente
function editarUsuario(id) {
  fetch(`/api/users/${id}`)
    .then(response => response.json())
    .then(data => {
      // Mostrar un formulario de edición con los datos del usuario
      const formularioEdicion = document.createElement('form');
      formularioEdicion.innerHTML = `
      <div className="container">
      <div className='row'>
        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        EDITAR USUARIO
        </button>
          <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
           <div className="modal-dialog">
             <div className="modal-content">
               <div className="modal-body">
               <form className="p-4" id='userForm' action='/api/users' method='post'>
                 <div className="form-group">
                   <input type="text" id="nombre" value="${data.nombre}" className="form-control" placeholder="Nombre" name="nombre"/>
                 </div>
                 <div className="form-group">
                   <input type="text" id="apellido" value="${data.apellido}" className="form-control" placeholder="Apellido" name='apellido'/>
                 </div>
                 <div className="form-group">
                   <input type="tel" id="telefono" value="${data.telefono}" className="form-control" placeholder="Teléfono" name='telefono'/>
                 </div>
                 <div className="form-group">
                   <select type="select" id="membresia" value="${data.membresia}" className="form-control" name='membresia'>
                       <option value="1 clase">1 clase</option>
                       <option value="1 mes">1 mes</option>
                       <option value="3 meses">3 meses</option>
                       <option value="6 meses">6 meses</option>
                       <option value="1 año">1 año</option>
                   </select>
                 </div>
                 <Button className="btn btn-primary btn-block" onclick="guardarEdicion(${id})">
                   GUARDAR
                 </Button>
               </form>
               </div>
             </div>
           </div>
         </div>
      </div>
    </div>`

      // Reemplazar el contenido existente con el formulario de edición
      const container = document.getElementById('contenedorUsuarios');
      container.innerHTML = '';
      container.appendChild(formularioEdicion);
    })
    .catch(error => {
      console.error('Error al obtener los datos del usuario:', error);
    });
}

// Función para guardar la edición de un usuario
function guardarEdicion(id) {
  const nombre = document.getElementById('nombre').value;
  const apellido = document.getElementById('apellido').value;
  const telefono = document.getElementById('telefono').value;
  const membresia = document.getElementById('membresia').value;
  const usuarioEditado = {
    nombre,
    apellido,
    telefono,
    membresia
  };

  fetch(`/api/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(usuarioEditado)
    })
    .then(response => {
      if (response.ok) {
        console.log('Usuario editado exitosamente');
        obtenerYRenderizarUsuarios()
        // Volver a cargar la lista de usuarios después de editar
        // Puedes llamar a la función que obtiene y renderiza la lista
      }
    })
}

// Eliminar un usuario existente
function eliminarUsuario(id) {
  if (window.confirm()('¿Estás seguro de que deseas eliminar este usuario?')) {
    fetch(`/api/users/${id}`, {
        method: 'DELETE'
      })
      .then(response => {
        if (response.ok) {
          console.log('Usuario eliminado exitosamente');
          obtenerYRenderizarUsuarios()
          // Volver a cargar la lista de usuarios después de eliminar
          // Puedes llamar a la función que obtiene y renderiza la lista de usuarios nuevamente
        } else {
          console.error('Error al eliminar el usuario:', response.statusText);
        }
      })
      .catch(error => {
        console.error('Error al eliminar el usuario:', error);
      });
  }
}