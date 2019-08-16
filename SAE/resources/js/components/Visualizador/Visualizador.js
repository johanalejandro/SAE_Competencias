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
        .then(async({data} ) => {
            const postulantes = data.map((postulante)=>{
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
                return post;
            })
            const postulantesUnico = uniqBy(postulantes,'id_postulante');
            const experiencias = data.map((postulante)=>{
                let experiencia = {};
                experiencia['id_postulante'] = postulante.id_postulante;
                experiencia['nombreEmpresa'] = postulante.nombreEmpresa;
                experiencia['cargoEjercido'] = postulante.cargoEjercido;
                experiencia['descripcion'] = postulante.descripcion;
                experiencia['id_sector_requerimiento'] = postulante.id_sector_requerimiento;
                return experiencia;
            })

            let postulantesHabilitados = {};
            for (let i = 0; i < postulantesUnico.length; i++) {
                const postulante = postulantesUnico[i];
                postulantesHabilitados['id_postulante'] = postulante.id_postulante;
                        postulantesHabilitados['nombres'] = postulante.nombres;
                        postulantesHabilitados['apellidos'] = postulante.apellidos;
                        postulantesHabilitados['estado']= postulante.estado;
                        postulantesHabilitados['email'] = postulante.email;
                        postulantesHabilitados['tipoPostulacion'] = postulante.tipoPostulacion;
                        postulantesHabilitados['fechaHabilitacion'] = postulante.fechaHabilitacion;
                        postulantesHabilitados['disponibilidadViajar'] = postulante.disponibilidadViajar;
                        postulantesHabilitados['cedula'] = postulante.cedula;
                        postulantesHabilitados['experiencias']=[];
                for (let index = 0; index < experiencias.length; index++) {
                    const experiencia = experiencias[index];
                    let exp = {};
                    if (postulante.id_postulante===experiencia.id_postulante) {
                        exp['nombreEmpresa'] = experiencia.nombreEmpresa;
                        exp['cargoEjercido'] = experiencia.cargoEjercido;
                        exp['descripcion'] = experiencia.descripcion;
                        exp['requerimiento'] = await this.getRequerimiento(experiencia.id_sector_requerimiento);
                        exp['tipoPostulacion'] = postulante.tipoPostulacion;
                    }
                    
                    postulantesHabilitados['experiencias'].push(exp)
                }
                habilitadosEvaluador.push(postulantesHabilitados);
                
            }
        })
        .catch(console.error);
        await this.setState({
            habilitadosEvaluador: habilitadosEvaluador,
        })
        await axios.get("api/mostrarExpertosHabilitado")
        .then(async({data} ) => {
            const postulantes = data.map((postulante)=>{
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
                return post;
            })
            const postulantesUnico = uniqBy(postulantes,'id_postulante');
            const experiencias = data.map((postulante)=>{
                let experiencia = {};
                experiencia['id_postulante'] = postulante.id_postulante;
                experiencia['nombreEmpresa'] = postulante.nombreEmpresa;
                experiencia['cargoEjercido'] = postulante.cargoEjercido;
                experiencia['descripcion'] = postulante.descripcion;
                experiencia['id_alcance'] = postulante.id_alcance;
                return experiencia;
            })

            let postulantesHabilitados = {};
            for (let i = 0; i < postulantesUnico.length; i++) {
                const postulante = postulantesUnico[i];
                postulantesHabilitados['id_postulante'] = postulante.id_postulante;
                        postulantesHabilitados['nombres'] = postulante.nombres;
                        postulantesHabilitados['apellidos'] = postulante.apellidos;
                        postulantesHabilitados['estado']= postulante.estado;
                        postulantesHabilitados['email'] = postulante.email;
                        postulantesHabilitados['tipoPostulacion'] = postulante.tipoPostulacion;
                        postulantesHabilitados['fechaHabilitacion'] = postulante.fechaHabilitacion;
                        postulantesHabilitados['disponibilidadViajar'] = postulante.disponibilidadViajar;
                        postulantesHabilitados['cedula'] = postulante.cedula;
                        postulantesHabilitados['experiencias']=[];
                for (let index = 0; index < experiencias.length; index++) {
                    const experiencia = experiencias[index];
                    let exp = {};
                    if (postulante.id_postulante===experiencia.id_postulante) {
                        exp['nombreEmpresa'] = experiencia.nombreEmpresa;
                        exp['cargoEjercido'] = experiencia.cargoEjercido;
                        exp['descripcion'] = experiencia.descripcion;
                        exp['alcance'] = await this.getAlcance(experiencia.id_alcance);
                        exp['tipoPostulacion'] = postulante.tipoPostulacion;
                    }
                    
                    postulantesHabilitados['experiencias'].push(exp)
                }
                habilitadosExperto.push(postulantesHabilitados);
                
            }
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
             name: "tipoPostulacion",
             label: "Tipo de Postulación",
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
                    if(toUpper(value)==="POR ASIGNAR"){
                        return (
                            <span className="text-warning-dark">
                              {value}
                            </span>
                        );
                    }
                    if(toUpper(value)==="POR HABILITAR"){
                        return (
                            <span className="text-success">
                              {value}
                            </span>
                        );
                    }
                    if(toUpper(value)==="HABILITADO"){
                        return (
                            <span className="text-normal">
                              {value}
                            </span>
                        );
                    }
                  },
                },
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
               {
                name:"estado",
                label: "Acciones",
                options: {
                 filter: true,
                 sort: false,
                 display: this.state.tipo==="habilitadosExp" || this.state.tipo === "habilitadosEv"?false:true,
                 customHeadRender: (value) => {
                    display: false;
                    filter: false;
                    sort: false;
                    searcheable: false;
                 },
                 customBodyRender: (value, {rowData}, updateValue) => {
                    if(toUpper(value)==="POR ASIGNAR"){
                        return (
                            <button className="btn-secondary" onClick={async() =>{
                                await this.getUsuario(rowData);
                                await this.selectModalAsignar ({
                                    type: "Asignar",
                                    data: rowData,
                                })
                            } }>Asignar</button>
                        );
                    }
                    if(toUpper(value)==="POR HABILITAR"){
                        return (
                            <button className="btn-secondary" onClick={() => this.selectModal({
                                type:'Habilitar',
                                data: rowData,
                                updateValue: updateValue,
                            })
                            }>Habilitar</button>
                        );
                    }
                  },
                },
               },
               {
                name:"experiencias",
                label: "Experiencias",
                options: {
                 filter: false,
                 sort: false,
                 display: this.state.tipo==="habilitadosExp" || this.state.tipo === "habilitadosEv"?true:false,
                 customBodyRender: (value, {rowData}, updateValue) => {
                        return (
                            <button className="btn-secondary" onClick={() => this.selectModal({
                                type: "Experiencias",
                                data: value,
                                updateValue: updateValue,
                            })
                            }>Experiencias</button>
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
