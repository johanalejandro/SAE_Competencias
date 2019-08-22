import React, { Component } from "react";
import ReactDOM from "react-dom";
import Header from "../common/Header";
import Prerrequisitos from "./Prerrequisitos";
import Terminos from "./Terminos";
import DatosPersonales from "./DatosPersonales";
import EducacionFormal from "./EducacionFormal";
import ExperienciaLaboral from "./ExperienciaLaboral";
import capitalize from "lodash/capitalize";
import clone from "lodash/clone";
import isEmpty from "lodash/isEmpty";
import pull from "lodash/pull";
import axios from "axios";
import EducacionCursos from "./EducacionCursos";
import ExperienciaLaboralEv from "./ExperienciaLaboralEv";

const _MS_PER_DAY = 1000 * 60 * 60 * 24;

const getYearsAgo = (years) => {
    var date = new Date();
    const month = date.getMonth();
    const year = date.getFullYear()-years;
    return new Date(year, month, 1);
};

const getCurrentDate = () => {
    var date = new Date();
    const month = date.getMonth();
    const year = date.getFullYear();
    const day = date.getDate();
    return new Date(year, month, day !== 1 ? day : 1, 23, 59, 59);
};

const formatDate = (date) =>{
    let monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];
  
    let day = date.getDate();
    let monthIndex = date.getMonth();
    let year = date.getFullYear();
  
    return day + ' ' + monthNames[monthIndex] + ' ' + year;
  }; 

export default class HojaDeVida extends Component {

    state = {
        tipo: "",
        ambitosArray: [],
        sectoresArray: [],
        alcancesArray: [],
        requerimientosArray:[],
        prerrequisitos: "",
        form: "",
        prerrequisitosArray : [],
        datosPersonales: [],

        //Datos Generales
        nombres: "",
        apellidos: "",
        tipoId: "selec",
        identificacion: "",
        fechaNacimiento: getYearsAgo(22),
        correo: "",
        estadoCivil: "selec",
        telefono: "",
        ciudad:"",
        provincia: "",
        direccion: "",
        disponibilidad: "selec",
        genero: 'selec',
        agregado: false,

        //Educación Formal
        nombreInstitucion: "",
        tituloObtenido:"",
        tipoFormacion:"selec",
        archivoAnexo:"",
        loadingFile: false,
        cursos: [],
        archivoAnexoCurso:"",
        nombreInstitucionCurso:"",
        numeroHoras:0,
        reqActual:"selec",
        reqItem:"",
        reqs:[],
        fileCursoError: false,

        //Experiencia Laboral
        experiencias : [],
        experienciaLaboral: [],
        alcances: [],
        fechaInicio: getYearsAgo(4),
        fechaFin: getCurrentDate(),
        esTrabajoActual: 0,
        descripcion: "",
        cargoEjercido: "",
        nombreEmpresa: "",
        alcanceActual: "selec",
        requerimientos:[],
        requerimientoActual: "selec",
        requerimientoItem: "",
        alcanceItem: "",
        checkedItems: new Map(),
        actividad: "selec",
        fechaValidationEv: false,
        fechaValidationExp: false,

        enviado: false,
        
    }

    componentDidMount = async () =>{

        if(this.props.tipo==="?tipo=evaluador"){
            this.setState({
                tipo: "evaluador",
            });
        }
        if(this.props.tipo==="?tipo=experto"){
            this.setState({
                tipo: "experto",
            });
        }

        await this.setState({
            ambitosArray: this.props.ambitos,
            sectoresArray: clone(this.props.sectores),
            alcancesArray: clone(this.props.alcances),
            alcances: this.props.alcances,
            form: "datos",
            prerrequisitos: "si",
        })
    }

    handleChangeStart = async (date) => {
        const { fechaFin } = this.state;
        const startDateTmp = new Date(date);
        const endDateTmp = new Date(fechaFin);
        if (this.state.tipo==="evaluador"){
            console.log(this.dateDiffInDays(endDateTmp,startDateTmp));
            if(this.dateDiffInDays(endDateTmp,startDateTmp)<1461) {
                await this.setState({fechaValidationEv: true,});
            }else{
                await this.setState({
                    fechaValidationEv: false,
                    fechaValidationExp: false,
                })
            }
            
        }
        if (this.state.tipo==="experto"){
            console.log(this.dateDiffInDays(endDateTmp,startDateTmp));
            if(this.dateDiffInDays(endDateTmp,startDateTmp)<730){
                 await this.setState({fechaValidationExp: true,});
                }
                else{
                    await this.setState({
                        fechaValidationEv: false,
                        fechaValidationExp: false,
                    })
                }
        }
        if (startDateTmp >= endDateTmp) {
            await this.setState({
                fechaInicio: date,
                fechaFin: date,
            });
        }else{
            await this.setState({
                fechaInicio: date,
            });
        }
    };

