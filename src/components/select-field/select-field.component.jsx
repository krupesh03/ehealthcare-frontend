import React from 'react';
import './select-field.styles.css';

const SelectField = ({ label, handleChange, defaultValue, options, ...otherFormProps }) => {
    return (
        <div className='select-field__component'>
            <label className="col-form-label">{ label }</label>
            <select onChange={ handleChange } { ...otherFormProps}>
                <option value=''>{ label ? `Select ${label.toLowerCase()}` : '' }</option>
                {
                    options.length ?
                        options.map( (option, key) => {
                            return (<option value={option.key} key={key}> {option.value} </option>)
                        })
                    : ''
                }
            </select> 
        </div>
    );
}

export default SelectField;