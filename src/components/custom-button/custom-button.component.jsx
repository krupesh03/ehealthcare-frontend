import React from 'react';
import './custom-button.styles.css';

const CustomButton = ({ children, ...otherButtonProps }) => {
    return (
        <div className='custom-button__component'>
            <button { ...otherButtonProps} > { children } </button>
        </div>
    );
}

export default CustomButton;