    dateDiffInDays=(a, b)=>  {
        // Discard the time and time-zone information.
        const utc1 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
        const utc2 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
      
        return Math.floor((utc2 - utc1) / _MS_PER_DAY);
      }

    handleChangeEnd = async (date) => {
        const { fechaInicio } = this.state;
        const startDateTmp = new Date(fechaInicio);
        const endDateTmp = new Date(date);
        if (this.state.tipo==="evaluador"){
            console.log(this.dateDiffInDays(endDateTmp,startDateTmp));
            if(this.dateDiffInDays(endDateTmp,startDateTmp)<1461) {
                this.setState({fechaValidationEv: true,}); 
                return;
            }
            
        }
        if (this.state.tipo==="experto"){
            console.log(this.dateDiffInDays(endDateTmp,startDateTmp));
            if(this.dateDiffInDays(endDateTmp,startDateTmp)<730){
                 this.setState({fechaValidationExp: true,});
                  return
                }
        }
        if (endDateTmp >= startDateTmp) {
            await this.setState({
                fechaFin: date,
            });
        } else {
            await this.setState({
                fechaInicio: date,
                fechaFin: date,
            });
        }
    };

    handleChangeDate = (date) => {
        this.setState({
          fechaNacimiento: date
        });
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

    handleContinuar = () =>{
        this.setState({
            continuar: true,
            prerrequisitos: "",
        })
    }

    handleValidar = () => {
        const validarDatos = (this.state.nombres=== ""||
        this.state.apellidos=== ""||
        this.state.identificacion=== ""||
        this.state.correo=== ""||
        this.state.telefono=== ""||
        this.state.ciudad===""||
        this.state.provincia=== ""||
        this.state.direccion=== ""||
        this.state.disponibilidad=== "selec");

        let validarCursos = false;
        
        const validarEducacion = (
            this.state.nombreInstitucion=== ""||
            this.state.tituloObtenido===""||
            this.state.tipoFormacion==="selec"||
            this.state.archivoAnexo===""
        )
        let validarExperiencia = true;
            if(this.state.tipo==="evaluador"){
                validarExperiencia = (
                    this.state.experiencias.length <1
                );
            }else{
                console.log("VALIDAR",this.state.experiencias.length, this.state.alcancesArray.length)
                validarExperiencia = (
                    this.state.experiencias.length <1
                );
            }

        if(this.state.tipo==="evaluador"){
            validarCursos=(
                this.state.cursos.length !== this.state.requerimientosArray.length
            );
            if(validarDatos || validarEducacion || validarCursos || validarExperiencia){
                $('#camposVacíos').modal();
            }else{
                $('#verificarDatos').modal();
            }
        }else{
            if(validarDatos || validarEducacion || validarExperiencia){
                $('#camposVacíos').modal();
            }else{
                $('#verificarDatos').modal();
            }
        }
    }

     handleCheckBoxChange = ({target}) => {
        const item = target.name;
        const isChecked =target.checked;
        this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(item, isChecked) }));
        if(isChecked){
            this.setState({
                esTrabajoActual: 1,
            })
        }else{
            this.setState({
                esTrabajoActual: 0,
            })
        }
    }

    agregar = async() => {
        let experiencia = {}
        experiencia['nombreEmpresa'] = this.state.nombreEmpresa;
        experiencia['cargoEjercido'] = this.state.cargoEjercido;
        experiencia['descripcion'] = this.state.descripcion;
        experiencia['fechaInicio'] = this.state.fechaInicio;
        experiencia['fechaFin'] = this.state.fechaFin;
        experiencia['id_alcance'] = this.state.alcanceActual;
        experiencia['alcance'] = this.state.alcanceItem;
        experiencia['esTrabajoActual'] = this.state.esTrabajoActual;
        if(this.state.nombreEmpresa===""||this.state.cargoEjercido===""||this.state.descripcion===""||this.state.alcanceActual==="selec"||this.state.alcanceItem===""){
            return
        }
        const { experiencias } = this.state;
        const filterData = experiencias;
        filterData.push(experiencia);
        await this.setState({ experiencias: filterData });
        await this.updateExperienciaLaboral(this.state.experiencias);
        await this.clean(this.state.alcanceActual);
    }

    agregarCurso=async() => {
        let curso = {}
        curso['nombreInstitucion'] = this.state.nombreInstitucionCurso;
        curso['id_sector_requerimiento'] = this.state.reqActual;
        curso['requerimiento'] = this.state.reqItem;
        curso['numeroHoras'] = this.state.numeroHoras;
        curso['archivoAnexoCurso'] = this.state.archivoAnexoCurso;
        curso['archivoAnexoCursoNombre'] = this.state.archivoAnexoCurso.name;
        if(this.state.nombreInstitucionCurso===""||this.state.archivoAnexoCurso===""||this.state.numeroHoras===0||this.state.reqActual==="selec"||this.state.reqItem===""){
            return
        }
        const { cursos } = this.state;
        const filterData = cursos;
        filterData.push(curso);
        await this.setState({ cursos: filterData });
        await this.cleanCurso(this.state.reqActual);
    }


    agregarEv = async() => {
        let experiencia = {}
        experiencia['nombreEmpresa'] = this.state.nombreEmpresa;
        experiencia['cargoEjercido'] = this.state.cargoEjercido;
        experiencia['descripcion'] = this.state.descripcion;
        experiencia['fechaInicio'] = this.state.fechaInicio;
        experiencia['fechaFin'] = this.state.fechaFin;
        experiencia['id_sector_requerimiento'] = this.state.requerimientoActual;
        experiencia['requerimiento'] = this.state.requerimientoItem;
        experiencia['esTrabajoActual'] = this.state.esTrabajoActual;
        if(this.state.nombreEmpresa===""||this.state.cargoEjercido===""||this.state.descripcion===""||this.state.requerimientoActual==="selec"||this.state.requerimientoItem===""){
            return
        }
        const { experiencias } = this.state;
        const filterData = experiencias;
        filterData.push(experiencia);
        await this.setState({ experiencias: filterData });
        await this.updateExperienciaLaboral(this.state.experiencias);
        await this.cleanEv(this.state.requerimientoActual);
    }

    handleHojaDeVida = () => {
        this.setState({
            prerrequisitos: "no",
        })
    }

    updatePrerrequisitos = (requerimientos) => {
        console.log("requerimientos que llegan" ,requerimientos);
        this.setState({
            prerrequisitosArray: clone(requerimientos),
            reqs: clone(requerimientos),
            requerimientos: clone(requerimientos),
            requerimientosArray: clone(requerimientos),
        })
    } 

    handleChange = ({target}) => {
        const value = target.value;
        const name = target.name;
        this.setState({
            [name] : value,
        })
    }

    handleChangeAlcance = (evt) => {
        let index = evt.nativeEvent.target.selectedIndex;
        let text = evt.nativeEvent.target[index].text;
        const {value} = evt.target;
        this.setState({
            alcanceActual: parseInt(value,10),
            alcanceItem: text,
        })
    }

    handleChangeReq = (evt) => {
        let index = evt.nativeEvent.target.selectedIndex;
        let text = evt.nativeEvent.target[index].text;
        const {value} = evt.target;
        this.setState({
            reqActual: parseInt(value,10),
            reqItem: text,
        })
    }

    handleChangeRequerimiento = (evt) => {
        let index = evt.nativeEvent.target.selectedIndex;
        let text = evt.nativeEvent.target[index].text;
        const {value} = evt.target;
        this.setState({
            requerimientoActual: parseInt(value,10),
            requerimientoItem: text,
        })
    }

    handleChangeFile = async (e) => {
        this.setState({
            loadingFile: true,
        })
        const name = e.target.name;
        const { files } = e.target;
        const file = files[0];
        await this.setState({
            [name] : file,
        })
        this.setState({
            loadingFile: false,
        })
    }

    handleChangeFileCurso = async (e) => {
        const name = e.target.name;
        const { files } = e.target;
        const file = files[0];
        if(file.type!=="application/pdf"){
            await this.setState({
                fileCursoError: true,
            });
            return
        }else{
            await this.setState({
                fileCursoError: false,
                [name] : file,
            })
        }
    }

    handleChangeActividad=(e)=>{
        const value = e.target.value;
        this.setState({
            actividad: value,
            descripcion: this.state.descripcion+". Relacionado con actividades en "+value,
        });

    }

    volverCargar = (e)=>{
        const name = e.target.name;
        this.setState({
            [name]:"",
        })
    }

    handlePostulante = async () => {

        let postulante = {
            nombres: this.state.nombres,
            apellidos: this.state.apellidos,
            genero: capitalize(this.state.genero),
            cedula: this.state.identificacion,
            email: this.state.correo,
            fechaNacimiento: this.state.fechaNacimiento,
            telefono: this.state.telefono,
            ciudad: this.state.ciudad,
            provincia: this.state.provincia,
            nombreInstitucion:this.state.nombreInstitucion,
            tituloObtenido:this.state.tituloObtenido,
            tipoFormacion:this.state.tipoFormacion,
            archivoAnexo:this.state.archivoAnexo,
            tipoPostulacion: this.state.tipo,
            disponibilidad: parseInt(this.state.disponibilidad),
        }

        

        await this.handleSubmitPostulante(postulante);
        
    }

    handleExp = async () => {
        let experiencias =this.state.experiencias;
        for (let index = 0; index < experiencias.length; index++) {
            const element = experiencias[index];
            let experiencia = {
                cargoEjercido: element.cargoEjercido,
                descripcion: element.descripcion,
                esTrabajoActual: element.esTrabajoActual,
                fechaFin: element.fechaFin,
                fechaInicio: element.fechaInicio,
                id_alcance: element.id_alcance,
                nombreEmpresa: element.nombreEmpresa,
            }

            this.handleSubmitExperiencia(experiencia);
            
        }
       
    }

    handleExpEv = async () => {
        let experiencias =this.state.experiencias;
        for (let index = 0; index < experiencias.length; index++) {
            const element = experiencias[index];
            let experiencia = {
                cargoEjercido: element.cargoEjercido,
                descripcion: element.descripcion,
                esTrabajoActual: element.esTrabajoActual,
                fechaFin: element.fechaFin,
                fechaInicio: element.fechaInicio,
                id_sector_requerimiento: element.id_sector_requerimiento,
                nombreEmpresa: element.nombreEmpresa,
            }

            this.handleSubmitExperienciaEv(experiencia);
            
        }
       
    }

    handleCursos = async () => {
        let cursos =this.state.cursos;
        console.log(cursos)
        for (let index = 0; index < cursos.length; index++) {
            const element = cursos[index];
            let curso = {
                id_sector_requerimiento: element.id_sector_requerimiento,
                nombreInstitucion: element.nombreInstitucion,
                numeroHoras: element.numeroHoras,
                archivoAnexoCurso: element.archivoAnexoCurso
            }

            this.handleSubmitCursos(curso);
            
        }
       
    }

    updateExperienciaLaboral = (experiencia) => {
        const { experienciaLaboral } = this.state;
        const filterData = experienciaLaboral;
        filterData.push(experiencia);
        this.setState({
            experienciaLaboral: filterData,
        })
    }

    clean = async (alcanceActual) => {
        console.log(alcanceActual);
        const { alcances } = this.state;
        let filterData = [];
        filterData = alcances;
        const alcanceAEliminar = await filterData.find((alcance)=>{
            return alcance.id_alcance === alcanceActual;
        })
        console.log("eliminar",alcanceAEliminar)
        await pull(filterData,alcanceAEliminar);
        await this.setState({ alcances: filterData });
        await this.setState({
            fechaInicio: getYearsAgo(2),
            fechaFin: getCurrentDate(),
            esTrabajoActual: 0,
            descripcion: "",
            cargoEjercido: "",
            nombreEmpresa: "",
            alcanceActual: "selec",
            checkedItems: new Map(),
            actividad: "selec",
        });
    }

    cleanCurso = async (reqActual) => {
        console.log(reqActual);
        const { reqs } = this.state;
        let filter = [];
        filter = reqs;
        const reqAEliminar = await filter.find((req)=>{
            return req.id_sector_requerimiento === reqActual;
        })
        console.log("eliminar",reqAEliminar)
        await pull(filter,reqAEliminar);
        await this.setState({ reqs: filter });
        await this.setState({
            numeroHoras: 0,
            nombreInstitucionCurso: "",
            archivoAnexoCurso: "",
            reqActual: "selec",
        });
    }

    cleanEv = async (requerimientoActual) => {
        console.log(requerimientoActual);
        const { requerimientos } = this.state;
        let filterData = [];
        filterData = requerimientos;
        const requerimientoAEliminar = await filterData.find((requerimiento)=>{
            return requerimiento.id_sector_requerimiento === requerimientoActual;
        })
        console.log("eliminar",requerimientoAEliminar)
        await pull(filterData,requerimientoAEliminar);
        await this.setState({ requerimientos: filterData });
        await this.setState({
            fechaInicio: getYearsAgo(4),
            fechaFin: getCurrentDate(),
            esTrabajoActual: 0,
            descripcion: "",
            cargoEjercido: "",
            nombreEmpresa: "",
            requerimientoActual: "selec",
            checkedItems: new Map(),
            actividad: "selec",
        });
    }

    handleSubmitPostulante(postulante) {
        const formData = new FormData();
        formData.append("nombres", postulante.nombres);
        formData.append("apellidos", postulante.apellidos);
        formData.append("genero", postulante.genero);
        formData.append("cedula", postulante.cedula);
        formData.append("genero", postulante.genero);
        formData.append("cedula", postulante.cedula);
        formData.append("telefono", postulante.telefono);
        formData.append("email", postulante.email);
        formData.append("fechaNacimiento", formatDate(postulante.fechaNacimiento));
        formData.append("ciudad", postulante.ciudad);
        formData.append("provincia", postulante.provincia);
        formData.append("nombreInstitucion", postulante.nombreInstitucion);
        formData.append("tituloObtenido", postulante.tituloObtenido);
        formData.append("tipoFormacion", postulante.tipoFormacion);
        formData.append("archivoAnexo", postulante.archivoAnexo,postulante.archivoAnexo.name);
        formData.append("tipoPostulacion", postulante.tipoPostulacion);
        formData.append("disponibilidad", postulante.disponibilidad);

        axios
            .post("api/postulantes", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then(async (response) => {
                this.setState({
                    agregado: true,
                });
                if(this.state.tipo==="evaluador"){
                    await this.handleExpEv();
                    await this.handleCursos();
                }
                if(this.state.tipo==="experto"){
                    await this.handleExp();
                }
            })
            .catch(console.error);
    }

    handleSubmitCursos(curso) {
        const formData = new FormData();
        formData.append("cedula",this.state.identificacion);
        formData.append("nombreInstitucion", curso.nombreInstitucion);
        formData.append("id_sector_requerimiento", curso.id_sector_requerimiento);
        formData.append("numeroHoras", curso.numeroHoras);
        formData.append("archivoAnexo", curso.archivoAnexoCurso);


        axios
            .post("api/cursosEvaluador", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then(async(response) => {
                console.log("agregado");
                await this.setState({
                    enviado: true,
                })
            })
            .catch(console.error);
    }

    handleSubmitExperiencia = (experiencia) => {
        const formData = new FormData();
        formData.append("cedula",this.state.identificacion);
        formData.append("nombreEmpresa", experiencia.nombreEmpresa);
        formData.append("id_alcance", experiencia.id_alcance);
        formData.append("cargoEjercido", experiencia.cargoEjercido);
        formData.append("descripcion", experiencia.descripcion);
        formData.append("esTrabajoActual", experiencia.esTrabajoActual);
        formData.append("fechaInicio", formatDate(experiencia.fechaInicio));
        formData.append("fechaFin", formatDate(experiencia.fechaFin));


        axios
            .post("api/experiencias", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then(async(response) => {
                console.log("agregado");
                await this.setState({
                    enviado: true,
                })
            })
            .catch(console.error);
    }

    handleSubmitExperienciaEv = (experiencia) => {
        const formData = new FormData();
        formData.append("cedula",this.state.identificacion);
        formData.append("nombreEmpresa", experiencia.nombreEmpresa);
        formData.append("id_sector_requerimiento", experiencia.id_sector_requerimiento);
        formData.append("cargoEjercido", experiencia.cargoEjercido);
        formData.append("descripcion", experiencia.descripcion);
        formData.append("esTrabajoActual", experiencia.esTrabajoActual);
        formData.append("fechaInicio", formatDate(experiencia.fechaInicio));
        formData.append("fechaFin", formatDate(experiencia.fechaFin));

        axios
            .post("api/experienciasEvaluador", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => {
                console.log("agregado");
                
            })
            .catch(console.error);
    }

    render() {
        return (
            <React.Fragment>
            {this.state.prerrequisitos==="si" &&(
                 <Prerrequisitos 
                    sectores={this.state.sectoresArray}
                    tipo={this.state.tipo}
                    updatePrerrequisitos={this.updatePrerrequisitos}
                    handleHojaDeVida={this.handleHojaDeVida}
                 />
              )}
              {this.state.prerrequisitos==="no" &&(
                <React.Fragment>
                    <Header title="Hoja de Vida"/>
                    <div className="d-flex flex-row h-85" >
                        <div className="d-flex flex-column align-items-center w-20">
                                    {this.state.form === "datos" && (
                                        <React.Fragment>
                                            <div id="datos" className={" d-flex card-list cardSAE-body text-normal align-items-center w-100 h-4 bg-current"} onClick={this.handleChangeTipo}>
                                                Datos Generales
                                            </div>
                                            <div id="educacion" className=" d-flex card-list cardSAE-body text-normal align-items-center w-100 h-4" onClick={this.handleChangeTipo}>
                                                Educación Formal
                                            </div>
                                            {this.state.tipo === "evaluador" && (
                                                <div id="educacionEvaluador" className=" d-flex card-list cardSAE-body text-normal align-items-center w-100 h-4" onClick={this.handleChangeTipo}>
                                                    Educación por Curso
                                                </div>  
                                            )}
                                            <div id="experiencia" className=" d-flex card-list cardSAE-body text-normal align-items-center w-100 h-4" onClick={this.handleChangeTipo}>
                                                Experiencia Laboral
                                            </div>                                  
                                        </React.Fragment>)}
                                    {this.state.form === "educacion" && (
                                        <React.Fragment>
                                            <div id="datos" className={" d-flex card-list cardSAE-body text-normal align-items-center w-100 h-4"} onClick={this.handleChangeTipo}>
                                                Datos Generales
                                            </div>
                                            <div id="educacion" className=" d-flex card-list cardSAE-body text-normal align-items-center w-100 h-4 bg-current" onClick={this.handleChangeTipo}>
                                                Educación Formal
                                            </div>
                                            {this.state.tipo === "evaluador" && (
                                                <div id="educacionEvaluador" className=" d-flex card-list cardSAE-body text-normal align-items-center w-100 h-4" onClick={this.handleChangeTipo}>
                                                    Educación por Curso
                                                </div>  
                                            )}
                                            <div id="experiencia" className=" d-flex card-list cardSAE-body text-normal align-items-center w-100 h-4" onClick={this.handleChangeTipo}>
                                                Experiencia Laboral
                                            </div> 
                                        </React.Fragment>)}
                                        {this.state.form === "educacionEvaluador" && (
                                            <React.Fragment>
                                               <div id="datos" className={" d-flex card-list cardSAE-body text-normal align-items-center w-100 h-4"} onClick={this.handleChangeTipo}>
                                                    Datos Generales
                                                </div>
                                                <div id="educacion" className=" d-flex card-list cardSAE-body text-normal align-items-center w-100 h-4" onClick={this.handleChangeTipo}>
                                                    Educación Formal
                                                </div>
                                                {this.state.tipo === "evaluador" && (
                                                    <div id="educacionEvaluador" className=" d-flex card-list cardSAE-body text-normal align-items-center w-100 h-4 bg-current" onClick={this.handleChangeTipo}>
                                                        Educación por Curso
                                                    </div>  
                                                )}
                                                <div id="experiencia" className=" d-flex card-list cardSAE-body text-normal align-items-center w-100 h-4 " onClick={this.handleChangeTipo}>
                                                    Experiencia Laboral
                                                </div> 
                                            </React.Fragment>)}
                                    {this.state.form === "experiencia" && (
                                            <React.Fragment>
                                               <div id="datos" className={" d-flex card-list cardSAE-body text-normal align-items-center w-100 h-4"} onClick={this.handleChangeTipo}>
                                                    Datos Generales
                                                </div>
                                                <div id="educacion" className=" d-flex card-list cardSAE-body text-normal align-items-center w-100 h-4" onClick={this.handleChangeTipo}>
                                                    Educación Formal
                                                </div>
                                                {this.state.tipo === "evaluador" && (
                                                    <div id="educacionEvaluador" className=" d-flex card-list cardSAE-body text-normal align-items-center w-100 h-4" onClick={this.handleChangeTipo}>
                                                        Educación por Curso
                                                    </div>  
                                                )}
                                                <div id="experiencia" className=" d-flex card-list cardSAE-body text-normal align-items-center w-100 h-4  bg-current" onClick={this.handleChangeTipo}>
                                                    Experiencia Laboral
                                                </div> 
                                            </React.Fragment>)}
                        </div>
                            
                        <div className="cardSAE containersae w-80">
                                
                            <div className="cardSAE-body">
                                {this.state.form === "datos" && (
                                    <DatosPersonales
                                        handleChangeTipo={this.handleChangeTipo}
                                        handleChange={this.handleChange}
                                        handlePostulante={this.handlePostulante}
                                        nombres={this.state.nombres}
                                        apellidos={this.state.apellidos}
                                        tipoId={this.state.tipoId}
                                        identificacion={this.state.identificacion}
                                        fechaNacimiento={this.state.fechaNacimiento}
                                        correo={this.state.correo}
                                        estadoCivil={this.state.estadoCivil}
                                        telefono={this.state.telefono}
                                        ciudad={this.state.ciudad}
                                        provincia={this.state.provincia}
                                        direccion={this.state.direccion}
                                        disponibilidad={this.state.disponibilidad}
                                        genero={this.state.genero}
                                        agregado={this.state.agregado}
                                        handleChangeDate={this.handleChangeDate}

                                    />
                                )}
                                {this.state.form === "educacion" && (
                                    <EducacionFormal
                                    handleChangeTipo={this.handleChangeTipo}
                                    nombreInstitucion={this.state.nombreInstitucion} 
                                        tituloObtenido={this.state.tituloObtenido}
                                        tipoFormacion={this.state.tipoFormacion}
                                        archivoAnexo={this.state.archivoAnexo}
                                        handleChange={this.handleChange}
                                        handleChangeFile={this.handleChangeFile}
                                        handlePostulante={this.handlePostulante}
                                        tipo={this.state.tipo}
                                        volverCargar={this.volverCargar}
                                    />
                                )}
                                {this.state.form === "educacionEvaluador" && (
                                    <EducacionCursos
                                        handleChangeTipo={this.handleChangeTipo}
                                        handleChange={this.handleChange}
                                        handleChangeFileCurso={this.handleChangeFileCurso}
                                        handleChangeReq={this.handleChangeReq}
                                        volverCargar={this.volverCargar}
                                        /*handleChangeStart={this.handleChangeStart}
                                handleChangeEnd={this.handleChangeEnd}
                                        checkedItems={this.state.checkedItems}*/
                                        tipo={this.state.tipo}
                                        /*fechaInicio={this.state.fechaInicio}
                                        fechaFin={this.state.fechaFin}*/
                                        archivoAnexoCurso={this.state.archivoAnexoCurso}
                                        nombreInstitucionCurso={this.state.nombreInstitucionCurso}
                                        numeroHoras={this.state.numeroHoras}
                                        cursos={this.state.cursos}
                                        reqActual={this.state.reqActual}
                                        reqs={this.state.reqs}
                                        agregarCurso={this.agregarCurso}
                                        aviso={this.state.fileCursoError}
                                    />
                                )}
                                {this.state.form === "experiencia" && this.state.tipo==="experto"&&(
                                    <ExperienciaLaboral
                                    handleChangeTipo={this.handleChangeTipo}
                                    handleChange={this.handleChange}
                                    handleCheckBoxChange={this.handleCheckBoxChange}
                                    handleChangeStart={this.handleChangeStart}
                                    handleChangeEnd={this.handleChangeEnd}
                                    checkedItems={this.state.checkedItems}
                                    handleChangeAlcance={this.handleChangeAlcance}
                                    tipo={this.state.tipo}
                                    alcances={this.state.alcances}
                                    fechaInicio={this.state.fechaInicio}
                                    fechaFin={this.state.fechaFin}
                                    esTrabajoActual={this.state.esTrabajoActual}
                                    descripcion={this.state.descripcion}
                                    cargoEjercido={this.state.cargoEjercido}
                                    nombreEmpresa={this.state.nombreEmpresa}
                                    alcanceActual={this.state.alcanceActual}
                                    experiencias={this.state.experiencias}
                                    agregar={this.agregar}
                                    handleExp={this.handleExp}
                                    handlePostulante={this.handlePostulante}
                                    handleValidar={this.handleValidar}
                                    fechaValidation={this.state.fechaValidationExp}
                                    />
                                )}
                                {this.state.form === "experiencia" && this.state.tipo==="evaluador"&&(
                                    <ExperienciaLaboralEv
                                    handleChangeTipo={this.handleChangeTipo}
                                    handleChange={this.handleChange}
                                    handleCheckBoxChange={this.handleCheckBoxChange}
                                    handleChangeStart={this.handleChangeStart}
                                    handleChangeEnd={this.handleChangeEnd}
                                    checkedItems={this.state.checkedItems}
                                    handleChangeRequerimiento={this.handleChangeRequerimiento}
                                    tipo={this.state.tipo}
                                    requerimientos={this.state.requerimientos}
                                    requerimientoActual={this.state.requerimientoActual}
                                    fechaInicio={this.state.fechaInicio}
                                    fechaFin={this.state.fechaFin}
                                    esTrabajoActual={this.state.esTrabajoActual}
                                    descripcion={this.state.descripcion}
                                    cargoEjercido={this.state.cargoEjercido}
                                    nombreEmpresa={this.state.nombreEmpresa}
                                    experiencias={this.state.experiencias}
                                    agregarEv={this.agregarEv}
                                    handleExpEv={this.handleExpEv}
                                    handleCursos={this.handleCursos}
                                    handlePostulante={this.handlePostulante}
                                    handleValidar={this.handleValidar}
                                    actividad={this.state.actividad}
                                    handleChangeActividad={this.handleChangeActividad}
                                    fechaValidation={this.state.fechaValidationEv}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                
                </React.Fragment>
               )}
               {this.state.continuar &&
                    <Terminos
                    handlePostulante={this.handlePostulante}
                    handleExp={this.handleExp}
                    handleExpEv={this.handleExpEv}
                    handleCursos={this.handleCursos}
                    handleChangeTipo={this.handleChangeTipo}
                    handleContinuar={this.handleContinuar}
                    tipo={this.state.tipo}
                    enviado={this.state.enviado}
                    />
               }
               
               <div className="modal fade" id="camposVacíos" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
               <div className="modal-dialog modal-dialog-centered" role="document">
                 <div className="modal-content">
                   <div className="modal-header text-center bg-danger">
                     <h5 className="modal-title text-white" id="exampleModalLongTitle">ATENCIÓN</h5>
                     <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                       <span aria-hidden="true">&times;</span>
                     </button>
                   </div>
                   <div className="modal-body">
                           <label className="w-90 text-normal text-danger text-justify">Revise que todos los campos estén llenos, hay campos vacíos</label>
                   </div>
                   <div className="modal-footer">
                           <button type="button" className="btn btn-primary-sae w-25" data-dismiss="modal">Ok</button>
                   </div>
                 </div>
               </div>
             </div>
             <div className="modal fade" id="verificarDatos" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
             <div className="modal-dialog modal-dialog-centered" role="document">
               <div className="modal-content">
                 <div className="modal-header text-center">
                   <h5 className="modal-title" id="exampleModalLongTitle">ATENCIÓN</h5>
                   <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                     <span aria-hidden="true">&times;</span>
                   </button>
                 </div>
                 <div className="modal-body">
                         <label className="w-90 text-normal text-danger text-justify">Verifique que los datos proporcionadodos son correctos para continuar sin inconvenientes</label>
                 </div>
                 <div className="modal-footer">
                         <button type="button" className="btn btn-primary-sae w-25" data-dismiss="modal">Ok, revisaré</button>
                         <button type="button" className="btn btn-primary-sae w-25 bg-danger" data-dismiss="modal" onClick={this.handleContinuar}>Continuar</button>
                 </div>
               </div>
             </div>
           </div>
           </React.Fragment>
        );
    }
}

if (document.getElementById('hojadevida-form')) {
    ReactDOM.render(<HojaDeVida />, document.getElementById('hojadevida-form'));
}