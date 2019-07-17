import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {clone, isEmpty, pull} from 'lodash';

export default class EducacionFormal extends Component {

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
                        <div className="card w-100 mb-4">
                            <div className="flex-row justify-content-between">
                                <div className="card-body">
                                    
                                </div>
                            </div>
                        </div>
                </div>

            <div className="d-flex flex-row justify-content-end align-items-center py-4">
                <button name="experiencia" className="btn-primary-sae w-20" 
                    onClick={(evt)=>{
                        this.props.handleChangeTipo(evt);
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