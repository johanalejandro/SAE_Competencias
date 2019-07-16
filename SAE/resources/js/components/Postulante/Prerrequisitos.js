import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Header from '../common/Header'
import {clone, isEmpty, pull, isEqual} from 'lodash';
import PrerrequisitoItem from './Items/PrerrequisitoItem';

export default class Prerrequisitos extends Component {

    state={
        requerimientos: [],
        requerimientosArray: [],
        show:true,
        checkedItems: new Map(),
        validador: false,
        noValidador: false,
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

    validar=()=>{
        console.log("requerimientos validador",this.state.requerimientos);
        console.log("requerimientosArray validador",this.state.requerimientosArray);
        if(isEqual(this.state.requerimientos.length , this.state.requerimientosArray.length)){
            this.setState({
                validador: true
            });
            $('#exampleModalCenter').modal();
            console.log("TRUUUUUUE");
        }else{
            $('#exampleModalCenter').modal();
        }
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
        console.log("requerimientos seleccionados: ",this.state.requerimientosArray);
        return (
            <React.Fragment>
            {this.state.show?(
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

                                                    </ul>
                                                
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex flex-row justify-content-end align-items-center py-4">
                                <button name="prerrequisitos" className="btn-primary-sae w-20"
                                    onClick={(evt)=>{
                                        this.validar();
                                        this.props.updatePrerrequisitos(this.state.requerimientosArray);
                                        }}
                                    >Siguiente</button>
                            </div>
                        </React.Fragment>
                    ):(
                        <React.Fragment>
                            <Header title="Postulación"/>
                            <div className="containersae d-flex flex-row justify-content-center align-items-center">
                                <div className="d-flex flex-column align-items-center w-100 mx-4">
                                    <h2>Requisitos mínimos</h2>
                                    <h3>Lea con atención, debe poseer todos los requisitos a continuación para proseguir</h3>
                                    <div className="card w-100 mb-4">

                                        <div className="flex-row justify-content-between">

                                            <div className="card-body">
                                                <label className="text-center text-normal">¿Al menos tiene 2 años de experiencia en el sector, alcance, ensayo o técnica que desea postular?</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex flex-row justify-content-end align-items-center py-4">
                                <button name="prerrequisitos" className="btn-primary-sae w-20" data-toggle="modal" data-target="#expertoModal">Sí</button>
                            </div>
                        </React.Fragment>
                    )}
                </React.Fragment>
            )}
                <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                  <div className="modal-content">
                    <div className="modal-header text-center">
                      <h5 className="modal-title" id="exampleModalLongTitle">Recuerde</h5>
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                        {this.state.validador?(
                            <label className="w-90 text-normal text-justify">Más adelante deberá anexar documentos que avalen la información proporcionada previamente</label>
                        ):(
                            <label className="w-90 text-normal-danger text-justify">Debe cumplir con todas las normas para proseguir, caso contrario no puede aplicar. Más adelante debe anexar documentos que avalen esta información</label>
                        )}
                    </div>
                    <div className="modal-footer">
                        {this.state.validador?(
                            <button type="button" className="btn btn-primary-sae w-20" data-dismiss="modal" onClick={this.props.handleHojaDeVida}>Ok</button>
                        ):(
                            <button type="button" className="btn btn-secondary w-20" data-dismiss="modal">Ok</button>
                        )
                        }
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal fade" id="expertoModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                  <div className="modal-content">
                    <div className="modal-header text-center">
                      <h5 className="modal-title" id="exampleModalLongTitle">Recuerde</h5>
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                            <label className="w-90 text-normal text-justify">Más adelante deberá anexar documentos que avalen la información proporcionada previamente</label>
                    </div>
                    <div className="modal-footer">
                            <button type="button" className="btn btn-primary-sae w-20" data-dismiss="modal" onClick={this.props.handleHojaDeVida}>Ok</button>
                    </div>
                  </div>
                </div>
              </div>
            </React.Fragment>    
        );
    }
}
