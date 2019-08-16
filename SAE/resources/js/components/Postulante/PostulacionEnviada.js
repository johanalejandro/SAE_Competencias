import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Header from '../common/Header'

export default class PostulacionEnviada extends Component {

   

    render() {
        
        return (
                        <React.Fragment>
                            <Header title="Postulación"/>
                            <div className="containersae d-flex flex-column w-100 h-85">
                                <div className="d-flex flex-column align-items-center mx-2">
                                <h2>Términos y Condiciones</h2>
                                    <div className="card w-100 mb-4">

                                        <div className="flex-row justify-content-between">

                                            <div className="card-body">
                                                
                                                    <label className="h3">Formulario de aplicación enviado</label>
                                                
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </React.Fragment> 
        );
    }
}

if (document.getElementById('postulacion-enviada')) {
    ReactDOM.render(<PostulacionEnviada />, document.getElementById('postulacion-enviada'));
}
