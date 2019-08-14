import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import AmbitoItem from './Items/AmbitoItem'
import isEmpty from 'lodash/isEmpty';

export default class SeleccionarAmbito extends Component {

    componentDidMount(){

        fetch('/api/ambito')
        .then(response => {
            return response.json();
        })
        .then(ambitos => {
            //Fetched product is stored in the state
            this.props.setAmbitos(ambitos);
        }).catch(error => {
            console.log("===ERROR: ",error);
        });
    }

    render() {
        console.log("ambitos escogidos: ",this.props.ambitosArray);
        return (
            <React.Fragment>
                <div className="d-flex flex-column align-items-center w-100">
                        <h2>Ámbito a postular</h2>
                        <h3>Seleccione el/los  ámbito(s) que desea postular</h3>
                        <div className="card w-100 mb-4">

                            <div className="flex-row justify-content-between">

                                <div className="card-body">
                                    <ul className="mb-0">
                                        {!isEmpty(this.props.ambitos)?(
                                            this.props.ambitos.map((ambito) => (
                                            <AmbitoItem
                                                ambito={ambito}
                                                id={ambito.id_ambito}
                                                handleCheckBoxChange={this.props.handleCheckBoxChangeAmbito}
                                                key={ambito.id_ambito}
                                                checkedItems={this.props.checkedItemsAmbitos}
                                            />
                                        ))):(<div>AÚN NO HAY INFORMACIÓN PARA MOSTRAR</div>)}

                                    </ul>
                                    
                                </div>
                            </div>
                        </div>
                </div>
            <div className="d-flex flex-row justify-content-end align-items-center my-4">
                <button name="sectores" className="btn-primary-sae w-20" 
                    onClick={(evt)=>{
                        this.props.handleChangeTipo(evt);
                        }}
                >Siguiente</button>
            </div>
            </React.Fragment>
        );
    }
}

if (document.getElementById('seleccionar-ambito')) {
    ReactDOM.render(<SeleccionarAmbito />, document.getElementById('seleccionar-ambito'));
}
