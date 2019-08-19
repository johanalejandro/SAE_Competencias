import React,{ Component } from 'react';

import Label from '../common/Label';
import isEmpty from 'lodash/isEmpty';
import axios from 'axios';

export default class Modal extends Component {

      state = {
        detalleEvaluacion: "",
        resultadoEvaluacion: "selec",
        tipoEvaluacion: "selec",
      }

      componentDidMount=async()=>{
          if(this.props.modalInfo.data!== undefined && this.props.modalInfo.type==="Experto"){
            const id = this.props.modalInfo.data[11]
            await axios.get("api/verSolicitudEvaluacion/"+id)
          .then(({data})=>{
            console.log(data);
            this.setState({
              detalleEvaluacion: data.detalleEvaluacion===null?"":data.detalleEvaluacion,
              resultadoEvaluacion: data.resultadoEvaluacion,
              tipoEvaluacion: data.tipoEvaluacion===null?"selec":data.tipoEvaluacion,
            })
          })
          .catch(console.error);
          }
          
      }

    
       closeModal = (e,prevent = false) => {
        prevent?e.persist():e.stopPropagation()
        this.props.closeModal()
      }

      handleChange = (evt) =>{
        const name= evt.target.name;
        const value= evt.target.value;
        this.setState({
            [name]: value,
        });
      }

      render () {
        let i = 0;
        const data = this.props.modalInfo.data!== undefined?this.props.modalInfo.data:[];
        const type = this.props.modalInfo.type;
        const finalizar = this.state.resultadoEvaluacion!=="selec" && this.state.resultadoEvaluacion!=="Pendiente";
        
      return (<div 
        className="modal-sae"
        onClick={ this.closeModal }>
  
          <div className="modal-content-sae modal-evaluar"
            onClick={ e => e.stopPropagation() }>
                <div className="modal-flex-sae">
                  <div className="modal-header text-center">
                      <h5 className="modal-title text-info" id="exampleModalLongTitle">Evaluar como Postulante a {type}</h5>
                      <span 
                          className="close-sae"
                          onClick={ this.closeModal }>&times;
                      </span>
                  </div>
                  <div className="modal-body pre-scrollable text-justify">
                    <h6>Datos Generales</h6>
                    <div className="d-flex flex-row justify-content-between mb-1">
                      <Label name={"Postulante: "+data[2]+" "+data[1]} className="w-100"/>
                      <Label name={"ID: "+data[0]} className="w-100"/>
                    </div>
                    <div className="d-flex flex-row justify-content-between mb-1">
                      <Label name={"Identificación: "+data[4]} className="w-100"/>
                      <Label name={"Correo: "+data[5]} className="w-100"/>
                    </div>
                    <React.Fragment>
                      {type==="Evaluador"&&(
                        <React.Fragment>
                          <hr></hr>
                          <h6>Información de Curos</h6>
                          <React.Fragment>
                            {data[6].map((experiencia)=>{
                              return <div key={experiencia.id_alcance} className="d-flex flex-column align-items-between mb-1">
                                <Label name={"Alcance Relacionado: "+experiencia.alcance} className="w-100"/>
                                <Label name={"Empresa: "+experiencia.nombreEmpresa} className="w-100"/>
                                <Label name={"Cargo: "+experiencia.cargoEjercido} className="w-100"/>
                                <Label name={"Descripción: "+experiencia.descripcion} className="w-100"/>
                              </div>
                            })}
                          </React.Fragment>
                        </React.Fragment>
                        )}
                        <div className="d-flex flex-row justify-content-between">
                      <hr></hr>
                      <div className="d-flex flex-column align-items-between w-50 mb-1">
                      <h6>Experiencias</h6>
                      {type==="Experto"?(
                        data[6].map((experiencia)=>{
                          return <div key={experiencia.id_alcance} className="d-flex flex-column align-items-between  mb-1">
                            <Label name={"Alcance Relacionado: "+experiencia.alcance} className="w-100"/>
                            <Label name={"Empresa: "+experiencia.nombreEmpresa} className="w-100"/>
                            <Label name={"Cargo: "+experiencia.cargoEjercido} className="w-100"/>
                            <Label name={"Descripción: "+experiencia.descripcion} className="w-100"/>
                          </div>
                        })
                      ):null
                      }
                      </div>
                      <div className="d-flex flex-column align-items-between w-50 mb-1">
                        <h6>Educación Formal</h6>
                        {!isEmpty(data)?(
                            <div className="d-flex flex-column align-items-between">
                              <Label name={"Institución: "+data[7].nombreInstitucion} className="w-100"/>
                              <Label name={"Nivel de Instrucción: "+data[7].tipoFormacion} className="w-100"/>
                              <Label name={"Título: "+data[7].tituloObtenido} className="w-100"/>
                            </div>
                            ):null
                          }
                        </div>
                        </div>
                      <hr></hr>
                      <h6>Evaluación</h6>
                      <div className="d-flex flex-row justify-content-between align-items-start mb-1">
                        <select name="tipoEvaluacion" className="h-25 mr-2" value={this.state.tipoEvaluacion} onChange={this.handleChange}> 
                          <option disabled value="selec">Seleccione</option>
                          <option value="Entrevista">Entrevista</option>
                          <option value="Prueba">Prueba</option>
                        </select>
                        <textarea name="detalleEvaluacion" className="w-100 mr-2" rows="5" value={this.state.detalleEvaluacion} onChange={this.handleChange}></textarea>
                        <select name="resultadoEvaluacion" className="h-25" value={this.state.resultadoEvaluacion} onChange={this.handleChange}> 
                          <option disabled value="selec">Seleccione</option>
                          <option value="Aprueba">Aprueba</option>
                          <option value="No Aprueba">No aprueba</option>
                          <option value="Pendiente">Pendiente</option>
                        </select>
                      </div>
                    </React.Fragment>
                  </div>
                  <div className="modal-footer">
                    
                    <button type="button" className="btn btn-secondary w-20 bg-light" style={{color:'#6c757d'}} onClick={this.closeModal}>Cancelar</button>
                    {type==="Experto"?(
                        <React.Fragment>
                              <button type="button" className="btn btn-secondary w-20" disabled={this.state.resultadoEvaluacion==="selec"||this.state.tipoEvaluacion==="selec"} onClick={async(e)=>{
                                    await this.props.guardarEvaluacion(data[11],this.state.detalleEvaluacion,this.state.tipoEvaluacion,this.state.resultadoEvaluacion)
                                    await this.closeModal(e,true);
                                }}>Guardar</button>
                                {finalizar && (
                              <button type="button" className="btn btn-secondary bg-danger w-20" disabled={this.state.resultadoEvaluacion==="selec"||this.state.tipoEvaluacion==="selec"} onClick={async(e)=>{
                                   await this.props.finalizarEvaluacion(data[11],this.state.detalleEvaluacion,this.state.tipoEvaluacion,this.state.resultadoEvaluacion);
                                   await this.closeModal(e,true);
                                }}>Finalizar</button>)
                              }
                          </React.Fragment>
                        ):null}
                  </div>
              </div>
          </div>
  
        </div>
        )
      }
  }