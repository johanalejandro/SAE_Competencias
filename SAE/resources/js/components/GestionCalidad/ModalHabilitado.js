import React,{ Component } from 'react';
export default class ModalFinalizado extends Component {

  closeModal = (e,prevent = false) => {
    prevent?e.persist():e.stopPropagation()
    location.reload();
  }

      render () {
      const tipo = this.props.modalInfo==="evaluadores"?"Evaluador":"Experto";
      return (
          <div 
          className="modal-sae"
          onClick={ this.closeModal }>
    
            <div className="modal-content-sae modal-exito"
              onClick={ e => e.stopPropagation() }>
                  <div className="modal-flex-sae">
                    <div className="modal-header text-center">
                        <h5 className="modal-title text-success" id="exampleModalLongTitle">Éxito</h5>
                        <span 
                            className="close-sae"
                            onClick={ this.closeModal }>&times;
                        </span>
                    </div>
                    <div className="modal-body text-justify">
                        Ha habilitado un postulante como {tipo} con éxito
                    </div>
                
                    <div className="modal-footer">
                            <button type="button" className="btn btn-secondary bg-success w-20" onClick={(e)=>{this.closeModal(e,true)}}>OK</button>
                    </div>
                </div>
            </div>
    
          </div>
        )
      }
  }