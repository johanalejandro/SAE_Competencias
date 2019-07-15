import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Header from '../common/Header'
import {clone, isEmpty, pull} from 'lodash';
import PrerrequisitoItem from './PrerrequisitoItem';

export default class Prerrequisitos extends Component {

    state={
        requerimientos: [],
        requerimientosArray: [],
        show:true,
        checkedItems: new Map(),
    }

    componentDidMount = async () =>{
        const sectores = this.props.sectores;
        let reqs =[];
        let alcances = [];
        const ids = sectores.map((sector) => {
            return sector.id_sector;
        })
        for (let index = 0; index < ids.length; index++) {
            const sector = ids[index];
            
            await fetch('/api/sector/'+sector)
            .then(response => {
                return response.json();
            })
            .then(requerimientos => {
                //Fetched product is stored in the state
                console.log("req",requerimientos);
                reqs.push(requerimientos);
            }).catch(error => {
                console.log("===ERROR: ",error);
            });
        }
        await this.setState({
            requerimientos: reqs,
        });

        await this.renderize();

    }

    renderize = () =>{
        this.setState({
            show:false,
        })
    }



    handleCheckBoxChange = ({target}) => {
        const reqs = this.state.requerimientos;
        const id = target.id;
        const isChecked =target.checked;
        this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(id, isChecked) }));
        const requerimiento = reqs.find((req)=>{
            return req.id_sector_requerimiento === parseInt(id);
        });
        const cloneArray = clone(this.state.requerimientosArray);
        if(isChecked){
            const cloned = cloneArray.concat(requerimiento);
            this.setState({
                requerimientosArray: cloned,
            })
        }else{
            const cloned = pull(cloneArray,requerimiento);
            this.setState({
                requerimientosArray: cloned,
            })
        }
    }

    render() {
        console.log("requerimientos seleccionados: ",this.state.alcancesArray);
        return (
            this.state.show?(
                <React.Fragment>
                    <Header title="Postulación"/>
                    <div className="containersae d-flex flex-row justify-content-center align-items-center">
                        <div className="d-flex flex-column align-items-center w-100 mx-4">
                            <h2>Requisitos mínimos</h2>
                            <h3>Lea con atención, debe poseer todos los requisitos a continuación para proseguir</h3>
                        </div>
                    </div>
                </React.Fragment>
            ):(
                <React.Fragment>
                    {this.props.tipo === "evaluador"?(
                        <React.Fragment>
                            <Header title="Postulación"/>
                            <div className="containersae d-flex flex-row justify-content-center align-items-center">
                                <div className="d-flex flex-column align-items-center w-100 mx-4">
                                    <h2>Requisitos mínimos</h2>
                                    <h3>Lea con atención, debe poseer todos los requisitos a continuación para proseguir</h3>
                                    <div className="card w-100 mb-4">

                                        <div className="flex-row justify-content-between">

                                            <div className="card-body">
                                                
                                                    <ul className="mb-0 flex flex-row row">
                                                        {!isEmpty(this.state.requerimientos)?(
                                                            this.state.requerimientos.map((req) => (
                                                                <PrerrequisitoItem
                                                                    requerimiento={req}
                                                                    id={req.id_sector_requerimiento}
                                                                    handleCheckBoxChange={this.handleCheckBoxChange}
                                                                    key={req.id_sector_requerimiento}
                                                                    checkedItems={this.state.checkedItems}
                                                                />
                                                            ))
                                                        ):(<div>AÚN NO HAY INFORMACIÓN PARA MOSTRAR</div>)
                                                        }

                                                    </ul>)
                                                
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </React.Fragment>
                    ):(
                        <React.Fragment>
                            <Header title="Prerrequisitos Mínimos"/>
                            <div className="cardSAE containersae w-100 w-75">
                            <div className="cardSAE-body">EXPERTO</div>
                            </div>
                        </React.Fragment>
                    )}
                </React.Fragment>
            )
                
        );
    }
}
