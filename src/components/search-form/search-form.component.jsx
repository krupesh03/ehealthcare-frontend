import React from "react";
import './search-form.styles.css';
import SearchIcon from '@mui/icons-material/Search';

const SearchForm = ({func, handleSearchChange, ...otherFromProps}) => {
    return (
        <div className="search-form__component">
            <form onSubmit={ (e) => { e.preventDefault(); func(document.getElementById('rows-per-page-select').value, 1) }}>
                <input type="search" name="search" id="search" autoComplete="off" onChange={handleSearchChange} {...otherFromProps} /> &nbsp;
                <button type="submit" className="btn search-btn"> <SearchIcon sx={{width: 18, height: 25}} /> </button>
            </form>
        </div>
    );
}

export default SearchForm;