import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MUIDataTable from "mui-datatables";
import Header from "../common/Header";
import axios from "axios";
import clone from 'lodash/clone';
import findKey from 'lodash/findKey';

export default class Visualizador extends Component {

    state = {
        habilitadosExperto: [],
        habilitadosEvaluador: [],
        form: "",
        tipo: "",
    }

    componentWillMount= async()=>{
        this.setState({
            form: "expertos",
            tipo: "habilitadosExp",
        });
        let habilitadosExperto = [];
        let habilitadosEvaluador = [];
        await axios.get("api/mostrarEvaluadoresHabilitado")
        .then(({data} ) => {
            console.log(data);
            data.map(async(postulante,i)=>{
                let post ={};
                post['id_postulante'] = postulante.id_postulante;
                post['nombres'] = postulante.nombres;
                post['apellidos'] = postulante.apellidos;
                post['estado']= postulante.estado;
                post['email'] = postulante.email;
                post['tipoPostulacion'] = postulante.tipoPostulacion;
                post['fechaHabilitacion'] = postulante.fechaHabilitacion;
                post['disponibilidadViajar'] = postulante.disponibilidadViajar;
                post['cedula'] = postulante.cedula;
                post['nombreEmpresa'] = postulante.nombreEmpresa;
                post['cargoEjercido'] = postulante.cargoEjercido;
                post['fechaInicio'] = postulante.fecha_inicio;
                post['fechaFin'] = postulante.fecha_fin;
                post['fechaNacimiento'] = postulante.fechaNacimiento;
                post['estado'] = postulante.estado;
                post['ciudad'] = postulante.ciudad;
                post['provincia'] = postulante.provincia;
                post['telefono'] = postulante.telefono;
                post['sector'] = await this.getSector(parseInt(postulante.id_sector));
                habilitadosEvaluador[i]=clone(post);
            });
                
        })
        .catch(console.error);
        this.setState({habilitadosEvaluador:habilitadosEvaluador});
        await axios.get("api/mostrarExpertosHabilitado")
        .then(({data} ) => {
            data.map(async(postulante,i)=>{
                let post ={};
                post['id_postulante'] = postulante.id_postulante;
                post['nombres'] = postulante.nombres;
                post['apellidos'] = postulante.apellidos;
                post['estado']= postulante.estado;
                post['email'] = postulante.email;
                post['tipoPostulacion'] = postulante.tipoPostulacion;
                post['fechaHabilitacion'] = postulante.fechaHabilitacion;
                post['disponibilidadViajar'] = postulante.disponibilidadViajar;
                post['cedula'] = postulante.cedula;
                post['nombreEmpresa'] = postulante.nombreEmpresa;
                post['cargoEjercido'] = postulante.cargoEjercido;
                post['fechaInicio'] = postulante.fecha_inicio;
                post['fechaFin'] = postulante.fecha_fin;
                post['estado'] = postulante.estado;
                post['fechaNacimiento'] = postulante.fechaNacimiento;
                post['ciudad'] = postulante.ciudad;
                post['provincia'] = postulante.provincia;
                post['telefono'] = postulante.telefono;
                post['alcance'] = await this.getAlcance(parseInt(postulante.id_alcance));
                habilitadosExperto[i]=clone(post);
            });
                
        })
        .catch(console.error);
        this.setState({ habilitadosExperto: habilitadosExperto });

}

    handleChangeTipo = ({target}) => {
        if(target.name){
            this.setState({
                form: target.name,
                tipo: target.name==="expertos"?"habilitadosExp":"habilitadosEv",
            })
        }
        if(target.id){
            this.setState({
                form: target.id,
                tipo: target.id==="expertos"?"habilitadosExp":"habilitadosEv",
            })
        }
    }

    handleChangeTipoPost = ({target}) => {
        if(target.name){
            this.setState({
                tipo: target.name,
            })
        }
        if(target.id){
            this.setState({
                tipo: target.id,
            })
        }
    }

