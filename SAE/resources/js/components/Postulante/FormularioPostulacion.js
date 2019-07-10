import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Header from '../common/Header'
import SeleccionarAmbito from './SeleccionarAmbito';
import SeleccionarSector from './SeleccionarSector';
import SeleccionarAlcance from './SeleccionarAlcance';

export default class Postulacion extends Component {

    state = {
        tipo: "ambitos",
        ambitosArray: [],
        sectoresArray: [],
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

    opcionesPostulacion = (ambitos,sectores,alcances) => {

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
    }

    render() {
        return (
            <React.Fragment>
            <Header title="Opciones de Postulación"/>
            <div className="d-flex flex-row" >
                <div className="d-flex flex-column align-items-center w-25">
                            {this.state.tipo === "ambitos"?(
                                <React.Fragment>
                                    <div id="ambitos" className={" d-flex card-list cardSAE-body text-normal align-items-center w-100 h-4 bg-current"}>
                                        Ámbitos
                                    </div>
                                    <div id="sectores" className=" d-flex card-list cardSAE-body text-normal align-items-center w-100 h-4" >
                                        Sectores
                                    </div>
                                    <div id="alcances" className=" d-flex card-list cardSAE-body text-normal align-items-center w-100 h-4" >
                                        Alcances
                                    </div>                                    
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
                                    <div id="alcances" className=" d-flex card-list cardSAE-body text-normal align-items-center w-100 h-4">
                                        Alcances
                                    </div>
                                </React.Fragment>

                            ):(
                                <React.Fragment>
                                    <div id="ambitos" className={" d-flex card-list cardSAE-body text-normal align-items-center w-100 h-4"}>
                                        Ámbitos
                                    </div>
                                    <div id="sectores" className=" d-flex card-list cardSAE-body text-normal align-items-center w-100 h-4 ">
                                        Sectores
                                    </div>
                                    <div id="alcances" className=" d-flex card-list cardSAE-body text-normal align-items-center w-100 h-4 bg-current">
                                        Alcances
                                    </div>
                                </React.Fragment>

                            )
                        )}
                </div>
                    
                <div className="cardSAE containersae w-100 w-75">
                        
                    <div className="cardSAE-body">
                        {this.state.tipo === "ambitos"?(
                            <SeleccionarAmbito updateAmbitos={this.updateAmbitos} handleChangeTipo={this.handleChangeTipo}/>
                        ):(
                            this.state.tipo === "sectores"?(
                                <SeleccionarSector ambitosArray={this.state.ambitosArray} handleChangeTipo={this.handleChangeTipo}/>
                            ):(
                                <SeleccionarAlcance handleChangeTipo={this.handleChangeTipo}/>
                            )
                        )}

                    </div>
                </div>
            </div>
            
            </React.Fragment>
        );
    }
}

if (document.getElementById('postulation-form')) {
    ReactDOM.render(<Postulacion />, document.getElementById('postulation-form'));
}
