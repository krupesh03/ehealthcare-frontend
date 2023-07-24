import React from 'react';
import './breadcrumb.styles.css';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';

const BreadCrumb = ({ paths }) => {
    return (
        <div className='breadcrumb__component'>
            <ul className="breadcrumb">
                {
                    paths.map( (path, key) => (
                        <li key={key}>
                            { 
                                path.name === 'home' ? 
                                    <HomeIcon sx={{ height: 20, width: 20 }} />
                                : 
                                    <Link to={path.url}>{path.name}</Link>
                            } 
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}

export default BreadCrumb;