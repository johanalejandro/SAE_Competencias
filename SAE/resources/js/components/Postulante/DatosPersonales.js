import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Label from '../common/Label';
import {clone, isEmpty, pull} from 'lodash';

export default class DatosPersonales extends Component {

    state = {
        ambitos: [],
        ambitosArray: [],
        checkedItems: new Map(),
    }

    /*componentDidMount(){

        fetch('/api/ambito')
        .then(response => {
            return response.json();
        })
        .then(ambitos => {
            //Fetched product is stored in the state
            this.setState({ ambitos });
        }).catch(error => {
            console.log("===ERROR: ",error);
        });
    }*/

    /*handleCheckBoxChange = ({target}) => {
        const ambitos = this.state.ambitos;
        const item = target.name;
        const id = target.id;
        const isChecked =target.checked;
        this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(item, isChecked) }));
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
    }*/

    render() {
        //console.log("ambitos escogidos: ",this.state.ambitosArray);
        return (
            <React.Fragment>
            <div className="containersae d-flex flex-row justify-content-center align-items-center">
                <div className="d-flex flex-column align-items-center w-100 mx-4">
                        <h2>Datos Generales</h2>
                        <div className="w-100 mb-2 p-1">
                            <h3>Documento</h3>
                                <div className="d-flex flex-row justify-content-between">
                                    <div className="d-flex flex-column w-50 mr-1">
                                        <Label name="Tipo"/>
                                        <select className="h-50" defaultValue="selec">
                                            <option disabled value="selec">Seleccione</option>
                                            <option value="cedula">Cédula</option>
                                            <option value="pasaporte">Pasaporte</option>
                                        </select>
                                    </div>
                                    <div className="d-flex flex-column w-50 mr-1">
                                        <Label name="Identificación"/>
                                        <input type="text" className="h-50"></input>
                                    </div>
                                </div>
                        </div>
                        <div className="w-100 mb-2 p-1">
                            <h3>Información Personal</h3>
                                <div className="d-flex flex-row justify-content-between mb-1">
                                    <div className="d-flex flex-column w-50 mr-1">
                                        <Label name="Apellidos"/>
                                        <input type="text" className="h-50"></input>

                                    </div>
                                    <div className="d-flex flex-column w-50 mr-1">
                                        <Label name="Nombres"/>
                                        <input type="text" className="h-50"></input>
                                    </div>
                                </div>
                                <div className="d-flex flex-row justify-content-between mb-1">
                                    <div className="d-flex flex-column w-50 mr-1">
                                        <Label name="Fecha de Nacimiento"/>
                                        <input type="date" className="h-50"></input>

                                    </div>
                                    <div className="d-flex flex-column w-50 mr-1">
                                        <Label name="Género"/>
                                        <select className="h-50" defaultValue="selec">
                                            <option disabled value="selec">Seleccione</option>
                                            <option value="masculino">Masculino</option>
                                            <option value="femenino">Femenino</option>
                                            <option value="otro">Otro</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="d-flex flex-row justify-content-between mb-1">
                                    <div className="d-flex flex-column w-50 mr-1">
                                        <Label name="Correo Electrónico"/>
                                        <input type="email"  className="h-50"></input>

                                    </div>
                                    <div className="d-flex flex-column w-50 mr-1">
                                        <Label name="Estado Civil"/>
                                        <select className="h-50" defaultValue="selec">
                                            <option disabled value="selec">Seleccione</option>
                                            <option value="soltero">Soltero/a</option>
                                            <option value="casado">Casado/a</option>
                                            <option value="divorciado">Divorciado/a</option>
                                            <option value="union">Unión Libre</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="d-flex flex-row justify-content-between mb-1">
                                    <div className="d-flex flex-column w-50 mr-1">
                                        <Label name="Teléfono Fijo"/>
                                        <input type="tel"  className="h-50"></input>

                                    </div>
                                    <div className="d-flex flex-column w-50 mr-1">
                                        <Label name="Teléfono Celular"/>
                                        <input type="tel"  className="h-50"></input>
                                    </div>
                                </div>
                                <div className="d-flex flex-row justify-content-between mb-1">
                                    <div className="d-flex flex-column w-50 mr-1">
                                        <Label name="País"/>
                                        <input type="text"  className="h-50"></input>

                                    </div>
                                    <div className="d-flex flex-column w-50 mr-1">
                                        <Label name="Provincia"/>
                                        <input type="text"  className="h-50"></input>
                                    </div>
                                </div>
                                <div className="d-flex flex-row justify-content-between mb-1">
                                    <div className="d-flex flex-column w-50 mr-1">
                                        <Label name="Dirección"/>
                                        <input type="text"  className="h-50"></input>

                                    </div>
                                    <div className="d-flex flex-column w-50 mr-1">
                                        <Label name="Disponibilidad para viajar"/>
                                        <select className="h-50" defaultValue="selec">
                                            <option disabled value="selec">Seleccione</option>
                                            <option value="si">Si</option>
                                            <option value="no">No</option>
                                        </select>
                                    </div>
                                </div>
                        </div>
                </div>

            </div>
            <div className="d-flex flex-row justify-content-end align-items-center py-4">
                <button name="educacion" className="btn-primary-sae w-20" 
                    onClick={(evt)=>{
                        this.props.handleChangeTipo(evt);
                        }}
                >Siguiente</button>
            </div>
            </React.Fragment>
        );
    }
}

if (document.getElementById('datos-personales')) {
    ReactDOM.render(<DatosPersonales />, document.getElementById('datos-personales'));
}
