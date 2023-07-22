import React from 'react';
import './textarea-field.styles.css';

const TextareaField = ({ label, handleChange, ...otherFormProps }) => {
    return (
        <div className='textarea-field__component'>
            <label className="col-form-label">{ label }</label>
            <textarea onChange={ handleChange } {...otherFormProps} />
        </div>
    );
}

export default TextareaField;