import React from 'react';

const Modal = props => {
    
      function closeModal (e) {
        e.stopPropagation()
        props.closeModal()
      }

      let i = 0;
    
      let modal = (
          <div 
          className="modal-sae"
          onClick={ closeModal }>
    
            <div className="modal-content-sae"
              onClick={ e => e.stopPropagation() }>
                  <div className="modal-flex-sae">
                    <div className="modal-header text-center">
                        <h5 className="modal-title" id="exampleModalLongTitle">{props.modalInfo.type==="Experiencias"?<React.Fragment>Experiencias</React.Fragment>:<React.Fragment>Atención</React.Fragment>}</h5>
                        <span 
                            className="close-sae"
                            onClick={ closeModal }>&times;
                        </span>
                    </div>
                    <div className="modal-body pre-scrollable text-justify">
                        {props.modalInfo.data!==undefined?(
                          <div>
                            {props.modalInfo.type!=="Experiencias"?(
                            <label className="w-90 text-normal text-justify">¿Está seguro que desea {props.modalInfo.type} a {props.modalInfo.data[2]} {props.modalInfo.data[1]} como {props.modalInfo.data[3]}?</label>):
                            (<div>
                              <ul>
                                
                                {props.modalInfo.data.map((exp)=>{
                                  return (<div key={i+1}>
                                    <label className="text-success text-normal">{exp.alcance?(<span>Alcance: {exp.alcance}</span>):(<span>Requerimiento: {exp.requerimiento}</span>)}</label><br></br>
                                    <label>Empresa: {exp.nombreEmpresa}</label><br></br>
                                    <label>Cargo: {exp.cargoEjercido}</label><br></br>
                                    <label>Descripción: {exp.descripcion}</label><br></br>
                                    <hr></hr>
                                  </div>)
                                })}</ul>
                            </div>)
                            }                          
                            </div>
                        ):null
                        }
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

  export default Modal;