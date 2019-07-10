import React, { Component } from 'react';
import Checkbox from '../common/Checkbox'

export default class SectorItem extends Component {



    render() {
        const sector = this.props.sector.tipoSector;
        return (
            <div className="d-flex flex-row justify-content-start align-items-center px-5">
                <label className="w-20 text-left text-normal">
                    {sector}
                </label>
                <Checkbox id={this.props.id} className="mb-2" name={sector} checked={this.props.checkedItems.get(sector)} onChange={this.props.handleCheckBoxChange} />
            </div>
                
        );
    }
}