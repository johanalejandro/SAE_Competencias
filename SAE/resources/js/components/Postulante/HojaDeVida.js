import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Header from '../common/Header'
import Prerrequisitos from './Prerrequisitos';
import DatosPersonales from './DatosPersonales';
import EducacionFormal from './EducacionFormal';
import ExperienciaLaboral from './ExperienciaLaboral';
import {capitalize, pull} from 'lodash';


const getCurrentMonth = () => {
    var date = new Date();
    const month = date.getMonth();
    const year = date.getFullYear();
    return new Date(year, month, 1);
};

const getCurrentDate = () => {
    var date = new Date();
    const month = date.getMonth();
    const year = date.getFullYear();
    const day = date.getDate();
    return new Date(year, month, day !== 1 ? day : 1, 23, 59, 59);
};

export default class HojaDeVida extends Component {

    state = {
        tipo: "",
        ambitosArray: [],
        sectoresArray: [],
        alcancesArray: [],
        prerrequisitos: "",
        form: "",
        prerrequisitosArray : [],
        datosPersonales: [],
        //Datos Generales
        nombres: "",
        apellidos: "",
        tipoId: "selec",
        identificacion: "",
        fechaNacimiento: new Date(),
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
        archivoAnexo:{},

        //Experiencia Laboral
        experiencias : [],
        experienciaLaboral: [],
        alcances: [],
        fechaInicio: getCurrentMonth(),
        fechaFin: getCurrentDate(),
        esTrabajoActual: 0,
        descripcion: "",
        cargoEjercido: "",
        nombreEmpresa: "",
        alcanceActual: "selec",
        alcanceItem: "",
        checkedItems: new Map(),
        
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
            sectoresArray: this.props.sectores,
            alcancesArray: this.props.alcances,
            alcances: this.props.alcances,
            form: "datos",
            prerrequisitos: "si",
        })
    }

    handleChangeStart = async (date) => {
        const { fechaFin } = this.state;
        const startDateTmp = new Date(date);
        const endDateTmp = new Date(fechaFin);
        if (startDateTmp >= endDateTmp) {
            await this.setState({
                fechaInicio: date,
                fechaFin: date,
            });
        } else {
            await this.setState({
                fechaInicio: date,
            });
        }
    };
    handleChangeEnd = async (date) => {
        const { fechaInicio } = this.state;
        const startDateTmp = new Date(fechaInicio);
        const endDateTmp = new Date(date);
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
        const { experiencias } = this.state;
        const filterData = experiencias;
        filterData.push(experiencia);
        await this.setState({ experiencias: filterData });
        await this.updateExperienciaLaboral(this.state.experiencias);
        await this.clean(this.state.alcanceActual);
    }

    handleHojaDeVida = () => {
        this.setState({
            prerrequisitos: "no",
        })
    }

    updatePrerrequisitos = (requerimientos) => {
        console.log("requerimientos que llegan" ,requerimientos);
        this.setState({
            prerrequisitosArray: requerimientos,
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

    handleChangeFile = (name,file) => {
        this.setState({
            [name] : file,
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

        await console.log("PAYLOAD DE POSTULANTE",postulante);

        await this.handleSubmitPostulante(postulante);
        
    }

    handleExp = async () => {
        let experiencias =this.state.experiencias;
        await console.log("PAYLOAD DE EXPERIENCIAS",experiencias);

        //this.handleSubmitExperiencia(experiencia);
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
            fechaInicio: getCurrentMonth(),
            fechaFin: getCurrentDate(),
            esTrabajoActual: 0,
            descripcion: "",
            cargoEjercido: "",
            nombreEmpresa: "",
            alcanceActual: "selec",
            checkedItems: new Map(),
        });
    }

    handleSubmitPostulante(postulante) {
        /*Fetch API for post request */
        fetch( 'api/postulantes', {
            method:'post',
            /* headers are important*/
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            
            body: JSON.stringify(postulante)
        })
        .then(response => {
            return response.json();
        })
        .then( data => {
            //update the state of products and currentProduct
            console.log("POST POSTULANTE",data);
            this.setState({
                agregado: true,
            });
        }).catch(error => {
            console.log("===ERROR: ",error);
        });
    }

    handleSubmitExperiencia(experiencia) {
        /*Fetch API for post request */
        fetch( 'api/experiencias', {
            method:'post',
            /* headers are important*/
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            
            body: JSON.stringify(experiencia)
        })
        .then(response => {
            return response.json();
        })
        .then( data => {
            //update the state of products and currentProduct
            console.log("POST EXPERIENCIAS",data);
            this.setState({
                agregado: true,
            });
        }).catch(error => {
            console.log("===ERROR: ",error);
        });
    }

    render() {
        return (
            this.state.prerrequisitos==="si" ? (
                 <Prerrequisitos 
                    sectores={this.state.sectoresArray}
                    tipo={this.state.tipo}
                    updatePrerrequisitos={this.updatePrerrequisitos}
                    handleHojaDeVida={this.handleHojaDeVida}
                 />
              ): (
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
                                            <div id="experiencia" className=" d-flex card-list cardSAE-body text-normal align-items-center w-100 h-4" onClick={this.handleChangeTipo}>
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
                                                <div id="experiencia" className=" d-flex card-list cardSAE-body text-normal align-items-center w-100 h-4 bg-current" onClick={this.handleChangeTipo}>
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
                                        tipo={this.state.tipoId}
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
                                        archivoAnexo={this.state.archivoAnexo}
                                    />
                                )}
                                {this.state.form === "experiencia" && (
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
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                
                </React.Fragment>
               )
            
        );
    }
}

if (document.getElementById('hojadevida-form')) {
    ReactDOM.render(<HojaDeVida />, document.getElementById('hojadevida-form'));
}
