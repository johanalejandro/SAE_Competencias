import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import AlcanceItem from './Items/AlcanceItem';
import clone from 'lodash/clone';
import isEmpty from 'lodash/isEmpty';

export default class SeleccionarSector extends Component {

    state = {
        alcances: [],
        alcancesArray: [],
        checkedItems: new Map(),
    }

    componentDidMount(){
    
        fetch('/api/alcance')
        .then(response => {
            return response.json();
        })
        .then(alcance => {
            const alcancesResponse = clone(alcance);
            const sectoresSeleccionados = this.props.sectoresArray;
            let alcances = [];
            const ids = sectoresSeleccionados.map((sector) => {
                return sector.id_sector;
            })
            for (let index = 0; index < alcancesResponse.length; index++) {
                const alcance = alcancesResponse[index];
                for (let i = 0; i < ids.length; i++) {
                    if(ids[i]===alcance.id_sector){
                        alcances.push(alcance);
                    }
                }
            }
            console.log("alcances filtrados: ",alcances);
            this.props.setAlcances(alcances);
        }).catch(error => {
            console.log("===ERROR: ",error);
        });
    }

    render() {
        console.log("alcances escogidos: ",this.props.alcancesArray);
        return (
            <React.Fragment>
                <div className="d-flex flex-column align-items-center w-100">
                        <h2>Alcance a postular</h2>
                        <h3>Seleccione el/los  alcance(s) que desea postular</h3>
                        <div className="card w-100 mb-4">

                            <div className="flex-row justify-content-between">

                                <div className="card-body">
                                    <ul className="mb-0 flex flex-row row">
                                        {!isEmpty(this.props.alcances)?(
                                            this.props.alcances.map((alcance) => (
                                                <AlcanceItem
                                                    alcance={alcance}
                                                    id={alcance.id_alcance}
                                                    handleCheckBoxChange={this.props.handleCheckBoxChangeAlcance}
                                                    key={alcance.id_alcance}
                                                    checkedItems={this.props.checkedItemsAlcances}
                                                />
                                            ))
                                        ):(<div className="text-center">AÚN NO HAY INFORMACIÓN PARA MOSTRAR</div>)
                                        }

                                    </ul>
                                    
                                </div>
                            </div>
                        </div>
                </div>
            <div className="d-flex flex-row justify-content-end align-items-center my-4">
            <React.Fragment>
                    <button name="sectores" className="btn-primary-sae bg-light w-20 mr-2" style={{color:'#6c757d'}} 
                    onClick={(evt)=>{
                        this.props.handleChangeTipo(evt);
                        }}
                    >Atrás</button>
                <button name="alcances" className="btn-primary-sae w-20" 
                    onClick={(evt)=>{
                        this.props.validarAlcances(evt);
                        }}
                    >Siguiente</button>
                    </React.Fragment>
            </div>
            <div className="modal fade" id="alcancesModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                  <div className="modal-content">
                    <div className="modal-header text-center">
                      <h5 className="modal-title" id="exampleModalLongTitle">ATENCIÓN</h5>
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                            <label className="w-90 text-normal text-danger text-justify">No ha seleccionado ningún alcance a aplicar. Debe seleccionar al menos uno</label>
                    </div>
                    <div className="modal-footer">
                            <button type="button" className="btn btn-primary-sae w-20" data-dismiss="modal" onClick={this.props.handleHojaDeVida}>Ok</button>
                    </div>
                  </div>
                </div>
              </div>
            </React.Fragment>
        );
    }
}

if (document.getElementById('seleccionar-sector')) {
    ReactDOM.render(<SeleccionarSector />, document.getElementById('seleccionar-sector'))};