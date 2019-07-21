import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Header from '../common/Header'
import Prerrequisitos from './Prerrequisitos';
import DatosPersonales from './DatosPersonales';
import EducacionFormal from './EducacionFormal';
import ExperienciaLaboral from './ExperienciaLaboral';
import Referencia from './Referencia';

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
        fechaNacimiento: "",
        correo: "",
        estadoCivil: "selec",
        telConv: "",
        telCel: "",
        ciudad:"",
        pais: "",
        provincia: "",
        direccion: "",
        disponibilidad: "selec",
        genero: "selec",
        agregado: false,
        //Educación Formal

        nombreInstitucion: "Inst Prueba",
        tituloObtenido:"Titulo Prueba",
        tipoFormacion:"Tercer Nivel",
        archivoAnexo:"Archivo Prueba"
        
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
            form: "datos",
            prerrequisitos: "si",
        })
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

    handlePostulante = () => {

        let postulante = {
            nombres: this.state.nombres,
            apellidos: this.state.apellidos,
            genero: this.state.genero,
            cedula: this.state.identificacion,
            email: this.state.correo,
            fechaNacimiento: this.state.fechaNacimiento,
            telefono: this.state.telefono,
            provincia: this.state.provincia,
            disponibilidad:this.state.disponibilidad,
            nombreInstitucion:this.state.nombreInstitucion,
            tituloObtenido:this.state.tituloObtenido,
            tipoFormacion:this.state.tipoFormacion,
            archivoAnexo:this.state.archivoAnexo
        }

        console.log("PAYLOAD DE POSTULANTE",postulante);

        this.handleSubmitPostulante(postulante);
        
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
                    <div className="d-flex flex-row" >
                        <div className="d-flex flex-column align-items-center w-25">
                                    {this.state.form === "datos"?(
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
                                            <div id="referencia" className=" d-flex card-list cardSAE-body text-normal align-items-center w-100 h-4" onClick={this.handleChangeTipo}>
                                                Referencia
                                            </div>                                    
                                        </React.Fragment>
        
                                ):(
                                    this.state.form === "educacion"?(
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
                                            <div id="referencia" className=" d-flex card-list cardSAE-body text-normal align-items-center w-100 h-4" onClick={this.handleChangeTipo}>
                                                Referencia
                                            </div>
                                        </React.Fragment>
        
                                    ):(this.state.form === "experiencia"?(
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
                                                <div id="referencia" className=" d-flex card-list cardSAE-body text-normal align-items-center w-100 h-4" onClick={this.handleChangeTipo}>
                                                    Referencia
                                                </div>
                                            </React.Fragment>
                                        ):(
                                            <React.Fragment>
                                                <div id="datos" className={" d-flex card-list cardSAE-body text-normal align-items-center w-100 h-4"} onClick={this.handleChangeTipo}>
                                                    Datos Generales
                                                </div>
                                                <div id="educacion" className=" d-flex card-list cardSAE-body text-normal align-items-center w-100 h-4" onClick={this.handleChangeTipo}>
                                                    Educación Formal
                                                </div>
                                                <div id="experiencia" className=" d-flex card-list cardSAE-body text-normal align-items-center w-100 h-4 " onClick={this.handleChangeTipo}>
                                                    Experiencia Laboral
                                                </div>
                                                <div id="referencia" className=" d-flex card-list cardSAE-body text-normal align-items-center w-100 h-4 bg-current" onClick={this.handleChangeTipo}>
                                                    Referencia
                                                </div>
                                            </React.Fragment>
                                        )
                                    )
                                )}
                        </div>
                            
                        <div className="cardSAE containersae w-100 w-75">
                                
                            <div className="cardSAE-body">
                                {/*this.state.tipo === "ambitos"?(
                                    <SeleccionarAmbito updateAmbitos={this.updateAmbitos} handleChangeTipo={this.handleChangeTipo}/>
                                ):(
                                    this.state.tipo === "sectores"?(
                                        <SeleccionarSector ambitosArray={this.state.ambitosArray} updateSectores={this.updateSectores} handleChangeTipo={this.handleChangeTipo}/>
                                    ):(
                                        <SeleccionarAlcance sectoresArray={this.state.sectoresArray} updateAlcances={this.updateAlcances}  handleChangeTipo={this.handleChangeTipo}/>
                                    )
                                    )*/
                                this.state.form === "datos" && (
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
                                        telConv={this.state.telConv}
                                        telCel={this.state.telCel}
                                        pais={this.state.pais}
                                        provincia={this.state.provincia}
                                        direccion={this.state.direccion}
                                        disponibilidad={this.state.disponibilidad}
                                        genero={this.state.genero}
                                        agregado={this.state.agregado}
                                        nombreInstitucion={this.state.nombreInstitucion} 
                                        tituloObtenido={this.state.tituloObtenido}
                                        tipoFormacion={this.state.tipoFormacion}
                                        archivoAnexo={this.state.archivoAnexo}
        

                                    />
                                )}
                                {this.state.form === "educacion" && (
                                    <EducacionFormal
                                    handleChangeTipo={this.handleChangeTipo}
                                    />
                                )}
                                {this.state.form === "experiencia" && (
                                    <ExperienciaLaboral
                                    handleChangeTipo={this.handleChangeTipo}
                                    
                                    />
                                )}
                                {this.state.form === "referencia" && (
                                    <Referencia
                                    handleChangeTipo={this.handleChangeTipo}
                                    
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
