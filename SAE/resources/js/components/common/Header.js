import React, { Component } from 'react';
import Img from './Img';

export default class Header extends Component {


    render() {
        return (
                <div className="d-flex flex-row justify-content-around align-items-center h-15">
                    <div className="w-40 mb-5">
                        <Img className="w-auto px-2" imageType="header"/>
                    </div>
                    <div className="d-flex jumbotronSAE w-60 h-100 mb-5 justify-content-center align-items-center pt-4">
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