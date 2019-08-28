import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MUIDataTable from "mui-datatables";
import Header from "../common/Header";
import Modal from "./Modal";
import axios from "axios";
import toUpper from "lodash/toUpper";
import remove from "lodash/remove";
import uniqBy from "lodash/uniqBy";
import clone from 'lodash/clone';
import findKey from 'lodash/findKey';



export default class Evaluacion extends Component {

    state = {
        expertosPorEvaluar: [],
        evaluadoresPorEvaluar: [],
        form: "",
        modal: false,
        modalInfo: {},
    }
      
      selectModal = (info = {}) => {
        this.setState({
          modal: !this.state.modal,
          modalInfo: info,
        })
      }

    componentWillMount= async()=>{
        this.setState({
            form: "expertos",
        });

        let expertosPorEvaluar = [];
        let expertoPorEvaluar = {};
        await axios.get("/verSolicitudPorUsuarioExperto/")
        .then(async({data} ) => {
            console.log(data);
            const postulantes = await data.map((postulante)=>{
                let post ={};
                post['id_postulante'] = postulante.id_postulante;
                post['id_solicitud'] = postulante.id_solicitud;
                post['nombres'] = postulante.nombres;
                post['apellidos'] = postulante.apellidos;
                post['estado']= postulante.estado;
                post['email'] = postulante.email;
                post['tipoPostulacion'] = postulante.tipoPostulacion;
                post['fechaHabilitacion'] = postulante.fechaHabilitacion;
                post['disponibilidadViajar'] = postulante.disponibilidadViajar;
                post['cedula'] = postulante.cedula;
                post['nombreInstitucion'] =postulante.nombreInstitucion;
                post['tituloObtenido']=postulante.tituloObtenido;
                post['tipoFormacion']=postulante.tipoFormacion;
                post['id_educacion']=postulante.id_educacion;
                return post;
            })
            const postulantesUnico = uniqBy(postulantes,'id_solicitud');
            const experiencias = await data.map((postulante)=>{
                let experiencia = {};
                experiencia['id_postulante'] = postulante.id_postulante;
                experiencia['nombreEmpresa'] = postulante.nombreEmpresa;
                experiencia['cargoEjercido'] = postulante.cargoEjercido;
                experiencia['descripcion'] = postulante.descripcion;
                experiencia['id_alcance'] = postulante.id_alcance;
                experiencia['estado'] = postulante.estado;
                experiencia['fecha_inicio'] = postulante.fecha_inicio;
                experiencia['fecha_fin'] = postulante.fecha_fin;
                return experiencia;
            })
            const experiencies = uniqBy(experiencias,'id_alcance')
            for (let i = 0; i < postulantesUnico.length; i++) {
                const postul = postulantesUnico[i];
                expertoPorEvaluar['id_postulante'] = postul.id_postulante;
                expertoPorEvaluar['id_solicitud'] = postul.id_solicitud;
                expertoPorEvaluar['nombres'] = postul.nombres;
                expertoPorEvaluar['apellidos'] = postul.apellidos;
                        expertoPorEvaluar['estado']= postul.estado;
                        expertoPorEvaluar['email'] = postul.email;
                        expertoPorEvaluar['tipoPostulacion'] = postul.tipoPostulacion;
                        expertoPorEvaluar['fechaHabilitacion'] = postul.fechaHabilitacion;
                        expertoPorEvaluar['disponibilidadViajar'] = postul.disponibilidadViajar;
                        expertoPorEvaluar['cedula'] = postul.cedula;
                        expertoPorEvaluar['educacion']={
                            id_educacion: postul.id_educacion,
                            nombreInstitucion : postul.nombreInstitucion,
                            tituloObtenido : postul.tituloObtenido,
                            tipoFormacion :postul.tipoFormacion,
                        }
                        expertoPorEvaluar['experiencias']=[];
                for (let index = 0; index < experiencies.length; index++) {
                    const experiencia = experiencies[index];
                    let exp = {};
                    if (postul.id_postulante===experiencia.id_postulante) {
                        exp['id_alcance'] = experiencia.id_alcance;
                        exp['nombreEmpresa'] = experiencia.nombreEmpresa;
                        exp['cargoEjercido'] = experiencia.cargoEjercido;
                        exp['descripcion'] = experiencia.descripcion;
                        exp['estado'] = experiencia.estado;
                        exp['alcance'] = await this.getAlcance(experiencia.id_alcance);
                        exp['tipoPostulacion'] = postul.tipoPostulacion;
                        exp['fecha_inicio'] = experiencia.fecha_inicio;
                        exp['fecha_fin'] = experiencia.fecha_fin;
                        expertoPorEvaluar['experiencias'].push(exp);
                        
                    }
                    
                }
                console.log(expertoPorEvaluar.id_postulante,expertoPorEvaluar);
                expertosPorEvaluar[i] = await expertoPorEvaluar;
            }
             console.log(expertosPorEvaluar)
             await this.setState({
                expertosPorEvaluar: expertosPorEvaluar,
            })
        })
        .catch(console.error);

        let evaluadoresPorEvaluar = [];
        let evaluadorPorEvaluar = {};
        await axios.get("/verSolicitudPorUsuarioEvaluador/")
        .then(async({data} ) => {
            console.log(data);
            const postulantes = await data.map((postulante)=>{
                let post ={};
                post['id_postulante'] = postulante.id_postulante;
                post['id_solicitud'] = postulante.id_solicitud;
                post['nombres'] = postulante.nombres;
                post['apellidos'] = postulante.apellidos;
                post['estado']= postulante.estado;
                post['email'] = postulante.email;
                post['tipoPostulacion'] = postulante.tipoPostulacion;
                post['fechaHabilitacion'] = postulante.fechaHabilitacion;
                post['disponibilidadViajar'] = postulante.disponibilidadViajar;
                post['cedula'] = postulante.cedula;
                post['nombreInstitucion'] =postulante.nombreInstitucion;
                post['tituloObtenido']=postulante.tituloObtenido;
                post['tipoFormacion']=postulante.tipoFormacion;
                post['id_educacion']=postulante.id_educacion;
                return post;
            })
            const postulantesUnico = uniqBy(postulantes,'id_solicitud');
            const experiencias = await data.map((postulante)=>{
                let experiencia = {};
                experiencia['id_postulante'] = postulante.id_postulante;
                experiencia['nombreEmpresa'] = postulante.nombreEmpresa;
                experiencia['cargoEjercido'] = postulante.cargoEjercido;
                experiencia['descripcion'] = postulante.descripcion;
                experiencia['id_sector'] = postulante.id_sector;
                experiencia['estado'] = postulante.estado;
                experiencia['fecha_inicio'] = postulante.fecha_inicio;
                experiencia['fecha_fin'] = postulante.fecha_fin;
                return experiencia;
            });
            const experiencies = uniqBy(experiencias,'id_sector');
            const cursos = await data.map((postulante)=>{
                let curso = {};
                curso['id_postulante'] = postulante.id_postulante;
                curso['nombreInstitucionCurso'] = postulante.nombreInstitucionCurso;
                curso['numeroHoras'] = postulante.numeroHoras;
                curso['id_curso_evaluador'] = postulante.id_curso_evaluador;
                curso['id_sector_requerimiento'] = postulante.id_sector_requerimiento;
                return curso;
            });
            const courses = uniqBy(cursos,'id_sector_requerimiento');
            for (let i = 0; i < postulantesUnico.length; i++) {
                const postul = postulantesUnico[i];
                evaluadorPorEvaluar['id_postulante'] = postul.id_postulante;
                evaluadorPorEvaluar['id_solicitud'] = postul.id_solicitud;
                evaluadorPorEvaluar['nombres'] = postul.nombres;
                evaluadorPorEvaluar['apellidos'] = postul.apellidos;
                evaluadorPorEvaluar['estado']= postul.estado;
                evaluadorPorEvaluar['email'] = postul.email;
                evaluadorPorEvaluar['tipoPostulacion'] = postul.tipoPostulacion;
                evaluadorPorEvaluar['fechaHabilitacion'] = postul.fechaHabilitacion;
                evaluadorPorEvaluar['disponibilidadViajar'] = postul.disponibilidadViajar;
                evaluadorPorEvaluar['cedula'] = postul.cedula;
                evaluadorPorEvaluar['educacion']={
                            id_educacion: postul.id_educacion,
                            nombreInstitucion : postul.nombreInstitucion,
                            tituloObtenido : postul.tituloObtenido,
                            tipoFormacion :postul.tipoFormacion,
                        }
                        evaluadorPorEvaluar['experiencias']=[];
                        evaluadorPorEvaluar['cursos']=[];
                for (let index = 0; index < experiencies.length; index++) {
                    const experiencia = experiencies[index];
                    let exp = {};
                    if (postul.id_postulante===experiencia.id_postulante) {
                        exp['id_sector'] = experiencia.id_sector;
                        exp['nombreEmpresa'] = experiencia.nombreEmpresa;
                        exp['cargoEjercido'] = experiencia.cargoEjercido;
                        exp['descripcion'] = experiencia.descripcion;
                        exp['sector'] = await this.getSector(experiencia.id_sector);
                        exp['tipoPostulacion'] = postul.tipoPostulacion;
                        exp['estado'] = experiencia.estado;
                        exp['fecha_inicio'] = experiencia.fecha_inicio;
                        exp['fecha_fin'] = experiencia.fecha_fin;
                        evaluadorPorEvaluar['experiencias'].push(exp);
                        
                    }
                    
                }
                for (let index = 0; index < courses.length; index++) {
                    const curso = courses[index];
                    let curs = {};
                    if (postul.id_postulante===curso.id_postulante) {
                        curs['id_sector_requerimiento'] = curso.id_sector_requerimiento;
                        curs['nombreInstitucionCurso'] = curso.nombreInstitucionCurso;
                        curs['numeroHoras'] = curso.numeroHoras;
                        curs['id_curso_evaluador'] = curso.id_curso_evaluador;
                        curs['sector'] = await this.getRequerimiento(curso.id_sector_requerimiento);
                        curs['tipoPostulacion'] = postul.tipoPostulacion;
                        evaluadorPorEvaluar['cursos'].push(curs);
                        
                    }
                    
                }
                console.log(expertoPorEvaluar.id_postulante,evaluadorPorEvaluar);
                evaluadoresPorEvaluar[i] = await evaluadorPorEvaluar;
            }
             console.log(evaluadoresPorEvaluar)
             await this.setState({
                evaluadoresPorEvaluar: evaluadoresPorEvaluar,
            })
        })
        .catch(console.error);
        
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

getRequerimiento =async (id) => {
    let requerimiento = "";
    await axios.get('/api/sector/'+id)
    .then(({data} )=> {
        requerimiento = data.requerimiento;
    }).catch(error => {
        console.log("===ERROR: ",error);
    });
    return requerimiento;
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

    guardarEvaluacionExperto =async(id_solicitud,detalleEvaluacion,tipoEvaluacion,resultadoEvaluacion,archivoAnexo,estados) => {
        let formData =  new FormData();
        formData.append("id_solicitud",id_solicitud);
        formData.append("detalleEvaluacion",detalleEvaluacion);
        formData.append("tipoEvaluacion",tipoEvaluacion);
        formData.append("resultadoEvaluacion",resultadoEvaluacion);
        formData.append("archivoAnexo",archivoAnexo);
        formData.append("estados",JSON.stringify(estados));
        await axios.post("api/guardarEvaluacionExperto/",formData,{
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        .then(async(response ) => {
            await console.log(response);
            await location.reload();
        })
        .catch(console.error);
    }

    guardarEvaluacionEvaluador =async(id_solicitud,detalleEvaluacion,tipoEvaluacion,resultadoEvaluacion,archivoAnexo,estados) => {
        let formData =  new FormData();
        formData.append("id_solicitud",id_solicitud);
        formData.append("detalleEvaluacion",detalleEvaluacion);
        formData.append("tipoEvaluacion",tipoEvaluacion);
        formData.append("resultadoEvaluacion",resultadoEvaluacion);
        formData.append("archivoAnexo",archivoAnexo);
        formData.append("estados",JSON.stringify(estados));
        await axios.post("api/guardarEvaluacionEvaluador/",formData,{
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        .then(async(response ) => {
            await console.log(response);
            //await location.reload();
        })
        .catch(console.error);
    }

    finalizarEvaluacionExperto =async(id_solicitud,detalleEvaluacion,tipoEvaluacion,resultadoEvaluacion,archivoAnexo,estados) => {
         let formData =  new FormData();
        formData.append("id_solicitud",id_solicitud);
        formData.append("detalleEvaluacion",detalleEvaluacion);
        formData.append("tipoEvaluacion",tipoEvaluacion);
        formData.append("resultadoEvaluacion",resultadoEvaluacion);
        formData.append("archivoAnexo",archivoAnexo);
        formData.append("estados",JSON.stringify(estados));
        await axios.post("api/finalizarEvaluacionExperto/",formData,{
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        .then(async(response ) => {
            await console.log(response);
            await location.reload();
        })
        .catch(console.error);
      
    }

    finalizarEvaluacionEvaluador =async(id_solicitud,detalleEvaluacion,tipoEvaluacion,resultadoEvaluacion,archivoAnexo,estados) => {
        let formData =  new FormData();
       formData.append("id_solicitud",id_solicitud);
       formData.append("detalleEvaluacion",detalleEvaluacion);
       formData.append("tipoEvaluacion",tipoEvaluacion);
       formData.append("resultadoEvaluacion",resultadoEvaluacion);
       formData.append("archivoAnexo",archivoAnexo);
       formData.append("estados",JSON.stringify(estados));
       await axios.post("api/finalizarEvaluacionEvaluador/",formData,{
           headers: {
               "Content-Type": "multipart/form-data",
           },
       })
       .then(async(response ) => {
        await console.log(response);
           await location.reload();
       })
       .catch(console.error);
     
   }

    handleChangeTipo = ({target}) => {
        if(target.name){
            this.setState({
                form: target.name,
            })
        }
        if(target.id){
            this.setState({
                form: target.id,
            })
        }
    }
   
    render() {
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
                name: "experiencias",
                label: "Experiencas",
                options: {
                 filter: true,
                 sort: false,
                 display: false,
                },
                customBodyRender: () => {
                    return <span>Experiencias</span>
                },
               },
               {
                name: "educacion",
                label: "Educación",
                options: {
                 filter: true,
                 sort: false,
                 display: false,
                },
                customBodyRender: () => {
                    return <span>Educación</span>
                },
               },
            {
                name: "estado",
                label: "Estado",
                options: {
                 filter: true,
                 sort: true,
                 customBodyRender: (value) => {
                    return <span className="text-danger">
                              Por Evaluar
                        </span>
                    
                  },
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
                name:"tipoPostulacion",
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
                 customBodyRender: (value, {rowData}, updateValue) => {
                            return (
                                <button className="btn-secondary" onClick={async() =>{ 
                                    //await funcion para setear detalles de evaluacion de existir
                                    this.selectModal({
                                        type: value,
                                        data: rowData,
                                        updateValue: updateValue,
                                    })
                                }
                                }>Evaluar</button>)
                  },
                },
               },
               {
                   name: "id_solicitud",
                   label: "id_solicitud",
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
                   } 
               },
               {
                name: "cursos",
                label: "Cursos",
                options: {
                 filter: true,
                 sort: false,
                 display: false,
                },
                customBodyRender: () => {
                    return <span>Cursos</span>
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
                    <Header title="Evaluación"/>
                    <div className="d-flex flex-row h-85" >
                        <div className="d-flex flex-column align-items-center w-20">
                        {this.state.form === "expertos" && (
                                        <React.Fragment>
                                            <div id="expertos" className=" d-flex card-list cardSAE-body text-normal align-items-center w-100 h-4" onClick={this.handleChangeTipo}>
                                                Expertos
                                            </div>
                                            <div className="d-flex flex-column w-100 align-items-end">
                                                
                                                <div id="porasignarExp" className=" d-flex card-list cardSAE-body text-normal text-left align-items-center w-75 h-4 bg-current">
                                                    Por Evaluar
                                                </div> 
                                            </div>   
                                            <div id="evaluadores" className=" d-flex card-list cardSAE-body text-normal align-items-center w-100 h-4" onClick={this.handleChangeTipo}>
                                                Evaluadores
                                            </div>                                     
                                        </React.Fragment>)}

                                        {this.state.form === "evaluadores"&& (
                                        <React.Fragment>
                                            <div id="expertos" className=" d-flex card-list cardSAE-body text-normal align-items-center w-100 h-4" onClick={this.handleChangeTipo}>
                                                Expertos
                                            </div>
                                              
                                            <div id="evaluadores" className=" d-flex card-list cardSAE-body text-normal align-items-center w-100 h-4" onClick={this.handleChangeTipo}>
                                                Evaluadores
                                            </div> 
                                            <div className="d-flex flex-column w-100 align-items-end">
                                                
                                                <div id="porasignarExp" className=" d-flex card-list cardSAE-body text-normal text-left align-items-center w-75 h-4 bg-current" >
                                                    Por Evaluar
                                                </div>  
                                            </div> 
                                        </React.Fragment>)}
                        </div>
                            
                        <div className="cardSAE containersae w-80">
                                
                            <div className="cardSAE-body">
                            {this.state.form === "expertos" && (
                                    <MUIDataTable className="data-table"
                                        title={"Postulantes Expertos por Evaluar"}
                                        data={this.state.expertosPorEvaluar}
                                        columns={columns}
                                        options={options}
                                    />
                                )}
                                {this.state.form === "evaluadores" &&(
                                    <MUIDataTable className="data-table"
                                        title={"Postulantes a Evaluadores por Evaluar"}
                                        data={this.state.evaluadoresPorEvaluar}
                                        columns={columns}
                                        options={options}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                    {this.state.modal&&(
                    <Modal
                        modalInfo={this.state.modalInfo}
                        closeModal={this.selectModal}
                        guardarEvaluacionExperto={this.guardarEvaluacionExperto}
                        guardarEvaluacionEvaluador={this.guardarEvaluacionEvaluador}
                        finalizarEvaluacionEvaluador={this.finalizarEvaluacionEvaluador}
                        finalizarEvaluacionExperto={this.finalizarEvaluacionExperto}
                    />)
                    }
                </React.Fragment>
        )
    }
}

if (document.getElementById('evaluacion')) {
    ReactDOM.render(<Evaluacion />, document.getElementById('evaluacion'));
}
