import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Label from '../common/Label';

export default class DatosPersonales extends Component {

    constructor(props) {
        super(props);
      }

    /*handleSubmit = (e) => {
        //preventDefault prevents page reload   
        e.preventDefault();
        /*A call back to the onAdd props. The current
         *state is passed as a param
         *
        this.props.handlePostulante();
}*/

    render() {
        //console.log("ambitos escogidos: ",this.state.ambitosArray);
        return (
            <React.Fragment>
            <div className="containersae d-flex flex-column justify-content-center align-items-center">
                        <h2>Datos Generales</h2>
                        <div className="w-100 mb-2">
                            <h3>Documento</h3>
                                <div className="d-flex flex-row justify-content-between w-65">
                                    <div className="d-flex flex-column w-50 mr-4">
                                        <Label name="Tipo"/>
                                        <select className="h-50" name="tipoId" defaultValue={this.props.tipoId} onChange={this.props.handleChange}>
                                            <option disabled value="selec">Seleccione</option>
                                            <option value="cedula">Cédula</option>
                                            <option value="pasaporte">Pasaporte</option>
                                        </select>
                                    </div>
                                    <div className="d-flex flex-column w-50">
                                        <Label name="Identificación"/>
                                        <input type="text" className="h-50" name="identificacion" defaultValue={this.props.identificacion} onChange={this.props.handleChange}></input>
                                    </div>
                                </div>
                        </div>
                        <div className="w-100 mb-2">
                            <h3>Información Personal</h3>
                                <div className="d-flex flex-row justify-content-between mb-1">
                                    <div className="d-flex flex-column w-30 mr-2">
                                        <Label name="Apellidos"/>
                                        <input type="text" className="h-50" name="apellidos" defaultValue={this.props.apellidos} onChange={this.props.handleChange}></input>

                                    </div>
                                    <div className="d-flex flex-column w-30 mr-2">
                                        <Label name="Nombres"/>
                                        <input type="text" className="h-50" name="nombres" defaultValue={this.props.nombres} onChange={this.props.handleChange}></input>
                                    </div>
                                    <div className="d-flex flex-column w-30">
                                        <Label name="Fecha de Nacimiento"/>
                                        <input type="date" className="h-50" name="fechaNacimiento" defaultValue={this.props.fechaNacimiento} onChange={this.props.handleChange}></input>

                                    </div>
                                </div>
                                <div className="d-flex flex-row justify-content-between mb-1">
                                    <div className="d-flex flex-column w-30 mr-2">
                                        <Label name="Correo Electrónico"/>
                                        <input type="email" name="correo" className="h-50" defaultValue={this.props.correo} onChange={this.props.handleChange}></input>

                                    </div>
                                    <div className="d-flex flex-column w-30 mr-2">
                                        <Label name="Teléfono"/>
                                        <input type="tel" name="telefono" className="h-50" defaultValue={this.props.telefono} onChange={this.props.handleChange}></input>

                                    </div>
                                    <div className="d-flex flex-column w-30">
                                        <Label name="Dirección"/>
                                        <input type="text" name="direccion"  className="h-50" defaultValue={this.props.direccion} onChange={this.props.handleChange}></input>

                                    </div>
                                </div>
                                <div className="d-flex flex-row justify-content-between mb-1">
                                    
                                    <div className="d-flex flex-column w-30 mr-2">
                                        <Label name="Provincia"/>
                                        <input type="text" name="provincia" className="h-50" defaultValue={this.props.provincia} onChange={this.props.handleChange}></input>
                                    </div>
                                    <div className="d-flex flex-column w-30 mr-2">
                                        <Label name="Ciudad"/>
                                        <input type="text" name="ciudad" className="h-50" defaultValue={this.props.ciudad} onChange={this.props.handleChange}></input>

                                    </div>
                                    <div className="d-flex flex-column w-30">
                                    <label className="w-100 text-left text-normal h-50">Disponibilidad para viajar</label>
                                        <select className="h-50" name="disponibilidad" defaultValue={this.props.disponibilidad} onChange={this.props.handleChange}>
                                            <option disabled value="selec">Seleccione</option>
                                            <option value="1">Si</option>
                                            <option value="0">No</option>
                                        </select>
                                    </div>
                                    
                                </div>
                        </div>

            </div>
            {this.props.agregado &&(
            <div className="d-flex flex-row justify-content-end align-items-center bg-success">
                <label className="text-center text-white text-normal">Postulante agregado con éxito</label>
            </div>)}
            <div className="d-flex flex-row justify-content-end align-items-center py-4 px-3">
                <button name="educacion" className="btn-primary-sae w-20" 
                    onClick={(evt)=>{
                        this.props.handleChangeTipo(evt);}
                    }
                >Siguiente</button>
            </div>
            </React.Fragment>
        );
    }
}

if (document.getElementById('datos-personales')) {
    ReactDOM.render(<DatosPersonales />, document.getElementById('datos-personales'));
}
