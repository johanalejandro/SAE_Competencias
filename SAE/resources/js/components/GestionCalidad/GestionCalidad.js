import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MUIDataTable from "mui-datatables";
import Header from "../common/Header";
import axios from "axios";

export default class GestionCalidad extends Component {

    state = {
        postulante: [],
        porhabilitar: [],
        porasignar: [],
        form: "",
        tipo: "",
    }

    componentWillMount= async()=>{
        this.setState({
            form: "expertos",
            tipo: "porasignarExp",
        });

        let postulantes = [];
        let porasignar = [];
        let porhabilitar = [];
        await axios.get("api/postulantes")
        .then(({data} )=> {
            console.log(data);
            data.map((postulante)=>{
                let post ={};
                post['nombres'] = postulante.nombres;
                post['apellidos'] = postulante.apellidos;
                post['estado']= postulante.estado;
                post['email'] = postulante.email;
                post['tipoPostulacion'] = postulante.tipoPostulacion;
                postulantes.push(post);
            })
        })
        .catch(console.error);
        await this.setState({
            postulante: postulantes,
        })
        await axios.get("api/postulanteAsignar")
        .then(({data} ) => {
            data.map((postulante)=>{
                let post ={};
                post['nombres'] = postulante.nombres;
                post['apellidos'] = postulante.apellidos;
                post['estado']= postulante.estado;
                post['email'] = postulante.email;
                post['tipoPostulacion'] = postulante.tipoPostulacion;
                porasignar.push(post);
            })
        })
        .catch(console.error);
        await this.setState({
            porasignar: porasignar,
        })
        await axios.get("api/postulantePorHabilitar")
        .then(({data} ) => {
            data.map((postulante)=>{
                let post ={};
                post['nombres'] = postulante.nombres;
                post['apellidos'] = postulante.apellidos;
                post['estado']= postulante.estado;
                post['email'] = postulante.email;
                post['tipoPostulacion'] = postulante.tipoPostulacion;
                porhabilitar.push(post);
            })
        })
        .catch(console.error);
        await this.setState({
            porhabilitar: porhabilitar,
        })
}

