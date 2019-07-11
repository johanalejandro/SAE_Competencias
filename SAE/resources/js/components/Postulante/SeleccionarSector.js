import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SectorItem from './SectorItem'
import {clone, isEmpty, pull} from 'lodash';

export default class SeleccionarSector extends Component {

    state = {
        sectores: [],
        sectoresArray: [],
        checkedItems: new Map(),
    }

    componentDidMount(){
        axios.get('/api/sector').then(response =>{
            const sectorsResponse = clone(response.data);
            const ambitosSeleccionados = this.props.ambitosArray;
            let sectors = [];
            const ids = ambitosSeleccionados.map((ambito) => {
                return ambito.id_ambito;
            })
            for (let index = 0; index < sectorsResponse.length; index++) {
                const sector = sectorsResponse[index];
                for (let i = 0; i < ids.length; i++) {
                    if(ids[i]===sector.id_ambito){
                        sectors.push(sector);
                    }
                }
            }
            console.log("sectores filtrados: ",sectors);
            this.setState({
                sectores: sectors,
            })
        }).catch(error => {
            console.log("===ERROR: ",error);
        });
    }

    handleCheckBoxChange = ({target}) => {
        const sectors = this.state.sectores;
        const id = target.id;
        const isChecked =target.checked;
        this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(id, isChecked) }));
        const sector = sectors.find((sector)=>{
            return sector.id_sector === parseInt(id);
        });
        const cloneArray = clone(this.state.sectoresArray);
        if(isChecked){
            const cloned = cloneArray.concat(sector);
            this.setState({
                sectoresArray: cloned,
            })
        }else{
            const cloned = pull(cloneArray,sector);
            this.setState({
                sectoresArray: cloned,
            })
        }
    }

    render() {
        console.log("sectores escogidos: ",this.state.sectoresArray);
        return(
        <React.Fragment>
        <div className="containersae d-flex flex-row justify-content-center align-items-center">
                <div className="d-flex flex-column align-items-center w-100 mx-4">
                        <h2>Sector a postular</h2>
                        <h3>Seleccione el/los  secto(es) que desea postular</h3>
                        <div className="card w-100 mb-4">

                            <div className="flex-row justify-content-between">

                                <div className="card-body">
                                    <ul className="mb-0 flex flex-row row">
                                        {!isEmpty(this.state.sectores)?(
                                            this.state.sectores.map((sector) => (
                                                <SectorItem
                                                    sector={sector}
                                                    id={sector.id_sector}
                                                    handlesectorChange={this.handlesectorChange}
                                                    handleCheckBoxChange={this.handleCheckBoxChange}
                                                    key={sector.id_sector}
                                                    checkedItems={this.state.checkedItems}
                                                />
                                            ))
                                        ):(null)
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
                        this.props.handleChangeTipo(evt);
                        this.props.updateSectores(this.state.sectoresArray);
                        }}
                    >Siguiente</button>
            </div>
            </React.Fragment>)
}
}

if (document.getElementById('seleccionar-sector')) {
    ReactDOM.render(<SeleccionarSector />, document.getElementById('seleccionar-sector'))};