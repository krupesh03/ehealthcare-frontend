import React from 'react';
import './form-input.styles.css';

const FormInput = ({ label, handleChange, ...otherFormProps }) => {
    return (
        <div className='form-input__component'>
            <label className="col-form-label">{ label }</label>
            <input onChange={ handleChange } { ...otherFormProps} />
        </div>
    );
}

export default FormInput;