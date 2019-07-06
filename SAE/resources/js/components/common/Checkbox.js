import React from 'react';
import PropTypes from 'prop-types';

const Checkbox = ({ type = 'checkbox', name, checked = false, onChange, className, id }) => (
  <input id={id} className={className} type={type} name={name} checked={checked} onChange={onChange} />
);

Checkbox.propTypes = {
    id: PropTypes.number,
    type: PropTypes.string,
    name: PropTypes.string.isRequired,
    checked: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
}

export default Checkbox;