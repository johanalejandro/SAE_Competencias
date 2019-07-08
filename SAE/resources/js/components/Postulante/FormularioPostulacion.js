import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Header from '../common/Header'
import SeleccionarAmbito from './SeleccionarAmbito';
import SeleccionarSector from './SeleccionarSector';
import SeleccionarAlcance from './SeleccionarAlcance';

export default class Postulacion extends Component {

    state = {
        tipo: "ambitos",
    }

    handleChangeTipo = ({target}) => {
        this.setState({
            tipo: target.id,
        })
    }

    render() {
        return (
            <React.Fragment>
            <Header title="Opciones de Postulación"/>
            <div className="d-flex flex-row" >
                <div className="d-flex flex-column align-items-center w-25">
                            <div id="ambitos" className=" d-flex card-list cardSAE-body text-normal align-items-center w-100 h-4" onClick={this.handleChangeTipo}>
                                        Ámbitos
                            </div>
                            <div id="sectores" className=" d-flex card-list cardSAE-body text-normal align-items-center w-100 h-4" onClick={this.handleChangeTipo}>
                                        Sectores
                            </div>
                            <div id="alcances" className=" d-flex card-list cardSAE-body text-normal align-items-center w-100 h-4" onClick={this.handleChangeTipo}>
                                        Alcances
                            </div>
                </div>
                    
                <div className="cardSAE containersae w-100 w-75">
                        
                    <div className="cardSAE-body">
                        {this.state.tipo === "ambitos"?(
                            <SeleccionarAmbito/>
                        ):(
                            this.state.tipo === "sectores"?(
                                <SeleccionarSector/>
                            ):(
                                <SeleccionarAlcance/>
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
