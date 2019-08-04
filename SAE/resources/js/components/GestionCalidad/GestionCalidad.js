import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MUIDataTable from "mui-datatables";
import Header from "../common/Header";

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
            form: "todos",
            tipo: "",
        });

        let postulantes = [];
        let porasignar = [];
        let porhabilitar = [];
        await fetch('/api/postulantes')
        .then(response => {
            return response.json();
        })
        .then(postulantesResponse => {
            postulantesResponse.map((postulante)=>{
                let post ={};
                post['nombres'] = postulante.nombres;
                post['apellidos'] = postulante.apellidos;
                post['estado']= postulante.estado;
                post['email'] = postulante.email;
                post['tipoPostulacion'] = postulante.tipoPostulacion;
                postulantes.push(post);
            })
        }).catch(error => {
            console.log("===ERROR: ",error);
        });

        await this.setState({
            postulante: postulantes,
        })

        await fetch('/api/postulanteAsignar')
        .then(response => {
            return response.json();
        })
        .then(postulantesResponse => {
            postulantesResponse.map((postulante)=>{
                let post ={};
                post['nombres'] = postulante.nombres;
                post['apellidos'] = postulante.apellidos;
                post['estado']= postulante.estado;
                post['email'] = postulante.email;
                post['tipoPostulacion'] = postulante.tipoPostulacion;
                porasignar.push(post);
            })
        }).catch(error => {
            console.log("===ERROR: ",error);
        });

        await this.setState({
            porasignar: porasignar,
        })

        await fetch('/api/postulantePorHabilitar')
        .then(response => {
            return response.json();
        })
        .then(postulantesResponse => {
            postulantesResponse.map((postulante)=>{
                let post ={};
                post['nombres'] = postulante.nombres;
                post['apellidos'] = postulante.apellidos;
                post['estado']= postulante.estado;
                post['email'] = postulante.email;
                post['tipoPostulacion'] = postulante.tipoPostulacion;
                porhabilitar.push(post);
            })
        }).catch(error => {
            console.log("===ERROR: ",error);
        });

        await this.setState({
            porhabilitar: porhabilitar,
        })

    }

    handleChangeTipo = ({target}) => {
        if(target.name){
            this.setState({
                form: target.name,
                tipo: "",
            })
        }
        if(target.id){
            this.setState({
                form: target.id,
                tipo: "",
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
            
           let data = this.state.postulante;
           let dataasignar = this.state.porasignar;
           let dataporhabilitar = this.state.porhabilitar;

           const datos = [
            ["Joe James", "Test Corp", "Yonkers", "NY"],
            ["John Walsh", "Test Corp", "Hartford", "CT"],
            ["Bob Herm", "Test Corp", "Tampa", "FL"],
            ["James Houston", "Test Corp", "Dallas", "TX"],
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
                    <Header title="Gestión de Calidad"/>
                    <div className="d-flex flex-row h-85" >
                        <div className="d-flex flex-column align-items-center w-20">
                        {this.state.form === "todos" && this.state.tipo==="" && (
                                        <React.Fragment>
                                            <div id="todos" className={" d-flex card-list cardSAE-body text-normal align-items-center w-100 h-4 bg-current"} onClick={this.handleChangeTipo}>
                                                Postulantes
                                            </div>
                                            <div className="d-flex flex-column w-100 align-items-end">
                                                <div id="porasignar" className=" d-flex card-list cardSAE-body text-normal text-left align-items-center w-75 h-4" onClick={this.handleChangeTipoPost}>
                                                    Por Asignar
                                                </div>
                                                <div id="porhabilitar" className=" d-flex card-list cardSAE-body text-normal text-left align-items-center w-75 h-4" onClick={this.handleChangeTipoPost}>
                                                    Por Habilitar
                                                </div>     
                                            </div>   
                                            <div id="expertos" className=" d-flex card-list cardSAE-body text-normal align-items-center w-100 h-4" onClick={this.handleChangeTipo}>
                                                Expertos
                                            </div>
                                            <div id="evaluadores" className=" d-flex card-list cardSAE-body text-normal align-items-center w-100 h-4" onClick={this.handleChangeTipo}>
                                                Evaluadores
                                            </div>                                  
                                        </React.Fragment>)}
                                    {this.state.form === "todos" && this.state.tipo==="porhabilitar" && (
                                        <React.Fragment>
                                            <div id="todos" className={" d-flex card-list cardSAE-body text-normal align-items-center w-100 h-4 bg-current"} onClick={this.handleChangeTipo}>
                                                Postulantes
                                            </div>
                                            <div className="d-flex flex-column w-100 align-items-end">
                                                <div id="porasignar" className=" d-flex card-list cardSAE-body text-normal text-left align-items-center w-75 h-4" onClick={this.handleChangeTipoPost}>
                                                    Por Asignar
                                                </div>
                                                <div id="porhabilitar" className=" d-flex card-list cardSAE-body text-normal text-left align-items-center w-75 h-4 bg-current" onClick={this.handleChangeTipoPost}>
                                                    Por Habilitar
                                                </div>     
                                            </div>  
                                            <div id="expertos" className=" d-flex card-list cardSAE-body text-normal align-items-center w-100 h-4" onClick={this.handleChangeTipo}>
                                                Expertos
                                            </div>
                                            <div id="evaluadores" className=" d-flex card-list cardSAE-body text-normal align-items-center w-100 h-4" onClick={this.handleChangeTipo}>
                                                Evaluadores
                                            </div>                                  
                                        </React.Fragment>)}
                                        {this.state.form === "todos" && this.state.tipo==="porasignar" && (
                                        <React.Fragment>
                                            <div id="todos" className={" d-flex card-list cardSAE-body text-normal align-items-center w-100 h-4 bg-current"} onClick={this.handleChangeTipo}>
                                                Postulantes
                                            </div>
                                            <div className="d-flex flex-column w-100 align-items-end">
                                                <div id="porasignar" className=" d-flex card-list cardSAE-body text-normal text-left align-items-center w-75 h-4 bg-current" onClick={this.handleChangeTipoPost}>
                                                    Por Asignar
                                                </div>
                                                <div id="porhabilitar" className=" d-flex card-list cardSAE-body text-normal text-left align-items-center w-75 h-4" onClick={this.handleChangeTipoPost}>
                                                    Por Habilitar
                                                </div>     
                                            </div>   
                                            <div id="expertos" className=" d-flex card-list cardSAE-body text-normal align-items-center w-100 h-4" onClick={this.handleChangeTipo}>
                                                Expertos
                                            </div>
                                            <div id="evaluadores" className=" d-flex card-list cardSAE-body text-normal align-items-center w-100 h-4" onClick={this.handleChangeTipo}>
                                                Evaluadores
                                            </div>                                  
                                        </React.Fragment>)}
                                    {this.state.form === "expertos"&& this.state.tipo==="" && (
                                        <React.Fragment>
                                            <div id="todos" className={" d-flex card-list cardSAE-body text-normal align-items-center w-100 h-4"} onClick={this.handleChangeTipo}>
                                                Postulantes
                                            </div>
                                            <div id="expertos" className=" d-flex card-list cardSAE-body text-normal align-items-center w-100 h-4 bg-current" onClick={this.handleChangeTipo}>
                                                Expertos
                                            </div>
                                            <div id="evaluadores" className=" d-flex card-list cardSAE-body text-normal align-items-center w-100 h-4" onClick={this.handleChangeTipo}>
                                                Evaluadores
                                            </div>
                                        </React.Fragment>)}
                                    {this.state.form === "evaluadores"&& this.state.tipo==="" && (
                                            <React.Fragment>
                                                <div id="todos" className={" d-flex card-list cardSAE-body text-normal align-items-center w-100 h-4"} onClick={this.handleChangeTipo}>
                                                    Postulantes
                                                </div>
                                                <div id="expertos" className=" d-flex card-list cardSAE-body text-normal align-items-center w-100 h-4" onClick={this.handleChangeTipo}>
                                                    Expertos
                                                </div>
                                                <div id="evaluadores" className=" d-flex card-list cardSAE-body text-normal align-items-center w-100 h-4 bg-current" onClick={this.handleChangeTipo}>
                                                    Evaluadores
                                                </div>
                                            </React.Fragment>)}
                        </div>
                            
                        <div className="cardSAE containersae w-80">
                                
                            <div className="cardSAE-body">
                                {this.state.form === "todos" && this.state.tipo===""&&(
                                    <MUIDataTable className="data-table"
                                        title={"Listado de Postulantes a Expertos/Evaluadores"}
                                        data={data}
                                        columns={columns}
                                        options={options}
                                    />
                                )}
                                {this.state.form === "todos" && this.state.tipo==="porhabilitar"&&(
                                    <MUIDataTable className="data-table"
                                        title={"Listado de Postulantes por habilitar"}
                                        data={dataporhabilitar}
                                        columns={columns}
                                        options={options}
                                    />
                                )}
                                {this.state.form === "todos" && this.state.tipo==="porasignar"&&(
                                    <MUIDataTable className="data-table"
                                        title={"Listado de Postulantes por asignar"}
                                        data={dataasignar}
                                        columns={columns}
                                        options={options}
                                    />
                                )}
                                {this.state.form === "expertos" && this.state.tipo==="" &&(
                                    <MUIDataTable className="data-table"
                                        title={"Listado de Expertos"}
                                        data={datos}
                                        columns={columns}
                                        options={options}
                                    />
                                )}
                                {this.state.form === "evaluadores" && this.state.tipo===""&&(
                                    <MUIDataTable className="data-table"
                                        title={"Listado de Evaluadores"}
                                        data={datos}
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
