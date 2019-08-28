import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Label from '../common/Label';
import {isEmpty} from 'lodash';
import MUIDataTable from 'mui-datatables';
import Checkbox from '../common/Checkbox';
import DatePicker from "react-datepicker";
import dayjs from 'dayjs';
import { ClipLoader } from "react-spinners";

import "react-datepicker/dist/react-datepicker.css";

export default class EducacionCursos extends Component {

    constructor(props) {
        super(props);
      }

      state={
          loading: false,
      }

    render() {
        const columns = [
            {
                name: "requerimiento",
                label: "Requerimiento",
                options: {
                 filter: true,
                 sort: true,
                },
            },
          {
           name: "nombreInstitucionCurso",
           label: "Institucion",
           options: {
            filter: true,
            sort: true,
           }
          },
          {
           name: "archivoAnexoCursoNombre",
           label: "Anexo",
           options: {
            filter: true,
            sort: false,
            
            customBodyRender: (value)=>{
                console.log(value)
                return <span>{String(value)}</span>
             },
           }
          },
           {
            name: "numeroHoras",
            label: "Número de Horas",
            options: {
             filter: true,
             sort: true,
            }
           },
         ];
          
         const options = {
            selectableRowsOnClick: false,
            selectableRows: 'none',
            rowsPerPage: 3,
            rowsPerPageOptions: [3,5,10],
            search: false,
            filter: false,
            print: false,
            download: false,
            viewColumns: false,
            filterType: 'checkbox',
            textLabels: {
                body: {
                  noMatch: "Aun no hay datos que mostrar",
                  toolTip: "Ordenar",
                },
                pagination: {
                  next: "Siguiente",
                  previous: "Anterior",
                  rowsPerPage: "Filas por página:",
                  displayRows: "de",
                },
                toolbar: {
                  search: "Buscar",
                  downloadCsv: "Descargar CSV",
                  print: "Impimir",
                  viewColumns: "Ver columnas",
                  filterTable: "Filtrar Tabla",
                },
                filter: {
                  all: "Todos",
                  title: "FILTROS",
                  reset: "RESET",
                },
                viewColumns: {
                  title: "Mostrar columnas",
                  titleAria: "Mostrar/Ocultar Columnas",
                },
                selectedRows: {
                  text: "fila(s) seleccionadas",
                  delete: "Borrar",
                  deleteAria: "Borrar Filas Seleccionadas",
                },
              }
         };
        return (
            <React.Fragment>
            <div className="containersae d-flex flex-column justify-content-center align-items-center">
                <div className="d-flex flex-column align-items-center w-100">
                        <h2>Educación Cursos</h2>
                        <div className="card w-100">
                            <h3 className="px-2">Información de cada curso seleccionado</h3>
                            <div className="flex-row justify-content-between">
                                <div className="d-flex flex-column card-body">
                                    <div className="d-flex flex-row justify-content-between w-100">
                                        <div className="d-flex flex-column w-30 mr-4">
                                            <Label name="Curso o Norma"/>
                                            <select className="h-50" name="reqActual" value={this.props.reqActual} onChange={(evt)=>{this.props.handleChangeReq(evt)}}>
                                                <option disabled value='selec'>Seleccione</option>
                                                {this.props.reqs.map((req)=>{
                                                    return <option key={req.id_sector_requerimiento} value={req.id_sector_requerimiento}>{req.requerimiento}</option>
                                                })
                                                }
                                            </select>
                                        </div>
                                        <div className="d-flex flex-column w-30">
                                            <Label name="Nombre Institución"/>
                                            <input type="text" className="h-50" name="nombreInstitucionCurso" value={this.props.nombreInstitucionCurso} onChange={this.props.handleChange}></input>
                                        </div>
                                        <div className="d-flex flex-column w-30">
                                            <Label name="Número de Horas"/>
                                            <input type="number" className="h-50" name="numeroHoras" value={this.props.numeroHoras} onChange={this.props.handleChange}></input>
                                        </div>
                                    </div>
                                    <div className="d-flex flex-row justify-content-between w-100">
                                        {/*<div className="d-flex flex-column w-30">
                                            <Label name="Fecha Inicio"/>
                                            <DatePicker
                                                selected={this.props.fechaInicio}
                                                selectsStart
                                                startDate={this.props.fechaInicio}
                                                endDate={this.props.fechaFin}
                                                onChange={(evt) => {
                                                    this.props.handleChangeStart(evt);
                                                }}
                                                dateFormat="dd-MM-yyyy"
                                                className="w-100 z-dropdown"
                                            />

                                        </div>
                                        <div className="d-flex flex-column w-30">
                                            <Label name="Fecha Fin"/>
                                            <DatePicker
                                                selected={this.props.fechaFin}
                                                selectsEnd
                                                startDate={this.props.fechaInicio}
                                                endDate={this.props.fechaFin}
                                                dateFormat="dd-MM-yyyy"
                                                onChange={(evt) => {
                                                    this.props.handleChangeEnd(evt);
                                                }}
                                                className="w-100"
                                            />

                                        </div>*/}
                                         <div className="d-flex flex-column w-60 mr-4">
                                            <Label name="Anexo"/>
                                            <label id="anexo-label" className="w-50 d-flex justify-content-start text-left text-normal h-50">
                                                {this.state.loading? (
                                                    <div className="d-flex flex-column justify-content-center w-100 align-items-center">
                                                    <ClipLoader sizeUnit={"px"} size={30} color={"#9561e2"} className="block" />
                                                    <div className="text-primary text-center">Cargando anexo</div>
                                                </div>
                                            ) : (
                                                !this.props.archivoAnexoCurso? (
                                                <div className="d-flex flex-row justify-content-start w-100 mr-2 align-items-center">
                                                       <div className="text-primary text-left">Cargar pdf</div>
                                                  <div className="d-flex justify-content-center align-items-center btn btn-secondary text-info bg-light h-100">
                                                 
                                                      <span className="text-center">Cargar archivo</span>
                                                  </div>
                                                  {this.props.aviso&&(<span className="text-danger">El archivo no es pdf</span>)}
                                                  <input
                                                      type="file"
                                                      name="archivoAnexoCurso"
                                                      className="d-none"
                                                      onChange={this.props.handleChangeFileCurso}
                                                      id="archivoAnexoCurso"
                                                  />
                                              </div>
                                                ):(
                                                  <div className="d-flex flex-row justify-content-start w-100 mr-2 align-items-center">
                                                    <div className="text-primary text-left">Archivo Cargado</div>
                                                    <button className="btn btn-secondary text-info bg-light h-100" name="archivoAnexoCurso" onClick={this.props.volverCargar}>Volver a cargar</button>
                                                </div>
                                                )
                                            )}
                                                <div id="fileDisplayArea" className="mt--6 ml--10 inset-0 h-0" />
                                            </label>

                                        </div>
                                    </div>
                                    <div className="d-flex flex-row justify-content-end align-items-center w-100">
                                        {isEmpty(this.props.reqs)||this.props.archivoAnexoCurso===""||this.props.numeroHoras<=0 || this.props.reqActual==="selec"||this.props.nombreInstitucionCurso===""?
                                        (
                                            <React.Fragment>
                                            <label className="text-danger text-left mr-2 ">Revise que los datos del curso estén completos</label>
                                            <button name="referencia" className="btn-secondary w-20" disabled>Agregar</button>
                                        </React.Fragment>
                                        ):
                                        <button name="referencia" className="btn-secondary w-20" onClick={this.props.agregarCurso}>Agregar</button>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                </div>
                <div className="d-flex flex-row justify-content-center align-items-center w-100 py-2">
                    <MUIDataTable className="data-table w-100"
                        data={this.props.cursos}
                        columns={columns}
                        options={options}
                    />
                </div>
                <div className="d-flex flex-row justify-content-end align-items-center w-100 py-2">
                    <button name={"educacion"} className="btn-primary-sae bg-light w-20 mr-2" style={{color:'#6c757d'}} 
                        onClick={(evt)=>{
                            this.props.handleChangeTipo(evt);
                            }}
                    >Artrás</button>
                    <button name="experiencia" className="btn-primary-sae w-20" 
                        onClick={(evt)=>{
                            this.props.handleChangeTipo(evt);
                            }}
                    >Siguiente</button>
                    
                </div>

            </div>
            </React.Fragment>
        );
    }
}

if (document.getElementById('experiencia-laboral')) {
    ReactDOM.render(<EducacionCursos />, document.getElementById('experiencia-laboral'));
}
