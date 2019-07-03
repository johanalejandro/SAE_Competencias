import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Img from '../common/Img';
import Header from '../common/Header';
import axios from 'axios';
import AmbitoItem from './AmbitoItem'
import {clone} from 'lodash';

export default class SeleccionarAmbito extends Component {

    state = {
        ambitos: [],
        ambitosArray: [],
        checkedItems: new Map(),
    }

    componentWillMount(){
        axios.get('/api/ambito').then(response =>{
            this.setState({
                ambitos: response.data,
            })
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
            const cloned = cloneArray.filter((item) => item === ambito);
            this.setState({
                ambitosArray: cloned,
            })
        }
    }

    render() {

        return (
            <React.Fragment>
            <Header title="Opciones de Postulación"/>
            <div className="containersae d-flex flex-row justify-content-center align-items-center">
                <div className="d-flex flex-column align-items-center w-100 mx-4">
                        <h2>Ámbito a postular</h2>
                        <h3>Seleccione el/los  ámbito(s) que desea postular</h3>
                        <div className="card w-100 mb-4">

                            <div className="flex-row justify-content-between">

                                <div className="card-body">
                                    <ul className="mb-0">
                                        {this.state.ambitos.map((ambito) => (
                                            <AmbitoItem
                                                ambito={ambito}
                                                id={ambito.id_ambito}
                                                handleAmbitoChange={this.handleAmbitoChange}
                                                handleCheckBoxChange={this.handleCheckBoxChange}
                                                key={ambito.id_ambito}
                                                checkedItems={this.state.checkedItems}
                                            />
                                        ))}

                                    </ul>
                                    
                                </div>
                            </div>
                        </div>
                </div>

            </div>
            <div className="d-flex flex-row justify-content-end align-items-center py-4">
                <button onClick={this.goToSector} className="btn-primary-sae w-20">Siguiente</button>
            </div>
            </React.Fragment>
        );
    }
}

if (document.getElementById('seleccionar-ambito')) {
    ReactDOM.render(<SeleccionarAmbito />, document.getElementById('seleccionar-ambito'));
}
