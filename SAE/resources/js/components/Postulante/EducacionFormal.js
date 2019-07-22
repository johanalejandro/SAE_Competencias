import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {clone, isEmpty, pull} from 'lodash';
import Label from '../common/Label';

export default class EducacionFormal extends Component {

    constructor(props) {
        super(props);
      }

    handleSubmit = (e) => {
        //preventDefault prevents page reload   
        e.preventDefault();
        /*A call back to the onAdd props. The current
         *state is passed as a param
         */
        this.props.handlePostulante();
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
    }

    handleCheckBoxChange = ({target}) => {
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
                <div className="d-flex flex-column align-items-center w-100">
                        <h2>Educación Formal</h2>
                        <div className="w-100 mb-2">
                                <div className="d-flex flex-row justify-content-between w-65">
                                   
                                    <div className="d-flex flex-column w-50">
                                        <Label name="Institución"/>
                                        <input type="text" className="h-50" name="nombreInstitucion" defaultValue={this.props.nombreInstitucion} onChange={this.props.handleChange}></input>
                                    </div>
                                </div>
                                <div className="d-flex flex-row justify-content-between w-65">
                                   
                                    <div className="d-flex flex-column w-50">
                                        <Label name="Título Obtenido"/>
                                        <input type="text" className="h-50" name="tituloObtenido" defaultValue={this.props.tituloObtenido} onChange={this.props.handleChange}></input>
                                    </div>
                                </div>
                                <div className="d-flex flex-column w-50 mr-4">
                                        <Label name="Tipo de Formación"/>
                                        <select className="h-50" name="tipoFormacion" defaultValue={this.props.tipoFormacion} onChange={this.props.handleChange}>
                                            <option disabled value="selec">Seleccione</option>
                                            <option value="Tercer Nivel">Tercer Nivel</option>
                                            <option value="Cuarto Nivel">Cuarto Nivel</option>
                                            <option value="Doctorado(PHD)">Doctorado(PHD)</option>
                                        </select>
                                    </div>
                        </div>
                </div>

            <div className="d-flex flex-row justify-content-end align-items-center py-4">
                <button name="experiencia" className="btn-primary-sae w-20" 
                    onClick={(evt)=>{
                        this.handleSubmit(evt);
                        //this.props.handleChangeTipo(evt);
                        }}
                >Siguiente</button>
            </div>
            </React.Fragment>
        );
    }
}

if (document.getElementById('educacion-formal')) {
    ReactDOM.render(<EducacionFormal />, document.getElementById('educacion-formal'));
}