    handleChangeTipo = ({target}) => {
        console.log(target);
        if(target.name){
            this.setState({
                form: target.name,
                tipo: target.name==="expertos"?"porasignarExp":"porasignarEv",
            })
        }
        if(target.id){
            this.setState({
                form: target.id,
                tipo: target.id==="expertos"?"porasignarExp":"porasignarEv",
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
        console.log("POSTULANTE RESPONSE",this.state.postulante);
        console.log("FORM",this.state.form);
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
                      <span className="text-warning-dark">
                        {value}
                      </span>
                    );
                  },
                },
               },
               {
                name:"acciones",
                label: "Acciones",
                options: {
                 filter: true,
                 sort: false,
                 customHeadRender: (value) => {
                    display: false;
                    filter: false;
                    sort: false;
                    searcheable: false;
                 },
                 customBodyRender: (value) => {
                    return (
                      <button className="btn-secondary">Asignar</button>
                    );
                  },
                },
               },
           ];

           let dataasignar = this.state.porasignar;
           let dataasignarExperto = dataasignar.filter((postulante)=>{
                return postulante.tipoPostulacion==="Experto"
            });
            let dataasignarEvaluador = dataasignar.filter((postulante)=>{
                return postulante.tipoPostulacion==="Evaluador"
            });
           let dataporhabilitar = this.state.porhabilitar;
           let dataporhabilitarExperto = dataporhabilitar.filter((postulante)=>{
                return postulante.tipoPostulacion==="Experto"
            });
            let dataporhabilitarEvaluador = dataporhabilitar.filter((postulante)=>{
                return postulante.tipoPostulacion==="Evaluador"
            });
            let datahabilitados = this.state.postulante;
            let datahabilitadosExperto = datahabilitados.filter((postulante)=>{
                return postulante.tipoPostulacion==="Experto"
            });
            let datahabilitadosEvaluador = datahabilitados.filter((postulante)=>{
                return postulante.tipoPostulacion==="Evaluador"
            });
            
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
                    <Header title="Gestión de Calidad"/>
                    <div className="d-flex flex-row h-85" >
                        <div className="d-flex flex-column align-items-center w-20">
                        {this.state.form === "expertos" && this.state.tipo==="porasignarExp" && (
                                        <React.Fragment>
                                            <div id="expertos" className=" d-flex card-list cardSAE-body text-normal align-items-center w-100 h-4" onClick={this.handleChangeTipo}>
                                                Expertos
                                            </div>
                                            <div className="d-flex flex-column w-100 align-items-end">
                                                
                                                <div id="porasignarExp" className=" d-flex card-list cardSAE-body text-normal text-left align-items-center w-75 h-4 bg-current" onClick={this.handleChangeTipoPost}>
                                                    Por Asignar
                                                </div>
                                                <div id="porhabilitarExp" className=" d-flex card-list cardSAE-body text-normal text-left align-items-center w-75 h-4" onClick={this.handleChangeTipoPost}>
                                                    Por Habilitar
                                                </div>
                                                <div id="habilitadosExp" className={" d-flex card-list cardSAE-body text-normal align-items-center w-75 h-4"} onClick={this.handleChangeTipoPost}>
                                                    Habilitados
                                                </div>    
                                            </div>   
                                            <div id="evaluadores" className=" d-flex card-list cardSAE-body text-normal align-items-center w-100 h-4" onClick={this.handleChangeTipo}>
                                                Evaluadores
                                            </div>                                     
                                        </React.Fragment>)}
                                    {this.state.form === "expertos"&& this.state.tipo==="porhabilitarExp" && (
                                        <React.Fragment>
                                            <div id="expertos" className=" d-flex card-list cardSAE-body text-normal align-items-center w-100 h-4" onClick={this.handleChangeTipo}>
                                                Expertos
                                            </div>
                                            <div className="d-flex flex-column w-100 align-items-end">
                                                
                                                <div id="porasignarExp" className=" d-flex card-list cardSAE-body text-normal text-left align-items-center w-75 h-4" onClick={this.handleChangeTipoPost}>
                                                    Por Asignar
                                                </div>
                                                <div id="porhabilitarExp" className=" d-flex card-list cardSAE-body text-normal text-left align-items-center w-75 h-4 bg-current" onClick={this.handleChangeTipoPost}>
                                                    Por Habilitar
                                                </div>
                                                <div id="habilitadosExp" className={" d-flex card-list cardSAE-body text-normal align-items-center w-75 h-4"} onClick={this.handleChangeTipoPost}>
                                                    Habilitados
                                                </div>    
                                            </div>   
                                            <div id="evaluadores" className=" d-flex card-list cardSAE-body text-normal align-items-center w-100 h-4" onClick={this.handleChangeTipo}>
                                                Evaluadores
                                            </div> 
                                        </React.Fragment>)}
                                        {this.state.form === "expertos"&& this.state.tipo==="habilitadosExp" && (
                                        <React.Fragment>
                                            <div id="expertos" className=" d-flex card-list cardSAE-body text-normal align-items-center w-100 h-4" onClick={this.handleChangeTipo}>
                                                Expertos
                                            </div>
                                            <div className="d-flex flex-column w-100 align-items-end">
                                                
                                                <div id="porasignarExp" className=" d-flex card-list cardSAE-body text-normal text-left align-items-center w-75 h-4" onClick={this.handleChangeTipoPost}>
                                                    Por Asignar
                                                </div>
                                                <div id="porhabilitarExp" className=" d-flex card-list cardSAE-body text-normal text-left align-items-center w-75 h-4" onClick={this.handleChangeTipoPost}>
                                                    Por Habilitar
                                                </div>
                                                <div id="habilitadosExp" className={" d-flex card-list cardSAE-body text-normal align-items-center w-75 h-4 bg-current"} onClick={this.handleChangeTipoPost}>
                                                    Habilitados
                                                </div>    
                                            </div>   
                                            <div id="evaluadores" className=" d-flex card-list cardSAE-body text-normal align-items-center w-100 h-4" onClick={this.handleChangeTipo}>
                                                Evaluadores
                                            </div> 
                                        </React.Fragment>)}
                                    {this.state.form === "evaluadores"&& this.state.tipo==="porasignarEv" && (
                                            <React.Fragment>
                                                <div id="expertos" className=" d-flex card-list cardSAE-body text-normal align-items-center w-100 h-4" onClick={this.handleChangeTipo}>
                                                    Expertos
                                                </div>
                                              
                                                <div id="evaluadores" className=" d-flex card-list cardSAE-body text-normal align-items-center w-100 h-4" onClick={this.handleChangeTipo}>
                                                    Evaluadores
                                                </div> 
                                                <div className="d-flex flex-column w-100 align-items-end">
                                                    
                                                    <div id="porasignarEv" className=" d-flex card-list cardSAE-body text-normal text-left align-items-center w-75 h-4 bg-current" onClick={this.handleChangeTipoPost}>
                                                        Por Asignar
                                                    </div>
                                                    <div id="porhabilitarEv" className=" d-flex card-list cardSAE-body text-normal text-left align-items-center w-75 h-4" onClick={this.handleChangeTipoPost}>
                                                        Por Habilitar
                                                    </div>
                                                    <div id="habilitadosEv" className={" d-flex card-list cardSAE-body text-normal align-items-center w-75 h-4 "} onClick={this.handleChangeTipoPost}>
                                                        Habilitados
                                                    </div>    
                                                </div> 
                                            </React.Fragment>)}
                                            {this.state.form === "evaluadores"&& this.state.tipo==="porhabilitarEv" && (
                                            <React.Fragment>
                                                <div id="expertos" className=" d-flex card-list cardSAE-body text-normal align-items-center w-100 h-4" onClick={this.handleChangeTipo}>
                                                    Expertos
                                                </div>
                                              
                                                <div id="evaluadores" className=" d-flex card-list cardSAE-body text-normal align-items-center w-100 h-4" onClick={this.handleChangeTipo}>
                                                    Evaluadores
                                                </div> 
                                                <div className="d-flex flex-column w-100 align-items-end">
                                                    
                                                    <div id="porasignarEv" className=" d-flex card-list cardSAE-body text-normal text-left align-items-center w-75 h-4 " onClick={this.handleChangeTipoPost}>
                                                        Por Asignar
                                                    </div>
                                                    <div id="porhabilitarEv" className=" d-flex card-list cardSAE-body text-normal text-left align-items-center w-75 h-4 bg-current" onClick={this.handleChangeTipoPost}>
                                                        Por Habilitar
                                                    </div>
                                                    <div id="habilitadosEv" className={" d-flex card-list cardSAE-body text-normal align-items-center w-75 h-4 "} onClick={this.handleChangeTipoPost}>
                                                        Habilitados
                                                    </div>    
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
                                                    
                                                    <div id="porasignarEv" className=" d-flex card-list cardSAE-body text-normal text-left align-items-center w-75 h-4 " onClick={this.handleChangeTipoPost}>
                                                        Por Asignar
                                                    </div>
                                                    <div id="porhabilitarEv" className=" d-flex card-list cardSAE-body text-normal text-left align-items-center w-75 h-4 " onClick={this.handleChangeTipoPost}>
                                                        Por Habilitar
                                                    </div>
                                                    <div id="habilitadosEv" className={" d-flex card-list cardSAE-body text-normal align-items-center w-75 h-4 "} onClick={this.handleChangeTipoPost}>
                                                        Habilitados
                                                    </div>    
                                                </div> 
                                            </React.Fragment>)}
                        </div>
                            
                        <div className="cardSAE containersae w-80">
                                
                            <div className="cardSAE-body">
                            {this.state.form === "expertos" && this.state.tipo==="porasignarExp" &&(
                                    <MUIDataTable className="data-table"
                                        title={"Postulantes Expertos por Asignar Experto Padre"}
                                        data={dataasignarExperto}
                                        columns={columns}
                                        options={options}
                                    />
                                )}
                                {this.state.form === "expertos" && this.state.tipo==="porhabilitarExp"&&(
                                    <MUIDataTable className="data-table"
                                        title={"Postulantes a Expertos aprobados por habilitar"}
                                        data={dataporhabilitarExperto}
                                        columns={columns}
                                        options={options}
                                    />
                                )}
                                {this.state.form === "expertos" && this.state.tipo==="habilitadosExp"&&(
                                    <MUIDataTable className="data-table"
                                        title={"Matriz de Expertos habilitados"}
                                        data={datahabilitadosExperto}
                                        columns={columns}
                                        options={options}
                                    />
                                )}
                                {this.state.form === "evaluadores" && this.state.tipo==="porasignarEv"&&(
                                    <MUIDataTable className="data-table"
                                        title={"Postulantes a Evaluadores por Asignar Evaluador Padre"}
                                        data={dataasignarEvaluador}
                                        columns={columns}
                                        options={options}
                                    />
                                )}
                                {this.state.form === "evaluadores" && this.state.tipo==="porhabilitarEv"&&(
                                    <MUIDataTable className="data-table"
                                        title={"Postulantes a Evaluadores aprobados por habilitar"}
                                        data={dataporhabilitarEvaluador}
                                        columns={columns}
                                        options={options}
                                    />
                                )}
                                {this.state.form === "evaluadores" && this.state.tipo==="habilitadosEv"&&(
                                    <MUIDataTable className="data-table"
                                        title={"Matriz de Evaluadores habilitados"}
                                        data={datahabilitadosEvaluadores}
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

if (document.getElementById('gestion-calidad')) {
    ReactDOM.render(<GestionCalidad />, document.getElementById('gestion-calidad'));
}
