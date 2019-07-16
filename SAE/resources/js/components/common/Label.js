import React, { Component } from 'react';

export default class Label extends Component {



    render() {
        const name = this.props.name;
        return (

            <label className="w-50 text-left text-normal h-50">
                {name}
            </label>
                
        );
    }
}