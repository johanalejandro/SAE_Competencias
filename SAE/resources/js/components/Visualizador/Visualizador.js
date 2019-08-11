import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MUIDataTable from "mui-datatables";
import Header from "../common/Header";
import axios from "axios";

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
            data.map((postulante)=>{
                let post ={};
                post['nombres'] = postulante.nombres;
                post['apellidos'] = postulante.apellidos;
                post['estado']= postulante.estado;
                post['email'] = postulante.email;
                post['tipoPostulacion'] = postulante.tipoPostulacion;
                habilitadosEvaluador.push(post);
            })
        })
        .catch(console.error);
        await this.setState({
            habilitadosEvaluador: habilitadosEvaluador,
        })
        await axios.get("api/mostrarExpertosHabilitado")
        .then(({data} ) => {
            data.map((postulante)=>{
                let post ={};
                post['nombres'] = postulante.nombres;
                post['apellidos'] = postulante.apellidos;
                post['estado']= postulante.estado;
                post['email'] = postulante.email;
                post['tipoPostulacion'] = postulante.tipoPostulacion;
                habilitadosExperto.push(post);
            })
        })
        .catch(console.error);
        await this.setState({
            habilitadosExperto: habilitadosExperto,
        })
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
   
    render() {
        console.log("POSTULANTE RESPONSE",this.state.habilitadosEvaluador);
        console.log("POSTULANTE RESPONSE",this.state.habilitadosExperto);
        const columns = [
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
             name: "tipoPostulacion",
             label: "Tipo de Postulación",
             options: {
              filter: true,
              sort: true,
             }
            },
            {
             name: "email",
             label: "Correo",
             options: {
              filter: true,
              sort: false,
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
                    <span className="text-uppercase">
                        {value}
                      </span>
                    );
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
