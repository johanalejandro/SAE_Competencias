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

export default class ExperienciaLaboral extends Component {

    constructor(props) {
        super(props);
      }

      state={
          loading: false,
      }

    handleSubmit = async (e) => {
        //preventDefault prevents page reload   
        e.preventDefault();
        /*A call back to the onAdd props. The current
         *state is passed as a param
         */
        this.setState({
            loading: true,
        })

        await this.props.handlePostulante();
        await this.props.handleExp();

        this.setLoading();
      }

      setLoading = () =>{
          this.setState({
              loading: false,
          })
      }

    render() {

        const columns = [
            {
                name: "alcance",
                label: "Alcance",
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
                                            <Label name="Alcance"/>
                                            <select className="h-50" name="alcanceActual" value={this.props.alcanceActual} onChange={(evt)=>{this.props.handleChangeAlcance(evt)}}>
                                                <option disabled value='selec'>Seleccione</option>
                                                {this.props.alcances.map((alcance)=>{
                                                    return <option key={alcance.id_alcance} value={alcance.id_alcance}>{alcance.nombreAlcance}</option>
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
                                        <div className="d-flex flex-row justify-content-start align-items-center w-30">
                                            <Label name="Trabajo Actual"/>
                                            <Checkbox name="esTrabajoActual" checked={this.props.checkedItems.get("esTrabajoActual")} onChange={this.props.handleCheckBoxChange} />
                                        </div>
                                        {isEmpty(this.props.alcances)?
                                        <button name="referencia" className="btn-secondary w-20" disabled>Agregar</button>:
                                        <button name="referencia" className="btn-secondary w-20" onClick={this.props.agregar}>Agregar</button>
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
                    <button name={"educacion"} className="btn-primary-sae bg-white text-gray w-20" 
                        onClick={(evt)=>{
                            this.props.handleChangeTipo(evt);
                            }}
                    >Atrás</button>
                    {this.state.loading?(
                        <div className="d-flex flex-row justify-content-end w-100 align-items-center">
                            <ClipLoader sizeUnit={"px"} size={30} color={"#9561e2"} className="block" />
                            <div className="text-primary text-center">Enviando Postulación</div>
                        </div>):(
                        <button name="referencia" className="btn-primary-sae w-20" 
                        onClick={(evt)=>{
                            this.handleSubmit(evt);
                            }}
                    >Siguiente</button>)}
                    
                </div>

            </div>
            </React.Fragment>
        );
    }
}

if (document.getElementById('experiencia-laboral')) {
    ReactDOM.render(<ExperienciaLaboral />, document.getElementById('experiencia-laboral'));
}
