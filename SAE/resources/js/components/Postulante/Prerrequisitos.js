import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Img from '../common/Img'
import Header from '../common/Header'

export default class Prerrequisitos extends Component {

    state={
        requrimientosArray: [],
    }

    componentDidMount(){
        const sectores = this.props.sectores;
        for (let index = 0; index < sectores.length; index++) {
            const sector = sectores[index];
            fetch('/api/sector/'+sector.id_sector)
            .then(response => {
                return response.json();
            })
            .then(requerimientos => {
                //Fetched product is stored in the state
                console.log("req",requerimientos)
                /*const reqResponse = clone(requerimientos);
                for (let index = 0; index < reqResponse.length; index++) {
                    const req = reqResponse[index];
                    sectors.push(req);
                }
                this.setState({
                    sectores: sectors,
                });*/
            }).catch(error => {
                console.log("===ERROR: ",error);
            });
        }
    }

    render() {
        return (
                <React.Fragment>
                {this.props.tipo === "evaluador"?(
                    <React.Fragment>
                        <Header title="Prerrquisitos Mínimos"/>
                        <div className="cardSAE containersae w-100 w-75">
                        <div className="cardSAE-body">EVALUADOR</div>
                        </div>
                    </React.Fragment>
                ):(
                    <React.Fragment>
                        <Header title="Prerrquisitos Mínimos"/>
                        <div className="cardSAE containersae w-100 w-75">
                        <div className="cardSAE-body">EXPERTO</div>
                        </div>
                    </React.Fragment>
                )}
                </React.Fragment>
        );
    }
}
