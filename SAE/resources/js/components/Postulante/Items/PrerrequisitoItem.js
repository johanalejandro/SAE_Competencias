import React, { Component } from 'react';
import Checkbox from '../../common/Checkbox'

export default class PrerrequisitoItem extends Component {



    render() {
        const requisito = this.props.requerimiento.requerimiento;
        const id = this.props.id;
        return (
            <div className="d-flex flex-row col-lg-12 col-sm-12 justify-content-start align-items-center">
                <label className="w-90 text-left text-normal">
                    {requisito}
                </label>
                <Checkbox id={id} className="mb-2" name={id.toString()} checked={this.props.checkedItems.get(id.toString())} onChange={this.props.handleCheckBoxChange} />
            </div>
                
        );
    }
}