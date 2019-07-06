import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Img from '../common/Img'
import Header from '../common/Header'

export default class Postulacion extends Component {

    render() {
        return (
            <React.Fragment>
            <Header title="Certificarse como evaluador y/o experto técnico"/>
            <div className="containersae d-flex flex-row justify-content-around align-items-center">
                <div className="d-flex flex-row justify-content-center align-items-center">
                    <div className="col-md-12">
                        <div className="card w-100">
                            <div className="card-header">Postular a evaluador</div>

                            <div className="flex-row justify-content-between">

                                <div className="card-body">
                                    <Img imageType="evaluador"/>
                                </div>
                                <a href="/postulacion-formulario"><button className="btn-primary-sae w-75 mb-3">Evaluador</button></a>
                                
                            </div>
                        </div>
                    </div>
                </div>

                <div className="d-flex flex-row justify-content-center align-items-center">
                    <div className="col-md-12">
                        <div className="card w-100">
                            <div className="card-header">Postular a experto</div>

                            <div className="flex-row justify-content-between">
                                <div className="card-body">
                                    <Img imageType="experto"/>
                                </div>
                                <button className="btn-primary-sae w-75 mb-3">Experto</button>
                            </div> 
                        </div>
                    </div>
                </div>

            </div>
            </React.Fragment>
        );
    }
}

if (document.getElementById('select-postulation-type')) {
    ReactDOM.render(<Postulacion />, document.getElementById('select-postulation-type'));
}
