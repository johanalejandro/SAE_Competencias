import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SectorItem from './Items/SectorItem'
import clone from 'lodash/clone';
import isEmpty from 'lodash/isEmpty';

export default class SeleccionarSector extends Component {


    componentDidMount(){

        fetch('/api/sector')
        .then(response => {
            return response.json();
        })
        .then(sectores => {
            //Fetched product is stored in the state
            const sectorsResponse = clone(sectores);
            const ambitosSeleccionados = this.props.ambitosArray;
            let sectors = [];
            const ids = ambitosSeleccionados.map((ambito) => {
                return ambito.id_ambito;
            });
            for (let index = 0; index < sectorsResponse.length; index++) {
                const sector = sectorsResponse[index];
                for (let i = 0; i < ids.length; i++) {
                    if(ids[i]===sector.id_ambito){
                        sectors.push(sector);
                    }
                }
            }
            console.log("sectores filtrados: ",sectors);
            this.props.setSectores(sectors);
        }).catch(error => {
            console.log("===ERROR: ",error);
        });

    }

    

    render() {
        console.log("sectores escogidos: ",this.props.sectoresArray);
        return(
        <React.Fragment>
                <div className="d-flex flex-column align-items-center w-100">
                        <h2>Sector a postular</h2>
                        <h3>Seleccione el/los  secto(es) que desea postular</h3>
                        <div className="card w-100 mb-4">

                            <div className="flex-row justify-content-between">

                                <div className="card-body">
                                    <ul className="mb-0 flex flex-row row">
                                        {!isEmpty(this.props.sectores)?(
                                            this.props.sectores.map((sector) => (
                                                <SectorItem
                                                    sector={sector}
                                                    id={sector.id_sector}
                                                    handleCheckBoxChange={this.props.handleCheckBoxChangeSector}
                                                    key={sector.id_sector}
                                                    checkedItems={this.props.checkedItemsSectores}
                                                />
                                            ))
                                        ):(<div>AÚN NO HAY INFORMACIÓN PARA MOSTRAR</div>)
                                        }

                                    </ul>
                                    
                                </div>
                            </div>
                        </div>
                </div>
            <div className="d-flex flex-row justify-content-end align-items-center my-4">
                {this.props.tipoPostulacion ==="?tipo=experto"?(
                    <React.Fragment>
                    <button name="ambitos" className="btn-primary-sae bg-light w-20 mr-2" style={{color:'#6c757d'}}
                    onClick={(evt)=>{
                        this.props.handleChangeTipo(evt);
                        }}
                    >Atrás</button>
                <button name="alcances" className="btn-primary-sae w-20" 
                    onClick={(evt)=>{
                        this.props.handleChangeTipo(evt);
                        }}
                    >Siguiente</button>
                    </React.Fragment>
                ):(
                    <React.Fragment>
                    <button name="ambitos" className="btn-primary-sae bg-light w-20 mr-2" style={{color:'#6c757d'}} 
                    onClick={(evt)=>{
                        this.props.handleChangeTipo(evt);
                        }}
                    >Atrás</button>
                <button name="sectores" className="btn-primary-sae w-20" 
                    onClick={(evt)=>{
                        this.props.validarSectores(evt);
                        }}
                    >Siguiente</button>
                    </React.Fragment>
                )}
            </div>
            <div className="modal fade" id="sectorModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                  <div className="modal-content">
                    <div className="modal-header text-center">
                      <h5 className="modal-title" id="exampleModalLongTitle">ATENCIÓN</h5>
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                            <label className="w-90 text-normal text-danger text-justify">No ha seleccionado ningún sector a aplicar. Debe seleccionar al menos uno</label>
                    </div>
                    <div className="modal-footer">
                            <button type="button" className="btn btn-primary-sae w-20" data-dismiss="modal" onClick={this.props.handleHojaDeVida}>Ok</button>
                    </div>
                  </div>
                </div>
              </div>
            </React.Fragment>)
}
}

if (document.getElementById('seleccionar-sector')) {
    ReactDOM.render(<SeleccionarSector />, document.getElementById('seleccionar-sector'))};