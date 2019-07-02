import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Img from '../common/Img'
import Header from '../common/Header'

export default class SeleccionarAmbito extends Component {

    render() {
        return (
            <React.Fragment>
            <Header title="Opciones de Postulación"/>
            <div className="containersae d-flex flex-row justify-content-center align-items-center">
                <div className="d-flex flex-column align-items-center w-100 mx-4">
                        <h2>Ámbito a postular</h2>
                        <h3>Seleccione el/los  ámbito(s) que desea postular</h3>
                        
                        <div className="card w-100">

                            <div className="flex-row justify-content-between">

                                <div className="card-body">
                                    <Img imageType="evaluador"/>
                                </div>
                                <button onClick={this.goToEvaluador} className="btn-primary-sae w-75 mb-3">Evaluador</button>
                            </div>
                        </div>
                </div>

            </div>
            </React.Fragment>
        );
    }
}

if (document.getElementById('seleccionar-ambito')) {
    ReactDOM.render(<SeleccionarAmbito />, document.getElementById('seleccionar-ambito'));
}
