import React,{ Component } from 'react';

import Label from '../common/Label';
import isEmpty from 'lodash/isEmpty';
import axios from 'axios';
import uniqBy from 'lodash/uniqBy'

export default class Modal extends Component {

      state = {
        detalleEvaluacion: "",
        resultadoEvaluacion: "selec",
        tipoEvaluacion: "selec",
        estadoAlcancesArray:[],
        estadoSectoresArray: [],
        archivoAnexo: "",
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
              archivoAnexo: data.archivoAnexoEvaluacion,
            })
          })
          .catch(console.error);
          }
          if(this.props.modalInfo.data!== undefined && this.props.modalInfo.type==="Evaluador"){
            const id = this.props.modalInfo.data[11]
            await axios.get("api/verSolicitudEvaluacion/"+id)
          .then(({data})=>{
            console.log(data);
            this.setState({
              detalleEvaluacion: data.detalleEvaluacion===null?"":data.detalleEvaluacion,
              resultadoEvaluacion: data.resultadoEvaluacion,
              tipoEvaluacion: data.tipoEvaluacion===null?"selec":data.tipoEvaluacion,
              archivoAnexo: data.archivoAnexoEvaluacion===null?"":data.archivoAnexoEvaluacion,
            })
          })
          .catch(console.error);
          }
      }

      getAnexo(e,id_Curso){
        e.preventDefault();
        axios.get('/api/getAnexo/'+id_Curso)
        .then((response)=>{
          console.log(response);
        })
        .catch(console.error);
      }

      getCV(e,id_Educacion){
        e.preventDefault();
        axios.get('/api/getCV/'+id_Educacion)
        .then((response)=>{
          console.log(response);
        })
        .catch(console.error);
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

      handleChangeAlcance= (evt)=>{
        const name= evt.target.name;
        const value = evt.target.value;
        const {estadoAlcancesArray} = this.state;
        let estados = [];
        estados = estadoAlcancesArray;
        estados.push(
            {
              id_alcance:name,
              estado: value,
            }
          );
        this.setState({
          estadoAlcancesArray: estados,
        })
      }

      handleChangeCurso = (evt)=>{
        const name= evt.target.name;
        const value = evt.target.value;
        const {estadoSectoresArray} = this.state;
        let estados = [];
        estados = estadoSectoresArray;
        estados.push(
            {
              id_sector:name,
              estado: value,
            }
          );
        this.setState({
          estadoSectoresArray: estados,
        })
      }

      render () {
        console.log(this.state.estadoAlcancesArray);
        const data = this.props.modalInfo.data!== undefined?this.props.modalInfo.data:[];
        const type = this.props.modalInfo.type;
        const finalizar = this.state.resultadoEvaluacion!=="selec" && this.state.resultadoEvaluacion!=="Pendiente";
        this.props.modalInfo.data!== undefined?console.log(this.props.modalInfo.data):null;
        
      return (
  
          <div className="modal-evaluar bg-white"
            onClick={ e => e.stopPropagation() }>
                <div className="modal-flex-sae">
                  <div className="modal-header text-center">
                      <h5 className="modal-title text-info" id="exampleModalLongTitle">Evaluar como Postulante a {type}</h5>
                      <span 
                          className="close-sae"
                          onClick={ this.closeModal }>&times;
                      </span>
                  </div>
                  <div className="modal-body text-justify modal-body-evaluar">
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
                            {data[12].map((curso)=>{
                              return <div key={curso.id_sector_requerimiento} className="d-flex flex-column align-items-between mb-1">
                                <Label name={"Alcance Relacionado: "+curso.sector} className="w-100"/>
                                <Label name={"Institución: "+curso.nombreInstitucion} className="w-100"/>
                                <Label name={"N° Horas: "+curso.numeroHoras} className="w-100"/>
                                <button onClick={(e)=>this.getAnexo(e,curso.id_curso_evaluador)}>Descargar Anexo</button>
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
                            <Label   name={"Alcance Relacionado: "+experiencia.alcance} className="w-100"/>
                            <Label  name={"Empresa: "+experiencia.nombreEmpresa} className="w-100"/>
                            <Label name={"Cargo: "+experiencia.cargoEjercido} className="w-100"/>
                            <Label  name={"Descripción: "+experiencia.descripcion} className="w-100"/>
                            <Label  name={"Fecha Inicio: "+experiencia.fecha_inicio} className="w-100"/>
                            <Label  name={"Fecha Fin: "+experiencia.fecha_fin} className="w-100"/>
                          </div>
                        })
                      ):(
                        data[6].map((experiencia)=>{
                          return <div key={experiencia.id_sector} className="d-flex flex-column align-items-between  mb-1">
                            <Label   name={"Alcance Relacionado: "+experiencia.sector} className="w-100"/>
                            <Label  name={"Empresa: "+experiencia.nombreEmpresa} className="w-100"/>
                            <Label name={"Cargo: "+experiencia.cargoEjercido} className="w-100"/>
                            <Label  name={"Descripción: "+experiencia.descripcion} className="w-100"/>
                            <Label  name={"Fecha Inicio: "+experiencia.fecha_inicio} className="w-100"/>
                            <Label  name={"Fecha Fin: "+experiencia.fecha_fin} className="w-100"/>
                          </div>
                        })
                      )
                      }
                      </div>
                      <div className="d-flex flex-column align-items-between w-50 mb-1">
                        <div className="d-flex flex-column align-items-between mb-1">
                          <h6>Educación Formal</h6>
                          {!isEmpty(data)?(
                              <div className="d-flex flex-column align-items-between">
                                <Label name={"Institución: "+data[7].nombreInstitucion} className="w-100"/>
                                <Label name={"Nivel de Instrucción: "+data[7].tipoFormacion} className="w-100"/>
                                <Label name={"Título: "+data[7].tituloObtenido} className="w-100"/>
                                <button className="btn btn-secondary text-info bg-light h-100 w-20" onClick={(e)=>this.getCV(e,data[7].id_educacion)}>Descargar Título</button>
                              </div>
                              ):null
                            }
                        </div>
                        {type==="Experto"?(
                          <React.Fragment>
                            <h6>Estado de Alcances</h6>
                            <div>
                              {data[6].map((experiencia)=>{
                              return(
                                <React.Fragment key={experiencia.id_alcance}>
                                  <div className="d-flex flex-column align-items-between  mb-1">
                                      <Label  name={"Alcance Relacionado: "+experiencia.alcance} className="w-100"/>
                                      <select  name={experiencia.id_alcance} className="h-25 w-20" defaultValue={experiencia.estado} onChange={this.handleChangeAlcance}> 
                                        <option disabled value="selec">Seleccione</option>
                                        <option value="Arobado">Aprueba</option>
                                        <option value="No aprobado">No aprueba</option>
                                        <option value="Pendiente">Pendiente</option>
                                      </select>
                                  </div>
                                </React.Fragment>
                            )})}
                            </div>
                          </React.Fragment>
                      ):(<React.Fragment>
                        <h6>Estado de Sectores</h6>
                        <div>
                          {data[6].map((experiencia)=>{
                          return(
                            <React.Fragment key={experiencia.id_sector}>
                              <div className="d-flex flex-column align-items-between  mb-1">
                                  <Label  name={"Alcance Relacionado: "+experiencia.sector} className="w-100"/>
                                  <select  name={experiencia.id_sector} className="h-25" defaultValue={experiencia.estado} onChange={this.handleChangeSector}> 
                                    <option disabled value="selec">Seleccione</option>
                                    <option value="Arobado">Aprueba</option>
                                    <option value="No aprobado">No aprueba</option>
                                    <option value="Pendiente">Pendiente</option>
                                  </select>
                              </div>
                            </React.Fragment>
                        )})}
                        </div>
                      </React.Fragment>)
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
                        <div className="d-flex flex-column w-100 mr-2">
                                        <label id="anexo-label" className="w-50 d-flex justify-content-start text-left text-normal h-50">
                                              {!this.state.archivoAnexo? (
                                                    <React.Fragment>
                                                    <div className="d-flex justify-content-center align-items-center btn btn-secondary text-info bg-light h-100">
                                                        <span className="text-center">Cargar Anexo</span>
                                                    </div>
                                                    <input
                                                        type="file"
                                                        name="archivoAnexo"
                                                        className="d-none"
                                                        onChange={this.handleChangeFile}
                                                        id="archivoAnexo"
                                                    />
                                                </React.Fragment>
                                                  ):(
                                                    <div className="d-flex flex-row justify-content-start mr-2  w-100 align-items-center">
                                                      <div className="text-primary text-left">Archivo Cargado</div>
                                                      <button className="btn btn-secondary text-info bg-light h-100" name="archivoAnexo" onClick={this.volverCargar}>Volver a cargar</button>
                                                  </div>
                                                  )}
                                          </label>

                                    </div>
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
                                    await this.props.guardarEvaluacionExperto(data[11],this.state.detalleEvaluacion,this.state.tipoEvaluacion,this.state.resultadoEvaluacion,this.state.estadoAlcancesArray)
                                    await this.closeModal(e,true);
                                }}>Guardar</button>
                                {finalizar && (
                              <button type="button" className="btn btn-secondary bg-danger w-20" disabled={this.state.resultadoEvaluacion==="selec"||this.state.tipoEvaluacion==="selec"} onClick={async(e)=>{
                                   await this.props.finalizarEvaluacionExperto(data[11],this.state.detalleEvaluacion,this.state.tipoEvaluacion,this.state.resultadoEvaluacion,this.state.estadoAlcancesArray);
                                   await this.closeModal(e,true);
                                }}>Finalizar</button>)
                              }
                          </React.Fragment>
                        ):(
                          <React.Fragment>
                              <button type="button" className="btn btn-secondary w-20" disabled={this.state.resultadoEvaluacion==="selec"||this.state.tipoEvaluacion==="selec"} onClick={async(e)=>{
                                    await this.props.guardarEvaluacionEvaluador(data[11],this.state.detalleEvaluacion,this.state.tipoEvaluacion,this.state.resultadoEvaluacion,this.state.estadoSectoresArray)
                                    await this.closeModal(e,true);
                                }}>Guardar</button>
                                {finalizar && (
                              <button type="button" className="btn btn-secondary bg-danger w-20" disabled={this.state.resultadoEvaluacion==="selec"||this.state.tipoEvaluacion==="selec"} onClick={async(e)=>{
                                   await this.props.finalizarEvaluacionEvaluador(data[11],this.state.detalleEvaluacion,this.state.tipoEvaluacion,this.state.resultadoEvaluacion,this.state.estadoSectoresArray);
                                   await this.closeModal(e,true);
                                }}>Finalizar</button>)
                              }
                          </React.Fragment>
                        )}
                  </div>
              </div>
          </div>
        )
      }
  }