    getSector  =async (id) => {
        let sector = "";
        await axios.get('/api/sector/')
        .then(({data} )=> {
            const sectoresResponse = clone(data);
                const key = findKey(sectoresResponse,(sector)=>{
                    return sector.id_sector===id;
                })
                sector = sectoresResponse[key].tipoSector;
        }).catch(error => {
            console.log("===ERROR: ",error);
        });
        return sector;
    }
    
        getAlcance = async (id) => {
            let alcance = ""
            await axios.get('/api/alcance')
            .then(({data}) => {
                const alcancesResponse = clone(data);
                const key = findKey(alcancesResponse,(alcance)=>{
                    return alcance.id_alcance===id;
                })
                alcance = alcancesResponse[key].nombreAlcance;
            }).catch(error => {
                console.log("===ERROR: ",error);
            });
            return alcance;
        }
   
    render() {
        console.log("POSTULANTE RESPONSE",this.state.habilitadosEvaluador);
        console.log("POSTULANTE RESPONSE",this.state.habilitadosExperto);
        const columns = [
            {
                name: "id_postulante",
                label: "id",
                options: {
                 filter: true,
                 sort: true,
                 display: false,
                 customHeadRender: (value) => {
                    display: false;
                    filter: false;
                    sort: false;
                    searcheable: false;
                 },
                 customBodyRender: (value) => {
                    return (
                        <span hidden className="w-0">{value}</span>
                    );
                  },
                } 
            },
            {
             name: "apellidos",
             label: "Apellidos",
             options: {
              filter: true,
              sort: true,
             }
            },
            {
             name: "nombres",
             label: "Nombres",
             options: {
              filter: true,
              sort: true,
             }
            },
            {
                name: "cedula",
                label: "Cédula",
                options: {
                 filter: true,
                 sort: true,
                },
               },
               {
                name: "sector",
                label: "Sector Habilitado",
                options: {
                 filter: true,
                 sort: true,
                 display: this.state.tipo === "habilitadosEv"?true:false,
                 customBodyRender: (value) => {
                     if(this.state.tipo === "habilitadosEv"){
                        return (
                            <span className="text-normal text-info">{value}</span>
                        );
                     }
                  },
                },
               },
               {
                name: "alcance",
                label: "Alcance Habilitado",
                options: {
                 filter: true,
                 sort: true,
                 display: this.state.tipo === "habilitadosExp"?true:false,
                 customBodyRender: (value) => {
                    if(this.state.tipo === "habilitadosExp"){
                       return (
                           <span className="text-normal text-info">{value}</span>
                       );
                    }
                 },
                },
               },
               
            {
                name: "estado",
                label: "Estado",
                options: {
                 filter: true,
                 sort: true,
                 customBodyRender: (value) => {
                        return (
                            <span className="text-normal text-success">
                              {value}
                            </span>
                        );
                  },
                },
               },
               {
                name: "nombreEmpresa",
                label: "Empresa de experiencia",
                options: {
                 filter: true,
                 sort: true,
                },
               },
               {
                name: "cargoEjercido",
                label: "Cargo de Experiencia",
                options: {
                 filter: false,
                 sort: true,
                },
               },
               {
                name: "fechaInicio",
                label: "Inicio de Experiencia",
                options: {
                 filter: false,
                 sort: true,
                },
               },
               {
                name: "fechaFin",
                label: "Fin de Experiencia",
                options: {
                 filter: false,
                 sort: true,
                },
               },
            {
             name: "email",
             label: "Correo",
             options: {
              filter: false,
              sort: true,
             },
            },
            
            {
                name: "tipoPostulacion",
                label: "Tipo de Postulación",
                options: {
                 filter: true,
                 sort: true,
                }
               },
               {
                name: "fechaHabilitacion",
                label: "Fecha de Habilitación",
                options: {
                 filter: true,
                 sort: true,
                },
               },
               {
                name: "fechaNacimiento",
                label: "Fecha de Nacimiento",
                options: {
                 filter: true,
                 sort: true,
                },
               },
               {
                name: "telefono",
                label: "Teléfono",
                options: {
                 filter: true,
                 sort: true,
                },
               },
               {
                name: "ciudad",
                label: "Ciudad",
                options: {
                 filter: true,
                 sort: true,
                },
               },
               {
                name: "provincia",
                label: "Provincia",
                options: {
                 filter: true,
                 sort: true,
                },
               },
               {
                name: "disponibilidadViajar",
                label: "Disponibilidad para viajar",
                options: {
                 filter: true,
                 sort: true,
                 customBodyRender: (value, {rowData}, updateValue) => {
                        if(value===1){
                            return <span>Si</span>
                        }else{
                            return <span>No</span>
                        }
                  },
                },
               },
           ];

           const options = {
            selectableRowsOnClick: false,
            selectableRows: 'none',
            rowsPerPage: 5,
            rowsPerPageOptions: [5,10,15],
            filterType: 'checkbox',
            print: false,
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
                    <Header title="Visualizador"/>
                    <div className="d-flex flex-row h-85" >
                        <div className="d-flex flex-column align-items-center w-20">
                       
                                        {this.state.form === "expertos"&& this.state.tipo==="habilitadosExp" && (
                                        <React.Fragment>
                                            <div id="expertos" className=" d-flex card-list cardSAE-body text-normal align-items-center w-100 h-4" onClick={this.handleChangeTipo}>
                                                Expertos
                                            </div>
                                            <div className="d-flex flex-column w-100 align-items-end">
                                                <div id="habilitadosExp" className={" d-flex card-list cardSAE-body text-normal align-items-center w-75 h-4 bg-current"} onClick={this.handleChangeTipoPost}>
                                                    Habilitados
                                                </div>    
                                            </div>   
                                            <div id="evaluadores" className=" d-flex card-list cardSAE-body text-normal align-items-center w-100 h-4" onClick={this.handleChangeTipo}>
                                                Evaluadores
                                            </div> 
                                        </React.Fragment>)}
                                            {this.state.form === "evaluadores"&& this.state.tipo==="habilitadosEv" && (
                                            <React.Fragment>
                                                <div id="expertos" className=" d-flex card-list cardSAE-body text-normal align-items-center w-100 h-4" onClick={this.handleChangeTipo}>
                                                    Expertos
                                                </div>
                                              
                                                <div id="evaluadores" className=" d-flex card-list cardSAE-body text-normal align-items-center w-100 h-4" onClick={this.handleChangeTipo}>
                                                    Evaluadores
                                                </div> 
                                                <div className="d-flex flex-column w-100 align-items-end">
                                                    <div id="habilitadosEv" className={" d-flex card-list cardSAE-body text-normal align-items-center w-75 h-4 bg-current"} onClick={this.handleChangeTipoPost}>
                                                        Habilitados
                                                    </div>    
                                                </div> 
                                            </React.Fragment>)}
                        </div>
                            
                        <div className="cardSAE containersae w-80">
                                
                            <div className="cardSAE-body">
                            
                                {this.state.form === "expertos" && this.state.tipo==="habilitadosExp"&&(
                                    <MUIDataTable className="data-table"
                                        title={"Matriz de Expertos habilitados"}
                                        data={this.state.habilitadosExperto}
                                        columns={columns}
                                        options={options}
                                    />
                                )}
                                {this.state.form === "evaluadores" && this.state.tipo==="habilitadosEv"&&(
                                    <MUIDataTable className="data-table"
                                        title={"Matriz de Evaluadores habilitados"}
                                        data={this.state.habilitadosEvaluador}
                                        columns={columns}
                                        options={options}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                
                </React.Fragment>
        )
    }
}

if (document.getElementById('visualizador')) {
    ReactDOM.render(<Visualizador />, document.getElementById('visualizador'));
}
