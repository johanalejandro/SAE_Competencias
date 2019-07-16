import React, { Component } from 'react';
import Checkbox from '../../common/Checkbox'

export default class SectorItem extends Component {



    render() {
        const sector = this.props.sector.tipoSector;
        const id = this.props.id;
        return (
            <div className="d-flex flex-row col-lg-6 col-sm-12 justify-content-start align-items-center">
                <label className="w-30 text-left text-normal">
                    {sector}
                </label>
                <Checkbox id={id} className="mb-2" name={id.toString()} checked={this.props.checkedItems.get(id.toString())} onChange={this.props.handleCheckBoxChange} />
            </div>
                
        );
    }
}