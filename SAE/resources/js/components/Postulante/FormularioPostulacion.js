import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Header from '../common/Header'
import SeleccionarAmbito from './SeleccionarAmbito';
import SeleccionarSector from './SeleccionarSector';
import SeleccionarAlcance from './SeleccionarAlcance';
import HojaDeVida from './HojaDeVida';
import clone from 'lodash/clone';
import pull from 'lodash/pull';
import isEmpty from 'lodash/isEmpty';


export default class FormularioPostulacion extends Component {

    state = {
        tipo: "ambitos",
        ambitos: [],
        ambitosArray: [],
        sectores: [],
        sectoresArray: [],
        alcances: [],
        alcancesArray: [],
        hojaDeVida: false,
        checkedItemsAmbitos: new Map(),
        checkedItemsSectores: new Map(),
        checkedItemsAlcances: new Map(),
    }

    handleCheckBoxChangeSector = ({target}) => {
        const sectors = this.state.sectores;
        const id = target.id;
        const isChecked =target.checked;
        this.setState(prevState => ({ checkedItemsSectores: prevState.checkedItemsSectores.set(id, isChecked) }));
        const sector = sectors.find((sector)=>{
            return sector.id_sector === parseInt(id);
        });
        const cloneArray = clone(this.state.sectoresArray);
        if(isChecked){
            const cloned = cloneArray.concat(sector);
            this.setState({
                sectoresArray: cloned,
            })
        }else{
            const cloned = pull(cloneArray,sector);
            this.setState({
                sectoresArray: cloned,
            })
        }
    }

    validarSectores = (evt) => {
        if(!isEmpty(this.state.sectoresArray)){
            $('#revisarDatosPostulacion').modal();
        }else{
            $('#sectorModal').modal();
        }
    }

    handleCheckBoxChangeAmbito = ({target}) => {
        const ambitos = this.state.ambitos;
        const item = target.name;
        const id = target.id;
        const isChecked =target.checked;
        this.setState(prevState => ({ checkedItemsAmbitos: prevState.checkedItemsAmbitos.set(item, isChecked) }));
        const ambito = ambitos.find((ambito)=>{
            return ambito.id_ambito === parseInt(id);
        });
        const cloneArray = clone(this.state.ambitosArray);
        if(isChecked){
            const cloned = cloneArray.concat(ambito);
            this.setState({
                ambitosArray: cloned,
            })
        }else{
            const cloned = pull(cloneArray,ambito);
            this.setState({
                ambitosArray: cloned,
            })
        }
    }

    handleCheckBoxChangeAlcance = ({target}) => {
        const alcances = this.state.alcances;
        const id = target.id;
        const isChecked =target.checked;
        this.setState(prevState => ({ checkedItemsAlcances: prevState.checkedItemsAlcances.set(id, isChecked) }));
        const alcance = alcances.find((alcance)=>{
            return alcance.id_alcance === parseInt(id);
        });
        const cloneArray = clone(this.state.alcancesArray);
        if(isChecked){
            const cloned = cloneArray.concat(alcance);
            this.setState({
                alcancesArray: cloned,
            })
        }else{
            const cloned = pull(cloneArray,alcance);
            this.setState({
                alcancesArray: cloned,
            })
        }
    }

    validarAlcances = (evt) => {
        if(!isEmpty(this.state.alcancesArray)){
            $('#revisarDatosPostulacion').modal();
        }else{
            $('#alcancesModal').modal();
        }
    }

    handleChangeTipo = ({target}) => {
        if(target.name){
            this.setState({
                tipo: target.name,
            })
        }
        if(target.id){
            this.setState({
                tipo: target.id,
            })
        }
    }

    opcionesPostulacion = () => {
        payloadOpciones = [];
        payloadOpciones["ambitosSeleccionados"] = this.state.ambitosArray;
        payloadOpciones["sectoresSeleccionados"]= this.state.sectoresArray;
        payloadOpciones["alcancesSeleccionados"]= this.state.alcancesArray;
        console.log("Opciones de Postulacion: ",payloadOpciones);
    }

    setAmbitos = (ambitos) =>{
        this.setState({
            ambitos: ambitos,
        })
    }

    setSectores = (sectores) =>{
        this.setState({
            sectores: sectores,
        })
    }

    setAlcances = (alcances)=>{
        this.setState({
            alcances: alcances,
        })
    }

    updateSectores = (sectores) => {
        this.setState({
            sectoresArray: sectores,
        })

        if(window.location.search ==="?tipo=evaluador"){
            this.handlePostulacion();
        }
    }

    handlePostulacion = () => {
        this.setState({
            hojaDeVida: true,
        })
    }

