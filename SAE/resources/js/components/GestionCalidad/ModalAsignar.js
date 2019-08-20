import React,{ Component } from 'react';
import MUIDataTable from 'mui-datatables';

import Label from '../common/Label';
import isEmpty from 'lodash/isEmpty';
import pull from 'lodash/pull'
import compact from 'lodash/compact'
import uniqBy from "lodash/uniqBy";
import clone from "lodash/clone";

export default class ModalAsignar extends Component {

      state = {
        alcance: "selec",
        nombreAlcance: "",
        tipoSector: "",
        nombreUsuario: "",
        sector: "selec",
        usuario: "selec",
        respuesta: {},
        payload: {},
        alcances: [],
        alcancesValidar: [],
        sectores: [],
        sectoresValidar: [],
        tabla: [],
        tablaEv: [],
        asignaciones: [],
        asignacionesEv: [],
      }

      componentWillMount=async()=>{
        let usuarios = [];
        if(this.props.modalInfo.data[3]==="Experto"){
            await axios.get('/api/mostrarDetallesExperto/'+this.props.modalInfo.data[0])
            .then(async({data}) => {
                const experiencias = data.map((postulante)=>{
                    let experiencia = {};
                    experiencia['id_alcance'] = postulante.id_alcance;
                    return experiencia;
                })
                const experienciasUniq =uniqBy (experiencias,'id_alcance');
                if(isEmpty(experienciasUniq)){
                    this.setState({
                        respuesta: {exp: experienciasUniq,usuarios: usuarios}
                    })
                    return;
                }
                for (let index = 0; index < experienciasUniq.length; index++) {
                    const id_alcance = experienciasUniq[index].id_alcance;
                    await axios.get('/api/obtenerUsuariosPorAlcance/'+id_alcance)
                    .then(({data}) => {
                        usuarios.push(data[0]);
                        console.log("RECIBO",data)
                    }).catch(error => {
                        console.log("===ERROR: ",error);
                    });
                }
                this.setState({
                    respuesta: {exp: experienciasUniq,usuarios: uniqBy (usuarios,'id_usuario')}
                })
            }).catch(error => {
                console.log("===ERROR: ",error);
            });
        }
        if(this.props.modalInfo.data[3]==="Evaluador"){
            await axios.get('/api/mostrarDetallesEvaluador/'+this.props.modalInfo.data[0])
        .then(async({data}) => {
            const experiencias = data.map((postulante)=>{
                let experiencia = {};
                experiencia['id_sector_requerimiento'] = postulante.id_sector_requerimiento;
                return experiencia;
            })
            const experienciasUniq = uniqBy(experiencias,'id_sector_requerimiento');
            if(isEmpty(experienciasUniq)){
                this.setState({
                    respuesta: {exp: experienciasUniq,usuarios: usuarios}
                })
                return;
            }
            for (let index = 0; index < experienciasUniq.length; index++) {
                const id_sector_requerimiento = experienciasUniq[index].id_sector_requerimiento;
                await axios.get('/api/obtenerUsuariosPorSector/'+ id_sector_requerimiento)
                    .then(({data}) => {

                        usuarios.push(data[0]);
                    }).catch(error => {
                        console.log("===ERROR: ",error);
                    });
            }
            
            this.setState({
                respuesta: {exp: experienciasUniq,usuarios: uniqBy(usuarios,'id_usuario')}
            })
        }).catch(error => {
            console.log("===ERROR: ",error);
        });
        }
        let alcances =[];

        if(this.props.modalInfo.data[3]==="Experto"){
          const id_alcances= this.state.respuesta.exp;
          for (let index = 0; index < id_alcances.length; index++) {
            const id_alcance = id_alcances[index].id_alcance;
            const alcance = await this.props.getAlcance(id_alcance);
            alcances.push({id_alcance: id_alcance,nombreAlcance: alcance});
          }
          console.log(alcances);
          await this.setState({
            alcances: clone(alcances),
            alcancesValidar: clone(alcances),
          })
        }

        let sectores=[];
        
        if(this.props.modalInfo.data[3]==="Evaluador"){
          const id_sectores= this.state.respuesta.exp;
          for (let index = 0; index < id_sectores.length; index++) {
            const id_sector_requerimiento = id_sectores[index].id_sector_requerimiento;
            const sector = await this.props.getRequerimiento(id_sector_requerimiento);
            sectores.push({id_sector_requerimiento: id_sector_requerimiento,tipoSector: sector});
          }
          console.log(sectores);
          await this.setState({
            sectores: clone(sectores),
            sectoresValidar: clone(sectores),
          })
        }

      
      }

