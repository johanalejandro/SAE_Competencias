import React, { Component } from 'react';

export default class Img extends Component {


    render() {
        const imageType=this.props.imageType || "";
        const className=this.props.className || "";

            switch(imageType) {
                case 'evaluador':
                  return <img className={className} src={require('./img/evaluador.jpg')} height="200px" width="200px"></img>;
                case 'experto':
                  return <img className={className} src={require('./img/experto.jpg')} height="200px" width="200px"></img> ;
                case 'header':
                  return <img className={className} src={require('./img/sae.png')} height="160px" width="200px"></img>;
                default:
                  return null;
            }
    }
}