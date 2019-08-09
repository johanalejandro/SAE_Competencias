import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { isEmpty, size } from 'lodash';
import { ClipLoader } from "react-spinners";
import Label from '../common/Label';



export default class EducacionFormal extends Component {

    render() {
        //console.log("ambitos escogidos: ",this.state.ambitosArray);
        return (
            <React.Fragment>
                <div className="d-flex flex-column align-items-center justify-content-between w-100">
                        <h2>Educación Formal</h2>
                        <div className="w-100 mb-2">
                                <div className="d-flex flex-row justify-content-between w-65">
                                   
                                    <div className="d-flex flex-column w-50">
                                        <Label name="Institución"/>
                                        <input type="text" className="h-50" name="nombreInstitucion" defaultValue={this.props.nombreInstitucion} onChange={this.props.handleChange}></input>
                                    </div>
                                </div>
                                <div className="d-flex flex-row justify-content-between w-65">
                                   
                                    <div className="d-flex flex-column w-50">
                                        <Label name="Título Obtenido"/>
                                        <input type="text" className="h-50" name="tituloObtenido" defaultValue={this.props.tituloObtenido} onChange={this.props.handleChange}></input>
                                    </div>
                                </div>
                                <div className="d-flex flex-column w-50 mr-4">
                                        <Label name="Tipo de Formación"/>
                                        <select className="h-50" name="tipoFormacion" defaultValue={this.props.tipoFormacion} onChange={this.props.handleChange}>
                                            <option disabled value="selec">Seleccione</option>
                                            <option value="Tercer Nivel">Tercer Nivel</option>
                                            <option value="Cuarto Nivel">Cuarto Nivel</option>
                                            <option value="Doctorado(PHD)">Doctorado(PHD)</option>
                                        </select>
                                    </div>
                                    <div className="d-flex flex-column w-50 mr-4">
                                        <Label name="Anexo"/>
                                        <label id="anexo-label" className="w-50 d-flex justify-content-start text-left text-normal h-50">
                                              {this.props.loadingFile ? (
                                                  <div className="d-flex flex-column justify-content-center w-100 align-items-center">
                                                      <ClipLoader sizeUnit={"px"} size={30} color={"#9561e2"} className="block" />
                                                      <div className="text-primary text-center">Cargando anexo</div>
                                                  </div>
                                              ) : (
                                                  isEmpty(this.props.archivoAnexo)? (
                                                    <React.Fragment>
                                                    <div className="d-flex justify-content-center text-blue align-items-center btn btn-secondary h-100">
                                                        <span className="text-center">Cargar archivo</span>
                                                    </div>
                                                    <input
                                                        type="file"
                                                        name="archivoAnexo"
                                                        className="d-none"
                                                        onChange={this.props.handleChangeFile}
                                                        id="archivoAnexo"
                                                    />
                                                </React.Fragment>
                                                  ):(
                                                    <div className="d-flex flex-column justify-content-start w-100 align-items-center">
                                                      <div className="text-primary text-center">Archivo Cargado</div>
                                                  </div>
                                                  )
                                              )}
                                              <div id="fileDisplayArea" className="mt--6 ml--10 inset-0 h-0" />
                                          </label>

                                    </div>
                        </div>
                </div>

            <div className="d-flex flex-row justify-content-end align-items-center py-4">
            <button name={"datos"} className="btn-secondary w-20" 
                    onClick={(evt)=>{
                        this.props.handleChangeTipo(evt);
                        }}
                >Regresar</button>
                <button name={this.props.tipo==="experto"?"experiencia":"educacionEvaluador"} className="btn-primary-sae w-20" 
                    onClick={(evt)=>{
                        this.props.handleChangeTipo(evt);
                        }}
                >Siguiente</button>
            </div>
            </React.Fragment>
        );
    }
}

if (document.getElementById('educacion-formal')) {
    ReactDOM.render(<EducacionFormal />, document.getElementById('educacion-formal'));
}
