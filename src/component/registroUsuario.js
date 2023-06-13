import { useState, useEffect } from "react";

function Register(){
      const [records, setRecords] = useState([]);

      useEffect(() => {
        fetch('http://localhost:3001/api/tableRegistroUsuario')
          .then((res) => res.json())
          .then((data) => setRecords(data));
      }, []);

      return (
        <>
        <div className='contTabla' >
          <table class="table">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Apellido</th>
                  <th scope="col">Nacimiento</th>
                  <th scope="col">Celular</th>
                  <th scope="col">Membresía</th>
                </tr>
              </thead>
              <tbody>
              {records.map((record) => (
              <tr>
                  <td className="idUsuario" key={record.id}>{record.id}</td>
                  <td key={record.id}>{record.nombre}</td>
                  <td key={record.id}>{record.apellido}</td>
                  <td key={record.id}>{record.nacimiento}</td>
                  <td key={record.id}>{record.celular}</td>
                  <td key={record.id}>{record.membresia}</td>
              </tr>
              ))}
              </tbody>
            </table>
        </div>
        </>
      );
    }

    export default Register;




    // const { remote } = require("electron");
// const main = remote.require("server.js");

// const nombreUser = document.querySelector('#nombre');
// const apellidoUser = document.querySelector('#apellido');
// const nacimientoUser = document.querySelector('#nacimiento');
// const telUser = document.querySelector('#tel');
// const membresiasUser = document.querySelector('#membresias');
// const usersList = document.querySelector("#users");

// let users = [];
// let editingStatus = false;
// let editUserId;



//       const deleteUser = async (id) => {
//         const response = window.confirm("Quieres eleiminar este usuario?");
//         if (response) {
//           await main.deleteUser(id);
//           await getUser();
//         }
//         return;
//       };
      
//       const editUser = async (id) => {
//         const user = await main.getUserById(id);
//         nombreUser.value = user.nombre;
//         apellidoUser.value = user.apellido;
//         nacimientoUser.value = user.nacimiento;
//         telUser.value = user.tel;
//         membresiasUser.value = user.membresia;
      
//         editingStatus = true;
//         editUserId = id;
//       };

//       const form = document.querySelector('form')
//       form.addEventListener("submit", async (e) => {
//         try {
//           e.preventDefault();
      
//           const newUser = {
//             nombre: nombreUser,
//             apellido: apellidoUser,
//             nacimiento: nacimientoUser,
//             tel: telUser,
//             membresia: membresiasUser,
//           };
      
//           if (!editingStatus) {
//             const savedUser = await main.createUser(newUser);
//             console.log(savedUser);
//           } else {
//             const userUpdated = await main.updateUser(editUserId, newUser);
//             console.log(userUpdated);
      
//             editingStatus = false;
//             editUserId = "";
//           }
      
//           form.reset();
//           nombreUser.focus();
//           getUser();
//         } catch (error) {
//           console.log(error);
//         }
//       });
      

//       function renderUsers(tasks) {
//         usersList.innerHTML = "";
//         tasks.forEach((t) => {
//           usersList.innerHTML += `
//           <div className='contTabla'>
//           <table class="table">
//               <thead>
//                 <tr>
//                   <th scope="col">ID</th>
//                   <th scope="col">Nombre</th>
//                   <th scope="col">Apellido</th>
//                   <th scope="col">Nacimiento</th>
//                   <th scope="col">Celular</th>
//                   <th scope="col">Membresía</th>
//                 </tr>
//               </thead>
//               <tbody>
//               {records.map((record) => (
//               <tr>
//                   <td className="idUsuario" key={t.id}>{t.id}</td>
//                   <td key={t.id}>{t.nombre}</td>
//                   <td key={t.id}>{t.apellido}</td>
//                   <td key={t.id}>{t.nacimiento}</td>
//                   <td key={t.id}>{t.celular}</td>
//                   <td key={t.id}>{t.membresia}</td>
//               </tr>
//               <button class="btn btn-danger btn-sm" onclick="deleteUser('${t.id}')">
//                 DELETE
//               </button>
//               <button class="btn btn-secondary btn-sm" onclick="editUser('${t.id}')">
//                 EDIT 
//               </button>
//               ))}
//               </tbody>
//             </table>
//         </div>
//           `;
//         });
//       }
      
//       const getUser = async () => {
//         users = await main.getUser();
//         renderUsers(users);
//       };
      
//       async function init() {
//         getUser();
//       }
      
//       init();

// export default renderUsers()
