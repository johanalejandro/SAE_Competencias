import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Header from '../common/Header'
import {clone, isEmpty, pull, isEqual} from 'lodash';
import PrerrequisitoItem from './Items/PrerrequisitoItem';
import {PREGUNTA_EVALUADOR,PREGUNTA_EXPERTO} from '../common/constants';

export default class Prerrequisitos extends Component {

    state={
        requerimientos: [],
        requerimientosArray: [],
        show:true,
        checkedItems: new Map(),
        validador: false,
        noValidador: false,
        requisitos: false,
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
            
            await fetch('/api/requerimientosSector/'+sector)
            .then(response => {
                return response.json();
            })
            .then(requerimientos => {
                //Fetched product is stored in the state
                reqs=clone(requerimientos);
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
            requisitos: true,
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
        }else{
            $('#exampleModalCenter').modal();
        }
    }

    validarExperto=(pasa)=>{
        if (pasa){
            this.setState({
                validador: false,
            });
        }else{
            this.setState({
                validador: true,
            });
        }
        $('#expertoModal').modal();
    }

    validarEvaluador=(pasa)=>{
        
        if (pasa){
            this.setState({
                validador: false,
            });
        }else{
            this.setState({
                validador: true,
            });
        }
        $('#evaluadorModal').modal();
    }

    handlePregunta = () =>{
        this.setState({
            requisitos: false,
            experiencia: true,
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
        console.log("requerimientos seleccionados: ",this.state.requerimientosArray);
        return (
            <React.Fragment>
            {this.state.show?(
                <React.Fragment>
                    <Header title="Postulación EVALUADOR"/>
                    <div className="containersae d-flex flex-row justify-content-center h-85">
                        <div className="d-flex flex-column align-items-center w-100 mx-2">
                            <h2>Requisitos mínimos</h2>
                            <h3>Lea con atención, debe poseer todos los requisitos a continuación para proseguir</h3>
                            <div className="card w-100 mb-4">

                                        <div className="flex-row justify-content-between">

                                            <div className="card-body">
                                            
                                                
                                                
                                            </div>
                                        </div>
                                    </div>
                        </div>
                    </div>
                </React.Fragment>
            ):(
                <React.Fragment>
                    {this.props.tipo === "evaluador" && this.state.requisitos?(
                        <React.Fragment>
                            <Header title="Postulación EVALUADOR"/>
                            <div className="containersae d-flex flex-column w-100 h-85">
                                <div className="d-flex flex-column align-items-center mx-2">
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
                                <div className="d-flex flex-row justify-content-end align-items-center my-2 mx-2">
                                    <button name="prerrequisitos" className="btn-primary-sae w-20"
                                        onClick={(evt)=>{
                                            this.validar();
                                            this.props.updatePrerrequisitos(this.state.requerimientosArray);
                                            }}
                                        >Siguiente</button>
                                </div>
                            </div>
                        </React.Fragment>
                    ):(
                        this.props.tipo==="experto" && (
                        <React.Fragment>
                            <Header title="Postulación EXPERTO"/>
                            <div className="containersae d-flex flex-column w-100 h-85">
                                <div className="d-flex flex-column align-items-center mx-2">
                                    <h2>Requisitos mínimos</h2>
                                    <h3>Lea con atención, debe poseer todos los requisitos para proseguir</h3>
                                    <div className="card w-100 mb-4">

                                        <div className="flex-row justify-content-between">

                                            <div className="card-body">
                                                <label className="text-center text-normal">{PREGUNTA_EXPERTO}</label>
                                            </div>

                                            

                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex flex-row justify-content-end align-items-center w-100 my-2">
                                    <button name="prerrequisitos" className="btn-primary-sae bg-light w-20 mr-2" style={{color:'#6c757d'}} onClick={(evt)=>{
                                            this.validarExperto(false);
                                            }}>No</button>
                                    <button name="prerrequisitos" className="btn-primary-sae w-20" onClick={(evt)=>{
                                            this.validarExperto(true);
                                            }}>Sí</button>
                                </div>
                            </div>
                        </React.Fragment>)
                    )}
                </React.Fragment>
            )}
            {this.state.experiencia && (
                <React.Fragment>
                <Header title="Postulación EVALUADOR"/>
                <div className="containersae d-flex flex-column w-100 h-85">
                    <div className="d-flex flex-column align-items-center mx-2">
                        <h2>Requisitos mínimos</h2>
                        <h3>Lea con atención, debe poseer todos los requisitos para proseguir</h3>
                        <div className="card w-100 mb-4">

                            <div className="flex-row justify-content-between">

                                <div className="card-body">
                                    <label className="text-center text-normal">{PREGUNTA_EVALUADOR}</label>
                                </div>

                                

                            </div>
                        </div>
                    </div>
                    <div className="d-flex flex-row justify-content-end align-items-center w-100 my-2">
                        <button name="prerrequisitos" className="btn-primary-sae bg-light w-20 mr-2" style={{color:'#6c757d'}} onClick={(evt)=>{
                                this.validarEvaluador(false);
                                }}>No</button>
                        <button name="prerrequisitos" className="btn-primary-sae w-20" onClick={(evt)=>{
                                this.validarEvaluador(true);
                                }}>Sí</button>
                    </div>
                </div>
            </React.Fragment>
            )}
                <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                  <div className="modal-content">
                    <div className={this.state.validador?"modal-header text-center":"modal-header  bg-danger text-center"}>
                      <h5 className={this.state.validador?"modal-title":"modal-title text-white"} id="exampleModalLongTitle">ATENCIÓN</h5>
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
                            <button type="button" className="btn btn-primary-sae w-20" data-dismiss="modal" onClick={this.handlePregunta}>Ok</button>
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
                    <div className={!this.state.validador?"modal-header text-center":"modal-header  bg-danger text-center"}>
                      <h5 className={!this.state.validador?"modal-title":"modal-title text-white"}  id="exampleModalLongTitle">Recuerde</h5>
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                        {this.state.validador?(
                            <label className="w-90 text-normal-danger text-justify">No cuenta con la experiencia necesaria. No puede proseguir la postulación</label>
                        ):(
                            <label className="w-90 text-normal text-justify">Más adelante deberá anexar documentos que avalen la información proporcionada previamente</label>
                        )}
                    </div>
                    <div className="modal-footer">
                        {this.state.validador?(
                            <a className="w-20" href="/postulacion-formulario?tipo=experto"><button type="button" className="btn btn-primary-sae w-100">Ok</button></a>
                        ):(
                            <button type="button" className="btn btn-primary-sae w-20" data-dismiss="modal" onClick={this.props.handleHojaDeVida}>Ok</button>
                        )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal fade" id="evaluadorModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                  <div className="modal-content">
                    <div className={!this.state.validador?"modal-header text-center":"modal-header  bg-danger text-center"}>
                      <h5 className={!this.state.validador?"modal-title":"modal-title text-white"}  id="exampleModalLongTitle">Recuerde</h5>
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                        {this.state.validador?(
                            <label className="w-90 text-normal-danger text-justify">No cuenta con la experiencia necesaria. No puede proseguir la postulación</label>
                        ):(
                            <label className="w-90 text-normal text-justify">Más adelante deberá anexar documentos que avalen la información proporcionada previamente</label>
                        )}
                    </div>
                    <div className="modal-footer">
                        {this.state.validador?(
                            <a className="w-20" href="/postulacion-formulario?tipo=evaluador"><button type="button" className="btn btn-primary-sae w-100">Ok</button></a>
                        ):(
                            <button type="button" className="btn btn-primary-sae w-20" data-dismiss="modal" onClick={
                                ()=>{
                                    this.props.handleHojaDeVida();
                                    this.setState({
                                        experiencia: false,
                                    })
                                }}>Ok</button>
                        )}
                    </div>
                  </div>
                </div>
              </div>
            </React.Fragment>    
        );
    }
}
