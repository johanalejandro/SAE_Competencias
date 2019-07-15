import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import AlcanceItem from './AlcanceItem'
import {clone, isEmpty, pull} from 'lodash';

export default class SeleccionarSector extends Component {

    state = {
        alcances: [],
        alcancesArray: [],
        checkedItems: new Map(),
    }

    componentDidMount(){
    
        fetch('/api/alcance')
        .then(response => {
            return response.json();
        })
        .then(alcance => {
            const alcancesResponse = clone(alcance);
            const sectoresSeleccionados = this.props.sectoresArray;
            let alcances = [];
            const ids = sectoresSeleccionados.map((sector) => {
                return sector.id_sector;
            })
            for (let index = 0; index < alcancesResponse.length; index++) {
                const alcance = alcancesResponse[index];
                for (let i = 0; i < ids.length; i++) {
                    if(ids[i]===alcance.id_sector){
                        alcances.push(alcance);
                    }
                }
            }
            console.log("alcances filtrados: ",alcances);
            this.setState({
                alcances: alcances,
            })
        }).catch(error => {
            console.log("===ERROR: ",error);
        });
    }

    handleCheckBoxChange = ({target}) => {
        const alcances = this.state.alcances;
        const id = target.id;
        const isChecked =target.checked;
        this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(id, isChecked) }));
        const alcance = alcances.find((alcance)=>{
            return alcance.id_alcance === parseInt(id);
        });
        const cloneArray = clone(this.state.alcancesArray);
        if(isChecked){
            const cloned = cloneArray.concat(alcance);
            this.setState({
                alcancesArray: cloned,
            })
        }else{
            const cloned = pull(cloneArray,alcance);
            this.setState({
                alcancesArray: cloned,
            })
        }
    }

    render() {
        console.log("alcances escogidos: ",this.state.alcancesArray);
        return (
            <React.Fragment>
            <div className="containersae d-flex flex-row justify-content-center align-items-center">
                <div className="d-flex flex-column align-items-center w-100 mx-4">
                        <h2>Alcance a postular</h2>
                        <h3>Seleccione el/los  alcance(s) que desea postular</h3>
                        <div className="card w-100 mb-4">

                            <div className="flex-row justify-content-between">

                                <div className="card-body">
                                    <ul className="mb-0 flex flex-row row">
                                        {!isEmpty(this.state.alcances)?(
                                            this.state.alcances.map((alcance) => (
                                                <AlcanceItem
                                                    alcance={alcance}
                                                    id={alcance.id_alcance}
                                                    handlesectorChange={this.handlesectorChange}
                                                    handleCheckBoxChange={this.handleCheckBoxChange}
                                                    key={alcance.id_alcance}
                                                    checkedItems={this.state.checkedItems}
                                                />
                                            ))
                                        ):(<div>AÚN NO HAY INFORMACIÓN PARA MOSTRAR</div>)
                                        }

                                    </ul>
                                    
                                </div>
                            </div>
                        </div>
                </div>

            </div>
            <div className="d-flex flex-row justify-content-end align-items-center py-4">
                <button name="alcances" className="btn-primary-sae w-20" 
                    onClick={(evt)=>{
                        this.props.updateAlcances(this.state.alcancesArray);
                        this.props.handleChangeTipo(evt);
                        }}
                    >Siguiente</button>
            </div>
            </React.Fragment>
        );
    }
}

if (document.getElementById('seleccionar-sector')) {
    ReactDOM.render(<SeleccionarSector />, document.getElementById('seleccionar-sector'))};