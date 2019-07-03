import React, { Component } from 'react';
import Checkbox from '../common/Checkbox'

export default class AmbitoItem extends Component {



    render() {
        const ambito = this.props.ambito.nombreAmbito;
        return (
            <div className="d-flex flex-row justify-content-start align-items-center px-5">
                <label className="w-15 text-left text-normal">
                    {ambito}
                </label>
                <Checkbox id={this.props.id} className="mb-2" name={ambito} checked={this.props.checkedItems.get(ambito)} onChange={this.props.handleCheckBoxChange} />
            </div>
                
        );
    }
}