       closeModal = (e,prevent = false) => {
        prevent?e.persist():e.stopPropagation()
        this.props.closeModal()
      }

      handleChange = (evt) =>{
        console.log(evt.target)
        const name= evt.target.name;
        const value= evt.target.value;
        let index = evt.nativeEvent.target.selectedIndex;
        let text = evt.nativeEvent.target[index].text;
        this.setState({
            [name]: parseInt(value),
        });
      }

      render () {
      const data = this.props.modalInfo.data!==undefined?this.props.modalInfo.data:{};
      const val= data[3]==="Evaluador";
      let i =0;
      
    console.log(this.state.respuesta.usuarios);
      return (
          <div 
          className="modal-sae"
          onClick={ this.closeModal }>
    
            <div className="modal-content-sae modal-asignar"
              onClick={ e => e.stopPropagation() }>
                  <div className="modal-flex-sae">
                    <div className="modal-header text-center">
                        <h5 className="modal-title text-info" id="exampleModalLongTitle">Asignar {data[3]} padre</h5>
                        <span 
                            className="close-sae"
                            onClick={ this.closeModal }>&times;
                        </span>
                    </div>
                    <div className="modal-body pre-scrollable text-justify">
                    <div className="d-flex flex-row justify-content-between mb-1">
                      <Label name={"Postulante: "+data[2]+" "+data[1]} className="w-50"/>
                      <Label name={"ID: "+data[0]} className="w-50"/>
                    </div>
                    <div className="d-flex flex-row justify-content-between mb-1">
                                    <div className="d-flex flex-column w-50 mr-2">
                                        <h6>{val?"Sectores Postulados":"Alcances Postulados"}</h6>
                                            {!isEmpty(this.state.alcances)?(
                                              //console.log(this.state.alcances)
                                              this.state.alcances.map((alcance)=>{
                                                //console.log(alcance)
                                              return <Label key={alcance.id_alcance} name={alcance.nombreAlcance}></Label>
                                            })):null}
                                            {!isEmpty(this.state.sectores)?(
                                              //console.log(this.state.sectores)
                                              this.state.sectores.map((sector)=>{
                                                //console.log(sector)
                                              return <Label key={sector.id_sector_requerimiento} name={sector.tipoSector}></Label>
                                            })):null}
                                    </div>
                                    <div className="d-flex flex-column w-50">
                                        <Label name={data[3]+" a asignar"}/>
                                        <select className="h-50" name="usuario" value={this.state.usuario} onChange={this.handleChange}>
                                            <option disabled value="selec">Seleccione</option>
                                            {!isEmpty(compact(this.state.respuesta.usuarios))?(
                                              //console.log(compact(this.state.respuesta.usuarios))
                                              compact(this.state.respuesta.usuarios).map((usuario)=>{
                                                console.log(usuario)
                                                  return <option key={usuario.id_usuario} value={usuario.id_usuario}>{usuario.nombre+" "+usuario.apellido}</option>
                                            })):null}
                                          
                                        </select>
                                    </div>
                                </div>
                    </div>
                
                    <div className="modal-footer">
                            <React.Fragment>
                              <button type="button" className="btn btn-secondary w-20 bg-light" style={{color:'#6c757d'}} onClick={this.closeModal}>Cancelar</button>
                            {this.state.usuario!=="selec"? (
                            <button type="button" className="btn btn-secondary w-20"
                            onClick={async(evt)=>{
                                await this.props.asignar(data[0],this.state.usuario,data);
                                await this.closeModal(evt,true);
                            }}>Asignar</button>):(
                              <button type="button" className="btn btn-secondary w-20" disabled>Asignar</button>
                            )}
                            </React.Fragment>
                    </div>
                </div>
            </div>
    
          </div>
        )
      }
  }