    render() {
        let tipo = window.location.search;
        if (tipo === "?tipo=evaluador"){
            tipo = "EVALUADOR";
        }else{
            tipo = "EXPERTO";
        }
        return (
            this.state.hojaDeVida ? (
                 <HojaDeVida 
                    ambitos={this.state.ambitosArray}
                    sectores={this.state.sectoresArray}
                    alcances={this.state.alcancesArray}
                    tipo={tipo}
                 />
              ): (
                <React.Fragment>
                    <Header title={"Opciones de Postulación "+tipo}/>
                    <div className="d-flex flex-row h-85" >
                        <div className="d-flex flex-column align-items-center w-20">
                                    {this.state.tipo === "ambitos"?(
                                        <React.Fragment>
                                            <div id="ambitos" className={" d-flex card-list cardSAE-body text-normal align-items-center w-100 h-4 bg-current"}>
                                                Ámbitos
                                            </div>
                                            <div id="sectores" className=" d-flex card-list cardSAE-body text-normal align-items-center w-100 h-4" >
                                                Sectores
                                            </div>
                                            {window.location.search==="?tipo=experto" &&(
                                            <div id="alcances" className=" d-flex card-list cardSAE-body text-normal align-items-center w-100 h-4" >
                                                Alcances
                                            </div>    
                                            )}                                
                                        </React.Fragment>
        
                                ):(
                                    this.state.tipo === "sectores"?(
                                        <React.Fragment>
                                            <div id="ambitos" className={" d-flex card-list cardSAE-body text-normal align-items-center w-100 h-4"}>
                                                Ámbitos
                                            </div>
                                            <div id="sectores" className=" d-flex card-list cardSAE-body text-normal align-items-center w-100 h-4 bg-current">
                                                Sectores
                                            </div>
                                            {window.location.search==="?tipo=experto" &&(
                                            <div id="alcances" className=" d-flex card-list cardSAE-body text-normal align-items-center w-100 h-4" >
                                                Alcances
                                            </div>    
                                            )}
                                        </React.Fragment>
        
                                    ):(
                                        <React.Fragment>
                                            <div id="ambitos" className={" d-flex card-list cardSAE-body text-normal align-items-center w-100 h-4"}>
                                                Ámbitos
                                            </div>
                                            <div id="sectores" className=" d-flex card-list cardSAE-body text-normal align-items-center w-100 h-4 ">
                                                Sectores
                                            </div>
                                            {window.location.search==="?tipo=experto" &&(
                                            <div id="alcances" className=" d-flex card-list cardSAE-body text-normal align-items-center w-100 h-4 bg-current" >
                                                Alcances
                                            </div>    
                                            )}
                                        </React.Fragment>
        
                                    )
                                )}
                        </div>
                            
                        <div className="cardSAE containersae w-100 w-80">
                                
                            <div className="cardSAE-body">
                                {this.state.tipo === "ambitos"?(
                                    <SeleccionarAmbito handleChangeTipo={this.handleChangeTipo} 
                                    ambitos={this.state.ambitos} 
                                    ambitosArray={this.state.ambitosArray} 
                                    setAmbitos={this.setAmbitos} 
                                    handleCheckBoxChangeAmbito={this.handleCheckBoxChangeAmbito} 
                                    checkedItemsAmbitos={this.state.checkedItemsAmbitos}/>
                                ):(
                                    this.state.tipo === "sectores"?(
                                        <SeleccionarSector ambitosArray={this.state.ambitosArray} 
                                        sectores={this.state.sectores} 
                                        sectoresArray={this.state.sectoresArray}
                                        handleCheckBoxChangeSector={this.handleCheckBoxChangeSector} 
                                        setSectores={this.setSectores} 
                                        tipoPostulacion={window.location.search} 
                                        updateSectores={this.updateSectores} 
                                        handleChangeTipo={this.handleChangeTipo} 
                                        checkedItemsSectores={this.state.checkedItemsSectores} 
                                        validarSectores={this.validarSectores}
                                        sectoresArray={this.state.sectoresArray}/>
                                    ):(
                                        window.location.search==="?tipo=experto" &&(
                                        <SeleccionarAlcance sectoresArray={this.state.sectoresArray}
                                        alcancesArray={this.state.alcancesArray}
                                        alcances={this.state.alcances} 
                                        setAlcances={this.setAlcances} 
                                        tipoPostulacion={window.location.search} 
                                        updateAlcances={this.updateAlcances}  
                                        handleChangeTipo={this.handleChangeTipo} 
                                        validarAlcances={this.validarAlcances} 
                                        handleCheckBoxChangeAlcance={this.handleCheckBoxChangeAlcance} 
                                        checkedItemsAlcances={this.state.checkedItemsAlcances}/>
                                        )
                                        )
                                )}
        
                            </div>
                        </div>
                    </div>

                    <div className="modal fade" id="revisarDatosPostulacion" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                  <div className="modal-content">
                    <div className="modal-header text-center">
                      <h5 className="modal-title" id="exampleModalLongTitle">ATENCIÓN</h5>
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                            <label className="w-90 text-normal text-danger text-justify">Verifique que las opciones de postulación seleccionadas son las que quiere aplicar para continuar sin inconvenientes</label>
                    </div>
                    <div className="modal-footer">
                            <button type="button" className="btn btn-primary-sae w-25" data-dismiss="modal">Ok, revisaré</button>
                            <button type="button" className="btn btn-primary-sae w-25 bg-danger" data-dismiss="modal" onClick={this.handlePostulacion}>Continuar</button>
                    </div>
                  </div>
                </div>
              </div>
                
                </React.Fragment>
               )
            
        );
    }
}

if (document.getElementById('postulation-form')) {
    ReactDOM.render(<FormularioPostulacion />, document.getElementById('postulation-form'));
}
