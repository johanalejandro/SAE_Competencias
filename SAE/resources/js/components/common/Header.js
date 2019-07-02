import React, { Component } from 'react';
import Img from './Img';

export default class Header extends Component {


    render() {
        return (
                <div className="d-flex flex-row justify-content-center items-align-center">
                    <div className="w-40">
                        <Img imageType="header"/>
                    </div>
                    <div className="jumbotron w-60">
                        <h1>{this.props.title}</h1>  
                        {this.props.subtitle?(
                            <p>{this.props.subtitle}</p>
                        ):(
                            null
                        )} 
                    </div>
                </div>
        );
    }
}