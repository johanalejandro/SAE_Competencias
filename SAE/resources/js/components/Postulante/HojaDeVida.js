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
        form: ""
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
            form: "datosPersonales",
            prerrequisitos: "si",
        })
    }

    handleChangeTipo = ({target}) => {
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

    handleHojaDeVida = () => {
        this.setState({
            prerrequisitos: "no",
        })
    }

    render() {
        return (
            this.state.prerrequisitos==="si" ? (
                 <Prerrequisitos 
                    sectores={this.state.sectoresArray}
                    tipo={this.state.tipo}
                 />
              ): (
                <React.Fragment>
                    <Header title="Hoja de Vida"/>
                    <div className="d-flex flex-row" >
                        <div className="d-flex flex-column align-items-center w-25">
                                    {this.state.form === "datosPersonales"?(
                                        <React.Fragment>
                                            <div id="ambitos" className={" d-flex card-list cardSAE-body text-normal align-items-center w-100 h-4 bg-current"}>
                                                Ámbitos
                                            </div>
                                            <div id="sectores" className=" d-flex card-list cardSAE-body text-normal align-items-center w-100 h-4" >
                                                Sectores
                                            </div>
                                            <div id="alcances" className=" d-flex card-list cardSAE-body text-normal align-items-center w-100 h-4" >
                                                Alcances
                                            </div>                                    
                                        </React.Fragment>
        
                                ):(
                                    this.state.tipo === "sectores"?(
                                        <React.Fragment>
                                            <div id="ambitos" className={" d-flex card-list cardSAE-body text-normal align-items-center w-100 h-4"}>
                                                Ámbitos
                                            </div>
                                            <div id="sectores" className=" d-flex card-list cardSAE-body text-normal align-items-center w-100 h-4 bg-current">
                                                Sectores
                                            </div>
                                            <div id="alcances" className=" d-flex card-list cardSAE-body text-normal align-items-center w-100 h-4">
                                                Alcances
                                            </div>
                                        </React.Fragment>
        
                                    ):(
                                        <React.Fragment>
                                            <div id="ambitos" className={" d-flex card-list cardSAE-body text-normal align-items-center w-100 h-4"}>
                                                Ámbitos
                                            </div>
                                            <div id="sectores" className=" d-flex card-list cardSAE-body text-normal align-items-center w-100 h-4 ">
                                                Sectores
                                            </div>
                                            <div id="alcances" className=" d-flex card-list cardSAE-body text-normal align-items-center w-100 h-4 bg-current">
                                                Alcances
                                            </div>
                                        </React.Fragment>
        
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
                                    )*/}
        
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
