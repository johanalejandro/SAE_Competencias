import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Header from '../common/Header'
import Prerrequisitos from './Prerrequisitos';

export default class HojaDeVida extends Component {

    state = {
        tipo: "",
        ambitosArray: [],
        sectoresArray: [],
        alcancesArray: [],
        prerrequisitos: "",
        form: "",
        prerrequisitosArray : [],
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
                                    <div>Datos Personales</div>
                                )}
                                {this.state.form === "educacion" && (
                                    <div>Educación Formal</div>
                                )}
                                {this.state.form === "experiencia" && (
                                    <div>Experiencia Laboral</div>
                                )}
                                {this.state.form === "referencia" && (
                                    <div>Referencia</div>
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
