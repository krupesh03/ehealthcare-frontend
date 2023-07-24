import React from "react";
import './search-form.styles.css';
import SearchIcon from '@mui/icons-material/Search';
import constants from "../../constants/constants";

const SearchForm = ({func, handleSearchChange, ...otherFromProps}) => {
    return (
        <div className="search-form__component">
            <form onSubmit={ (e) => { e.preventDefault(); func(constants.ROWS_PER_PAGES[0], 1) }}>
                <input type="search" name="search" id="search" autoComplete="off" onChange={handleSearchChange} {...otherFromProps} /> &nbsp;
                <button type="submit" className="btn search-btn"> <SearchIcon sx={{width: 18, height: 25}} /> </button>
            </form>
        </div>
    );
}

export default SearchForm;