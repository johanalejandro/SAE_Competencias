import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Header from '../common/Header'
import { ClipLoader } from "react-spinners";
import PostulacionEnviada from "./PostulacionEnviada";

export default class Terminos extends Component {

    state={
        loading: false,
    }

    handleSubmit = async (e) => {
        //preventDefault prevents page reload   
        e.preventDefault();
        /*A call back to the onAdd props. The current
         *state is passed as a param
         */
        this.setState({
            loading: true,
        })

        if(this.props.tipo==="evaluador"){
            await this.props.handlePostulante();
        }
        if(this.props.tipo==="experto"){
            await this.props.handlePostulante();
        }

        await this.setLoading();
      }

      setLoading = () =>{
          this.setState({
              loading: false,
          })
      }


    render() {
        return (
            <React.Fragment>
            
                <React.Fragment>
                    {this.props.tipo === "evaluador"?(
                        !this.props.enviado?(
                        <React.Fragment>
                            <Header title="Aplicación para certificarse como Evaluador"/>
                            <div className="containersae d-flex flex-column w-100 h-85">
                                <div className="d-flex flex-column align-items-center mx-2">
                                    <h2>Términos y Condiciones</h2>
                                    <h3>Lea con atención para continuar</h3>
                                    <div className="card w-100 mb-4">

                                        <div className="flex-row justify-content-between">

                                            <div className="card-body">
                                                     <ul className="mb-0 flex flex-row row">
                                                     <li>Acepto cumplir con el código de Ética de la institución.</li><br></br>
                                                     <li>Declaro mantener confidencialidad de la información institucional que manejo.</li><br></br>
                                                     <li>Declaro no tener ningún conflicto de interés que pueda afectar a la imparcialidad en independencia en las actividades dentro de la institución.	</li><br></br>
                                                     <li>Declaro no tener ninguna vinculación con organismos que puedan comprometer mi independencia e imparcialidad en mis actividades institucionales.	</li><br></br>
                                                     <li>Declaro que la información que he registrado es verdadera y tengo conocimiento de que la calificación correspondiente se basará estrictamente sobre la información registrada en la presente ficha.</li>
                                                 </ul>
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex flex-row justify-content-end align-items-center w-100 my-2">
                                    {this.state.loading?(
                                        <React.Fragment>
                                        <ClipLoader sizeUnit={"px"} size={30} color={"#9561e2"} className="block" />
                                        <div className="text-primary text-center">Enviando</div>
                                        </React.Fragment>
                                    ):(
                                        <button name="terminos" className="btn-primary-sae w-20" onClick={(e)=>{this.handleSubmit(e)}}>Aceptar y Enviar</button>
                                    )}
                                    
                                </div>
                            </div>
                        </React.Fragment>
                        ):(
                            <PostulacionEnviada/>
                            )
                    ):(
                        !this.props.enviado?(
                        <React.Fragment>
                            <Header title="Aplicación para certificarse como experto técnico"/>
                            <div className="containersae d-flex flex-column w-100 h-85">
                                <div className="d-flex flex-column align-items-center mx-2">
                                    <h2>Términos y Condiciones</h2>
                                    <h3>Lea con atención para continuar</h3>
                                    <div className="card w-100 mb-4">

                                        <div className="flex-row justify-content-between">

                                            <div className="card-body">
                                            <ul className="mb-0 flex flex-row row">
                                                        <li>Acepto cumplir con el código de Ética de la institución.	</li>
                                                        <li>Declaro mantener confidencialidad de la información institucional que manejo.</li>
                                                        <li>Declaro no tener ningún conflicto de interés que pueda afectar a la imparcialidad en independencia en las actividades dentro de la institución.	</li>
                                                        <li>Declaro no tener ninguna vinculación con organismos que puedan comprometer mi independencia e imparcialidad en mis actividades institucionales.	</li>
                                                        <li>Declaro que la información que he registrado es verdadera y tengo conocimiento de que la calificación correspondiente se basará estrictamente sobre la información registrada en la presente ficha.</li>
                                                    </ul>
                                            </div>

                                            

                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex flex-row justify-content-end align-items-center w-100 my-2">
                                {this.state.loading?(
                                        <React.Fragment>
                                        <ClipLoader sizeUnit={"px"} size={30} color={"#9561e2"} className="block" />
                                        <div className="text-primary text-center">Enviando</div>
                                        </React.Fragment>
                                    ):(
                                        <button name="terminos" className="btn-primary-sae w-20" onClick={(e)=>{this.handleSubmit(e)}}>Aceptar y Enviar</button>
                                    )}
                                </div>
                            </div>
                        </React.Fragment>):
                        (
                            <PostulacionEnviada/>
                        )
                    )}
                </React.Fragment>
            </React.Fragment>    
        );
    }
}
