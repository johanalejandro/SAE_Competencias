import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class SeleccionarSector extends Component {

    state = {
        sectores: [],
        sectoresArray: [],
        checkedItems: new Map(),
    }

    componentWillMount(){
        /*axios.get('/api/sector').then(response =>{
            this.setState({
                sectores: response.data,
            })
        }).catch(error => {
            console.log("===ERROR: ",error);
        });*/
    }

    handleCheckBoxChange = ({target}) => {
        const sectors = this.state.sectors;
        const item = target.name;
        const id = target.id;
        const isChecked =target.checked;
        this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(item, isChecked) }));
        const sector = sectors.find((sector)=>{
            return sector.id_sector === parseInt(id);
        });
        const cloneArray = clone(this.state.sectorsArray);
        if(isChecked){
            const cloned = cloneArray.concat(sector);
            this.setState({
                sectorsArray: cloned,
            })
        }else{
            const cloned = cloneArray.filter((item) => item === sector);
            this.setState({
                sectorsArray: cloned,
            })
        }
    }

    render() {
        return(
        <React.Fragment>
        <div className="containersae d-flex flex-row justify-content-center align-items-center">
                <div className="d-flex flex-column align-items-center w-100 mx-4">
                        <h2>Sector a postular</h2>
                        <h3>Seleccione el/los  secto(es) que desea postular</h3>
                        <div className="card w-100 mb-4">

                            <div className="flex-row justify-content-between">

                                <div className="card-body">
                                    <ul className="mb-0">
                                        {/*this.state.sectors.map((sector) => (
                                            <sectorItem
                                                sector={sector}
                                                id={sector.id_sector}
                                                handlesectorChange={this.handlesectorChange}
                                                handleCheckBoxChange={this.handleCheckBoxChange}
                                                key={sector.id_sector}
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
                <button onClick={this.goToAlcance} className="btn-primary-sae w-20">Siguiente</button>
            </div>
            </React.Fragment>)
}
}

if (document.getElementById('seleccionar-sector')) {
    ReactDOM.render(<SeleccionarSector />, document.getElementById('seleccionar-sector'))};