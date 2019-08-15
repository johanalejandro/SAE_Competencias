import React , { useState }from 'react';

import Label from '../common/Label';

const ModalAsignar = props => {
    
      function closeModal (e) {
        e.stopPropagation()
        props.closeModal()
      }

      const usuarios = props.modalInfo.usuarios;
      const data = props.modalInfo.data!=undefined?props.modalInfo.data:{};
      const val= data.tipoPostulación==="Evaluador";

      const [alcance, setAlcance] = useState(data.id_alcance||0);
      const [sector, setSector] = useState(data.id_sector||0);
      const [usuario, setUsuario] = useState(data.id_usuario||0);

      let i = 0;
    
      let modal = (
          <div 
          className="modal-sae"
          onClick={ closeModal }>
    
            <div className="modal-content-sae"
              onClick={ e => e.stopPropagation() }>
                  <div className="modal-flex-sae">
                    <div className="modal-header text-center">
                        <h5 className="modal-title" id="exampleModalLongTitle">Asignar {data.tipoPostulación} padre</h5>
                        <span 
                            className="close-sae"
                            onClick={ closeModal }>&times;
                        </span>
                    </div>
                    <div className="modal-body pre-scrollable text-justify">
                    <div className="d-flex flex-row justify-content-between mb-1">
                                    <div className="d-flex flex-column w-50 mr-2">
                                        <Label name={val?"Sectores Postulados":"Alcances Postulados"}/>
                                        <select className="h-50" name={val?"sector":"alcance"} defaultValue={val?alcance:sector} onChange={(evt) => {
                                            val?setSector(evt.target.video):setAlcance(evt.target.value)
                                          }}>
                                            <option disabled value="selec">Seleccione</option>
                                            {usuarios!== undefined?(
                                              usuarios.map((usuario)=>{
                                              <option value={usario.id_usuario}>{usuario.nombre+usuario.apellido}</option>
                                            })):null}
                                            
                                        </select>

                                    </div>
                                    <div className="d-flex flex-column w-50">
                                        <Label name="Nombres"/>
                                        <select className="h-50" name="usuario" defaultValue={usuario} onChange={(evt) => setUsuario(evt.target.value)}>
                                            <option disabled value="selec">Seleccione</option>
                                            {usuarios!== undefined?(
                                              usuarios.map((usuario)=>{
                                              <option value={usario.id_usuario}>{usuario.nombre+usuario.apellido}</option>
                                            })):null}
                                            
                                        </select>
                                    </div>
                                </div>
                    </div>
                    <div className="modal-footer">
                    {props.modalInfo.type!=="Experiencias"?(
                            <React.Fragment><button type="button" className="btn btn-secondary w-20 bg-light" style={{color:'#6c757d'}} onClick={closeModal}>No</button>
                            <button type="button" className="btn btn-secondary w-20" onClick={()=>{
                                props.habilitar(props.modalInfo.data,props.modalInfo.updateValue);
                                closeModal();
                                }}>Sí</button></React.Fragment>):
                                (<button className="btn btn-secondary w-20" onClick={closeModal}>Cerrar</button>)}
                    </div>
                </div>
            </div>
    
          </div>
        )
    
        return ( props.displayModal ? modal : null);
  }

  export default ModalAsignar;