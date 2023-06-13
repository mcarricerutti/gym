import './App.css';
import {
  Button
} from 'reactstrap';
import './bootstrap.css'


const App = () => {
  return(
  <div className="container">
    <div className='row'>
      <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
      AGREGAR USUARIO
      </button>
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
         <div className="modal-dialog">
           <div className="modal-content">
             <div className="modal-header">
               <h4 className="modal-title fs-5 titleNewUser" id="exampleModalLabel">NUEVO USUARIO</h4>
               <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
             </div>
             <div className="modal-body">
             <form className="p-4" id='userForm' action='/api/users' method='POST'>
               <div className="form-group">
                 <input type="text" id="nombre" className="form-control" placeholder="Nombre" name="nombre"/>
               </div>
               <div className="form-group">
                 <input type="text" id="apellido" className="form-control" placeholder="Apellido" name='apellido'/>
               </div>
               <div className="form-group">
                 <input type="tel" id="telefono" className="form-control" placeholder="Teléfono" name='telefono'/>
               </div>
               <div className="form-group">
                 <select type="select" id="membresia" className="form-control" name='membresia'>
                     <option value="1 clase">1 clase</option>
                     <option value="1 mes">1 mes</option>
                     <option value="3 meses">3 meses</option>
                     <option value="6 meses">6 meses</option>
                     <option value="1 año">1 año</option>
                 </select>
               </div>
               <Button className="btn btn-primary btn-block" type='submit'>
                 Agregar
               </Button>
             </form>
             </div>
           </div>
         </div>
       </div>
    </div>
    <div id='contenedorUsuarios'>

    </div>
  </div>

    )};

    

export default App;