import React from 'react';

const Modal = props => {
    console.log(props)
    
      function closeModal (e) {
        e.stopPropagation()
        props.closeModal()
      }
    
      let modal = (
          <div 
          className="modal-sae"
          onClick={ closeModal }>
    
            <div className="modal-content-sae"
              onClick={ e => e.stopPropagation() }>
                  <div className="modal-flex-sae">
                    <div className="modal-header text-center">
                        <h5 className="modal-title" id="exampleModalLongTitle">Atención</h5>
                        <span 
                            className="close-sae"
                            onClick={ closeModal }>&times;
                        </span>
                    </div>
                    <div className="modal-body">
                        {props.modalInfo.data!==undefined?(
                            <label className="w-90 text-normal text-justify">¿Está seguro que desea {props.modalInfo.type} a {props.modalInfo.data[2]} {props.modalInfo.data[1]} como {props.modalInfo.data[3]}?</label>

                        ):null
                        }
                        <label className="w-90 text-normal text-justify"></label>
                    </div>
                    <div className="modal-footer">
                            <button type="button" className="btn btn-secondary w-20 bg-light" style={{color:'#6c757d'}} onClick={props.closeModal}>No</button>
                            <button type="button" className="btn btn-secondary w-20" onClick={()=>{
                                props.habilitar(props.modalInfo.data,props.modalInfo.updateValue);
                                closeModal();
                                }}>Sí</button>
                    </div>
                </div>
            </div>
    
          </div>
        )
    
        return ( props.displayModal ? modal : null);
  }

  export default Modal;