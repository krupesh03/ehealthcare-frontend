import { React, useState } from "react";
import './pagination.styles.css';
import { Link } from 'react-router-dom';
import constants from '../../constants/constants';

const Pagination = ({ pages, func, setperPage, setActivePage, perPage, activePage }) => {
    
    const handleChange = (e) => {
        setperPage(e.target.value);
        setActivePage(1);
        func(e.target.value, 1);
    }

    const handlePageChange = (e) => {
        e.preventDefault();
        const pageno = e.currentTarget.getAttribute('data-pageno');
        setActivePage(pageno);
        func(perPage, pageno);
    }

    const totalPages = [];
    for (let i = 1; i <= pages.total_pages; i++) {
        totalPages.push({ key: i, value: i});
    }

    var initialCount = Number(activePage) > 1 ? ( ( Number(activePage) - 1 ) * Number(perPage) ) + 1 : 1;
    var endCount = Number(initialCount) + Number(perPage) - 1 ;
    if ( endCount > pages.count ) {
        endCount = pages.count;
    }

    return (
        <div className="pagination__component">
            <div className="rows-per-page">
                <span>Rows per page</span>&nbsp;
                <select className="rows-per-page-select" id="rows-per-page-select" name="rows-per-page-select" onChange={handleChange} value={perPage}>
                    {
                        constants.ROWS_PER_PAGES.map( row => (
                            <option value={ row } key={row}>{ row }</option>
                        ) )
                    }
                </select>
            </div>
            <div className="showing-records">
                <span>{`Showing ${initialCount} - ${endCount} of ${pages.count}`}</span>
            </div>
            <div className="pagination">
            {
                totalPages
                ?
                totalPages.map( (page) => (
                    <Link to="#" 
                        onClick={handlePageChange} 
                        data-pageno={page.value}
                        className={ Number(activePage) === Number(page.value) ? 'active' : '' }
                    >
                        { page.key }
                    </Link>
                ))
                :
                ''
            }
            </div>
            
        </div>
    );
}

export default Pagination;