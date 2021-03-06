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

export default class ExperienciaLaboralEv extends Component {

    constructor(props) {
        super(props);
      }

      state={
          loading: false,
      }

    

    render() {
        const columns = [
            {
                name: "sector",
                label: "Sector",
                options: {
                 filter: true,
                 sort: true,
                },
            },
          {
           name: "nombreEmpresa",
           label: "Empresa",
           options: {
            filter: true,
            sort: true,
           }
          },
          {
           name: "cargoEjercido",
           label: "Cargo",
           options: {
            filter: true,
            sort: false,
           }
          },
          {
           name: "descripcion",
           label: "Descripción",
           options: {
            filter: true,
            sort: false,
           }
          },
          {
           name: "fechaInicio",
           label: "Inicio",
           options: {
            filter: true,
            sort: true,
            customBodyRender: (value)=>{
                return <span>{dayjs(value).format("DD-MM-YYYY")}</span>
             },
           }
          },
          {
            name: "fechaFin",
            label: "Fin",
            options: {
             filter: true,
             sort: true,
             customBodyRender: (value)=>{
                return <span>{dayjs(value).format("DD-MM-YYYY")}</span>
             },
            }
           },
           {
            name: "esTrabajoActual",
            label: "Trabajo Actual",
            options: {
             filter: true,
             sort: true,
             customBodyRender: (value)=>{
                if(value ===1){
                    return <span>Si</span>
                }
                else{
                    return <span>No</span>
                }
             },
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
                        <h2>Experiencia Laboral</h2>
                        <div className="card w-100">
                            <h3 className="px-2">Experiencia por cada alcance seleccionado</h3>
                            <div className="flex-row justify-content-between">
                                <div className="d-flex flex-column card-body">
                                    <div className="d-flex flex-row justify-content-between w-100">
                                        <div className="d-flex flex-column w-30 mr-4">
                                            <Label name="Sector"/>
                                            <select className="h-50" name="sectorActual" value={this.props.sectorActual} onChange={(evt)=>{this.props.handleChangeSector(evt)}}>
                                                <option disabled value="selec">Seleccione</option>
                                                {this.props.sectores.map((sec)=>{
                                                    return <option key={sec.id_sector} value={sec.id_sector}>{sec.tipoSector}</option>
                                                })
                                                }
                                            </select>
                                        </div>
                                        <div className="d-flex flex-column w-30">
                                            <Label name="Nombre Empresa"/>
                                            <input type="text" className="h-50" name="nombreEmpresa" value={this.props.nombreEmpresa} onChange={this.props.handleChange}></input>
                                        </div>
                                        <div className="d-flex flex-column w-30">
                                            <Label name="Cargo Ejercido"/>
                                            <input type="text" className="h-50" name="cargoEjercido" value={this.props.cargoEjercido} onChange={this.props.handleChange}></input>
                                        </div>
                                    </div>
                                    <div className="d-flex flex-row justify-content-between w-100">
                                        <div className="d-flex flex-column w-30 mr-4">
                                            <Label name="Descripción"/>
                                            <textarea rows='2' name="descripcion" value={this.props.descripcion} onChange={this.props.handleChange}></textarea>
                                        </div>
                                        <div className="d-flex flex-column w-30">
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

                                        </div>
                                    </div>
                                    <div className="d-flex flex-row justify-content-between w-100">
                                    <div className="d-flex flex-column w-30 mr-4">
                                            <Label name="Relacionado con actividades " className="w-100"/>
                                            <select className="h-50" name="actividad" value={this.props.actividad} onChange={(evt)=>{this.props.handleChangeActividad(evt)}}>
                                                <option disabled value="selec">Seleccione</option>
                                                <option value="gestión de la calidad">Gestión de la calidad</option>
                                                <option value="aseguramiento de la calidad">Aseguramiento de la calidad</option>
                                                <option value="evaluación de la conformidad">Evaluación de la conformidad</option>
                                                }
                                            </select>
                                        </div>
                                        <div className="d-flex flex-row justify-content-start align-items-center w-30">
                                            <Label name="Trabajo Actual"/>
                                            <Checkbox name="esTrabajoActual" checked={this.props.checkedItems.get("esTrabajoActual")} onChange={this.props.handleCheckBoxChange} />
                                        </div>
                                        {isEmpty(this.props.sectores)||this.props.fechaValidation||this.props.cargoEjercido===""||this.props.descripcion===""||this.props.sectorActual==="selec"||this.props.actividad==="selec"?
                                         (<div className="d-flex flex-row justify-content-start align-items-center w-30">
                                            <label className="text-danger text-left mr-2 ">Debe poseer al menos 2 años de experiencia y completar todos los datos o no puede seguir postulando
                                            </label>
                                            <button name="referencia" className="btn-secondary w-20 h-50" disabled>Agregar</button>
                                         </div>):
                                        <button name="referencia" className="btn-secondary w-20 h-50" onClick={this.props.agregarEv}>Agregar</button>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                </div>
                <div className="d-flex flex-row justify-content-center align-items-center w-100 py-2">
                    <MUIDataTable className="data-table w-100"
                        data={this.props.experiencias}
                        columns={columns}
                        options={options}
                    />
                </div>
                <div className="d-flex flex-row justify-content-end align-items-center w-100 py-2">
                <button name={"educacionEvaluador"} className="btn-primary-sae bg-light w-20 mr-2" style={{color:'#6c757d'}} 
                        onClick={(evt)=>{
                            this.props.handleChangeTipo(evt);
                            }}
                    >Artrás</button>
                    {this.state.loading?(
                        <div className="d-flex flex-row justify-content-end w-100 align-items-center">
                            <ClipLoader sizeUnit={"px"} size={30} color={"#9561e2"} className="block" />
                            <div className="text-primary text-center">Enviando Postulación</div>
                        </div>):(
                        <button name="referencia" className="btn-primary-sae w-20" 
                        onClick={(evt)=>{
                            this.props.handleValidar(evt);
                            }}
                    >Siguiente</button>)}
                    
                </div>

            </div>
            </React.Fragment>
        );
    }
}

if (document.getElementById('experiencia-laboral')) {
    ReactDOM.render(<ExperienciaLaboralEv />, document.getElementById('experiencia-laboral'));
}
