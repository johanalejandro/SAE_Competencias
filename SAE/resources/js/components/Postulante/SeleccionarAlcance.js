import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class SeleccionarSector extends Component {

    state = {
        alcances: [],
        alcancesArray: [],
        checkedItems: new Map(),
    }

    componentWillMount(){
        /*
        axios.get('/api/alcance').then(response =>{
            this.setState({
                alcances: response.data,
            })
        }).catch(error => {
            console.log("===ERROR: ",error);
        });*/
    }

    handleCheckBoxChange = ({target}) => {
        const alcances = this.state.alcances;
        const item = target.name;
        const id = target.id;
        const isChecked =target.checked;
        this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(item, isChecked) }));
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
            const cloned = cloneArray.filter((item) => item === alcance);
            this.setState({
                alcancesArray: cloned,
            })
        }
    }

    render() {
        return (
            <React.Fragment>
            <div className="containersae d-flex flex-row justify-content-center align-items-center">
                <div className="d-flex flex-column align-items-center w-100 mx-4">
                        <h2>Alcance a postular</h2>
                        <h3>Seleccione el/los  alcance(s) que desea postular</h3>
                        <div className="card w-100 mb-4">

                            <div className="flex-row justify-content-between">

                                <div className="card-body">
                                    <ul className="mb-0">
                                        {/*this.state.alcances.map((alcance) => (
                                            <alcanceItem
                                                alcance={alcance}
                                                id={alcance.id_alcance}
                                                handlealcanceChange={this.handlealcanceChange}
                                                handleCheckBoxChange={this.handleCheckBoxChange}
                                                key={alcance.id_alcance}
                                                checkedItems={this.state.checkedItems}
                                            />
                                        ))*/}

                                    </ul>
                                    
                                </div>
                            </div>
                        </div>
                </div>

            </div>
            <div className="d-flex flex-row justify-content-end align-items-center py-4">
                <button className="btn-primary-sae w-20">Siguiente</button>
                <a href="/solicitud-postulacion"><button className="btn-primary-sae w-20">Evaluador</button></a>
            </div>
            </React.Fragment>
        );
    }
}

if (document.getElementById('seleccionar-sector')) {
    ReactDOM.render(<SeleccionarSector />, document.getElementById('seleccionar-sector'))};