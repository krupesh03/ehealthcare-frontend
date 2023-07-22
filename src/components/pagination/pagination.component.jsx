import React from "react";
import './pagination.styles.css';

const Pagination = ({ pages }) => {
    
    return (
        <div className="pagination__component">
            <div className="rows-per-page">
                Rows per page   <select className="test" name="test">
                                    <option value="5">5</option>
                                    <option value="10">10</option>
                                    <option value="15">15</option>
                                    <option value="20">20</option>
                                </select>
            </div>
            <div className="page-counter">
                1 - 5 of {pages.count}
            </div>
        </div>
    );
}

export default Pagination;