import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {clone, isEmpty, pull} from 'lodash';
import Label from '../common/Label';
import MUIDataTable from 'mui-datatables';

let experiencias = [];

export default class ExperienciaLaboral extends Component {

    state = {
        ambitos: [],
        ambitosArray: [],
        checkedItems: new Map(),
        experienciaLaboral: [],
    }

    componentDidMount(){

        
    }

    agregar = () => {
        let experiencia = {}
        experiencia['nombreEmpresa'] = this.props.nombreEmpresa;
        experiencia['cargoEjercido'] = this.props.cargoEjercido;
        experiencia['descripcion'] = this.props.descripcion;
        experiencia['fechaInicio'] = this.props.fechaInicio;
        experiencia['fechaFin'] = this.props.fechaFin;
        experiencias.push(experiencia);
    }

    /*handleCheckBoxChange = ({target}) => {
        const ambitos = this.state.ambitos;
        const item = target.name;
        const id = target.id;
        const isChecked =target.checked;
        this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(item, isChecked) }));
        if(isChecked){
            const cloned = cloneArray.concat(ambito);
            this.setState({
                ambitosArray: cloned,
            })
        }else{
            const cloned = pull(cloneArray,ambito);
            this.setState({
                ambitosArray: cloned,
            })
        }
    }*/

    render() {
        //console.log("ambitos escogidos: ",this.state.ambitosArray);
        /*fechaInicio: "",
        fechaFin: "",
        esTrabajoActual: false,
        descripcion: "",
        cargoEjercido: "",
        nombreEmpresa: "",*/
        const alcances = this.props.alcances;
        console.log("EXP ALCANCES",alcances);
        const columns = [
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
           }
          },
          {
            name: "fechaFin",
            label: "Fin",
            options: {
             filter: true,
             sort: true,
            }
           },
         ];
          
         const options = {
            selectableRowsOnClick: false,
            selectableRows: 'none',
            rowsPerPage: 5,
            rowsPerPageOptions: [5,10,15],
            filterType: 'checkbox',
            textLabels: {
                body: {
                  noMatch: "Aun no hay datos que mostrar",
                  toolTip: "Sort",
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
                            <h3>Experiencia por cada alcance seleccionado</h3>
                            <div className="flex-row justify-content-between">
                                <div className="d-flex flex-column card-body">
                                    <div className="d-flex flex-row justify-content-between w-100">
                                        <div className="d-flex flex-column w-30 mr-4">
                                            <Label name="Alcance"/>
                                            <select className="h-50" name="alcanceActual" defaultValue={this.props.alcanceActual} onChange={this.props.handleChange}>
                                                <option disabled value='selec'>Seleccione</option>
                                                {alcances.map((alcance)=>{
                                                    return <option key={alcance.id_alcance} value={alcance.id_alcance}>{alcance.nombreAlcance}</option>
                                                })
                                                }
                                            </select>
                                        </div>
                                        <div className="d-flex flex-column w-30">
                                            <Label name="Nombre Empresa"/>
                                            <input type="text" className="h-50" name="nombreEmpresa" defaultValue={this.props.nombreEmpresa} onChange={this.props.handleChange}></input>
                                        </div>
                                        <div className="d-flex flex-column w-30">
                                            <Label name="Cargo Ejercido"/>
                                            <input type="text" className="h-50" name="cargoEjercido" defaultValue={this.props.cargoEjercido} onChange={this.props.handleChange}></input>
                                        </div>
                                    </div>
                                    <div className="d-flex flex-row justify-content-between w-100">
                                        <div className="d-flex flex-column w-30 mr-4">
                                            <Label name="Descripción"/>
                                            <textarea rows='3' name="descripcion" value={this.props.descripcion} onChange={this.props.handleChange}></textarea>
                                        </div>
                                        <div className="d-flex flex-column w-30">
                                            <Label name="Fecha Inicio"/>
                                            <input type="date" className="h-25" name="fechaInicio" defaultValue={this.props.fechaInicio} onChange={this.props.handleChange}></input>
                                        </div>
                                        <div className="d-flex flex-column w-30">
                                            <Label name="Fecha Fin"/>
                                            <input type="date" className="h-25" name="fechaFin" defaultValue={this.props.fechaFin} onChange={this.props.handleChange}></input>
                                        </div>
                                    </div>
                                    <div className="d-flex flex-row justify-content-end w-100">
                                        <button name="referencia" className="btn-secondary w-20" onClick={this.agregar}>Agregar</button> 
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                </div>
                <div className="d-flex flex-row justify-content-center align-items-center w-100 py-2">
                    <MUIDataTable className="data-table w-100"
                        title={"Tabla"}
                        data={experiencias}
                        columns={columns}
                        options={options}
                    />
                </div>

            </div>
            <div className="d-flex flex-row justify-content-end align-items-center py-2">
                <button name="referencia" className="btn-primary-sae w-20" 
                    onClick={(evt)=>{
                        this.props.handleChangeTipo(evt);
                        }}
                >Siguiente</button>
            </div>
            </React.Fragment>
        );
    }
}

if (document.getElementById('experiencia-laboral')) {
    ReactDOM.render(<ExperienciaLaboral />, document.getElementById('experiencia-laboral'));
}
