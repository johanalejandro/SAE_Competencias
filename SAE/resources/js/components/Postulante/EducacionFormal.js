import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { isEmpty, size } from 'lodash';
import { ClipLoader } from "react-spinners";
import Label from '../common/Label';



export default class EducacionFormal extends Component {

    render() {
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
                                        <Label name="Anexo del Título Obtenido"/>
                                        <label id="anexo-label" className="w-50 d-flex justify-content-start text-left text-normal h-50">
                                              {this.props.loadingFile ? (
                                                  <div className="d-flex flex-column justify-content-center w-100 align-items-center">
                                                      <ClipLoader sizeUnit={"px"} size={30} color={"#9561e2"} className="block" />
                                                      <div className="text-primary text-center">Cargando anexo</div>
                                                  </div>
                                              ) : (
                                                  !this.props.archivoAnexo? (
                                                    <React.Fragment>
                                                    <div className="d-flex justify-content-center align-items-center btn btn-secondary text-info bg-light h-100">
                                                        <span className="text-center">Cargar Título</span>
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
                                                    <div className="d-flex flex-row justify-content-start mr-2  w-100 align-items-center">
                                                      <div className="text-primary text-left">Archivo Cargado</div>
                                                      <button className="btn btn-secondary text-info bg-light h-100" name="archivoAnexo" onClick={this.props.volverCargar}>Volver a cargar</button>
                                                  </div>
                                                  )
                                              )}
                                              <div id="fileDisplayArea" className="mt--6 ml--10 inset-0 h-0" />
                                          </label>

                                    </div>
                        </div>
                </div>

            <div className="d-flex flex-row justify-content-end align-items-center py-4">
            <button name={"datos"} className="btn-primary-sae bg-light w-20 mr-2" style={{color:'#6c757d'}}
                    onClick={(evt)=>{
                        this.props.handleChangeTipo(evt);
                        }}
                >Atrás</button>
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
