import React from "react";
import './search-form.styles.css';
import SearchIcon from '@mui/icons-material/Search';
import constants from "../../constants/constants";

const SearchForm = ({func, handleSearchChange, ...otherFromProps}) => {

    const handleSubmit = (e) => {
        e.preventDefault();
        var perPage;
        if( document.getElementById('rows-per-page-select') ) {
            perPage = document.getElementById('rows-per-page-select').value;
        } else {
            perPage = constants.ROWS_PER_PAGES[0];
        }
        func(perPage, 1);
    }

    return (
        <div className="search-form__component">
            <form onSubmit={ handleSubmit }>
                <input type="search" name="search" id="search" autoComplete="off" onChange={handleSearchChange} {...otherFromProps} /> &nbsp;
                <button type="submit" className="btn search-btn"> <SearchIcon sx={{width: 18, height: 25}} /> </button>
            </form>
        </div>
    );
}

export default SearchForm;