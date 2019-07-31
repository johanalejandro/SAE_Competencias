import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { isEmpty, size } from 'lodash';
import { ClipLoader } from "react-spinners";
import Label from '../common/Label';

let anexo = "";

export default class EducacionFormal extends Component {

    constructor(props) {
        super(props);
      }

      state={
          loading: false,
      }

    handleSubmit = (e) => {
        //preventDefault prevents page reload   
        e.preventDefault();
        /*A call back to the onAdd props. The current
         *state is passed as a param
         */
        this.props.handlePostulante();
      }

      setLoading = () =>{
          this.setState({
              loading: false,
          })
      }

      handleLoadLocalFile = async (e) => {
        e.preventDefault();
        this.setState({
            loading: true,
        })
        const name = e.target.name;
        const { files } = e.target;
        const file = files[0];
        file['enctype'] = "multipart/form-data";
        let reader = new FileReader();
            reader.onload = (e) => {
                anexo= e.target.result;
            };
            reader.readAsDataURL(file);
        await setTimeout(()=>{
            const formData = {file: anexo}
            this.props.handleChangeFile(name,formData);
            this.setLoading();
        },10000);
      }

    /*componentDidMount(){

        fetch('/api/ambito')
        .then(response => {
            return response.json();
        })
        .then(ambitos => {
            //Fetched product is stored in the state
            this.setState({ ambitos });
        }).catch(error => {
            console.log("===ERROR: ",error);
        });
    }

    handleCheckBoxChange = ({target}) => {
        const ambitos = this.state.ambitos;
        const item = target.name;
        const id = target.id;
        const isChecked =target.checked;
        this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(item, isChecked) }));
        const ambito = ambitos.find((ambito)=>{
            return ambito.id_ambito === parseInt(id);
        });
        const cloneArray = clone(this.state.ambitosArray);
        if(isChecked){
            const cloned = cloneArray.concat(ambito);
            this.setState({
                ambitosArray: cloned,
            })
        }else{
            const cloned = pull(cloneArray,ambito);
            this.setState({
                ambitosArray: cloned,
            })
        }
    }*/

    render() {
        //console.log("ambitos escogidos: ",this.state.ambitosArray);
        console.log("Anexo",anexo);
        return (
            <React.Fragment>
                <div className="d-flex flex-column align-items-center justify-content-between w-100">
                        <h2>Educación Formal</h2>
                        <div className="w-100 mb-2">
                                <div className="d-flex flex-row justify-content-between w-65">
                                   
                                    <div className="d-flex flex-column w-50">
                                        <Label name="Institución"/>
                                        <input type="text" className="h-50" name="nombreInstitucion" defaultValue={this.props.nombreInstitucion} onChange={this.props.handleChange}></input>
                                    </div>
                                </div>
                                <div className="d-flex flex-row justify-content-between w-65">
                                   
                                    <div className="d-flex flex-column w-50">
                                        <Label name="Título Obtenido"/>
                                        <input type="text" className="h-50" name="tituloObtenido" defaultValue={this.props.tituloObtenido} onChange={this.props.handleChange}></input>
                                    </div>
                                </div>
                                <div className="d-flex flex-column w-50 mr-4">
                                        <Label name="Tipo de Formación"/>
                                        <select className="h-50" name="tipoFormacion" defaultValue={this.props.tipoFormacion} onChange={this.props.handleChange}>
                                            <option disabled value="selec">Seleccione</option>
                                            <option value="Tercer Nivel">Tercer Nivel</option>
                                            <option value="Cuarto Nivel">Cuarto Nivel</option>
                                            <option value="Doctorado(PHD)">Doctorado(PHD)</option>
                                        </select>
                                    </div>
                                    <div className="d-flex flex-column w-50 mr-4">
                                        <Label name="Anexo"/>
                                        <label id="anexo-label" className="w-25 text-left text-normal h-50">
                                              {this.state.loading ? (
                                                  <div className="d-flex flex-column justify-content-center w-100 align-items-center">
                                                      <ClipLoader sizeUnit={"px"} size={30} color={"#9561e2"} className="block" />
                                                      <div className="text-primary text-center">Cargando anexo</div>
                                                  </div>
                                              ) : (
                                                  isEmpty(this.props.archivoAnexo)? (
                                                      <form encType="multipart/form-data" method="POST"> 
                                                          <div className="d-flex justify-content-center text-blue align-items-center btn btn-secondary h-100">
                                                              <span className="text-center">Cargar archivo</span>
                                                          </div>
                                                          <input
                                                              type="file"
                                                              name="archivoAnexo"
                                                              className="d-none"
                                                              onChange={this.handleLoadLocalFile}
                                                              id="archivoAnexo"
                                                          />
                                                      </form>
                                                  ):(
                                                    <div className="d-flex flex-column justify-content-center w-100 align-items-center">
                                                      <div className="text-primary text-center">Archivo Cargado</div>
                                                  </div>
                                                  )
                                              )}
                                              <div id="fileDisplayArea" className="mt--6 ml--10 inset-0 h-0" />
                                          </label>

                                    </div>
                        </div>
                </div>

            <div className="d-flex flex-row justify-content-end align-items-center py-4">
                <button name="experiencia" className="btn-primary-sae w-20" 
                    onClick={(evt)=>{
                        this.props.handleChangeTipo(evt);
                        }}
                >Siguiente</button>
            </div>
            </React.Fragment>
        );
    }
}

if (document.getElementById('educacion-formal')) {
    ReactDOM.render(<EducacionFormal />, document.getElementById('educacion-formal'));
}
