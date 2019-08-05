import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Header from '../common/Header'
import SeleccionarAmbito from './SeleccionarAmbito';
import SeleccionarSector from './SeleccionarSector';
import SeleccionarAlcance from './SeleccionarAlcance';
import HojaDeVida from './HojaDeVida';

export default class FormularioPostulacion extends Component {

    state = {
        tipo: "ambitos",
        ambitosArray: [],
        sectoresArray: [],
        alcancesArray: [],
        hojaDeVida: false,
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

    updateAmbitos = (ambitos) => {
        this.setState({
            ambitosArray: ambitos,
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

    updateAlcances = async (alcances) => {
        await this.setState({
            alcancesArray: alcances,
        })

        this.handlePostulacion();
    }

    handlePostulacion = () => {
        this.setState({
            hojaDeVida: true,
        })
    }

    render() {
        return (
            this.state.hojaDeVida ? (
                 <HojaDeVida 
                    ambitos={this.state.ambitosArray}
                    sectores={this.state.sectoresArray}
                    alcances={this.state.alcancesArray}
                    tipo={window.location.search}
                 />
              ): (
                <React.Fragment>
                    <Header title="Opciones de Postulación"/>
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
                                            <div id="alcances" className=" d-flex card-list cardSAE-body text-normal align-items-center w-100 h-4" >
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
                                    <SeleccionarAmbito updateAmbitos={this.updateAmbitos} handleChangeTipo={this.handleChangeTipo}/>
                                ):(
                                    this.state.tipo === "sectores"?(
                                        <SeleccionarSector ambitosArray={this.state.ambitosArray} tipoPostulacion={window.location.search} updateSectores={this.updateSectores} handleChangeTipo={this.handleChangeTipo}/>
                                    ):(
                                        window.location.search==="?tipo=experto" &&(
                                        <SeleccionarAlcance sectoresArray={this.state.sectoresArray} tipoPostulacion={window.location.search} updateAlcances={this.updateAlcances}  handleChangeTipo={this.handleChangeTipo}/>
                                        )
                                        )
                                )}
        
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
