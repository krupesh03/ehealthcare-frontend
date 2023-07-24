import { React, useState } from "react";
import './pagination.styles.css';
import { Link } from 'react-router-dom';
import constants from '../../constants/constants';

const Pagination = ({ pages, func }) => {
    
    const [ perPage, setperPage ] = useState(constants.ROWS_PER_PAGES[0]);
    const [ active, setActive ] = useState(1);

    const handleChange = (e) => {
        setperPage(e.target.value);
        func(e.target.value, 1);
    }

    const handlePageChange = (e) => {
        e.preventDefault();
        const pageno = e.currentTarget.getAttribute('data-pageno');
        setActive(pageno);
        func(perPage, pageno);
    }

    const totalPages = [];
    for (let i = 1; i <= pages.total_pages; i++) {
        totalPages.push({ key: i, value: i});
    }

    return (
        <div className="pagination__component">
            <div className="rows-per-page">
                <span>Rows per page</span>&nbsp;
                <select className="rows-per-page-select" name="rows-per-page-select" onChange={handleChange} value={perPage}>
                    {
                        constants.ROWS_PER_PAGES.map( row => (
                            <option value={ row }>{ row }</option>
                        ) )
                    }
                </select>
            </div>
            <div class="pagination">
            {
                totalPages
                ?
                totalPages.map( (page) => (
                    <Link to="#" 
                        onClick={handlePageChange} 
                        data-pageno={page.value}
                        className={ Number(active) === Number(page.value) ? 'active' : '' }
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