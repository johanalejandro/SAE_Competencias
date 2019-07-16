import React, { Component } from 'react';
import Checkbox from '../../common/Checkbox'

export default class AlcanceItem extends Component {



    render() {
        const alcance = this.props.alcance.nombreAlcance;
        const id = this.props.id
        return (
            <div className="d-flex flex-row col-lg-4 col-sm-12 justify-content-start align-items-center">
                <label className="w-50 text-left text-normal">
                    {alcance}
                </label>
                <Checkbox id={id} className="mb-2" name={id.toString()} checked={this.props.checkedItems.get(id.toString())} onChange={this.props.handleCheckBoxChange} />
            </div>
                
        );
    }
}