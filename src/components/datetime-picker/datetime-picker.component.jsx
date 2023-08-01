import { React,  useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './datetime-picker.styles.css';

const DateTimePicker = ({label, selected, handleDateSelect, handleDateChange, ...otherFormProps}) => {
    
    return (
        <div className="datetime-picker__component">
            <label className="col-form-label">{ label }</label>
            <DatePicker
                dateFormat="yyyy-MM-dd"
                selected={selected}
                onSelect={handleDateSelect} //when day is clicked
                onChange={handleDateChange} //only when value has changed
                {...otherFormProps}
            />
        </div>
    );
}

export default DateTimePicker;