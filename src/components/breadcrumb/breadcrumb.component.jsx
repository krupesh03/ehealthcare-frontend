import React from 'react';
import './breadcrumb.styles.css';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';

const BreadCrumb = ({ paths }) => {
    return (
        <div className='breadcrumb__component'>
            {
                paths.map( (path, key) => (
                    <div className='path' key={key}> 
                        { 
                            path.name === 'home' ? 
                                <HomeIcon /> 
                            : 
                                <div className='breadcrumb-path'>
                                    &nbsp;&gt; <Link className='breadcrumb-link' to={path.url}> {path.name} </Link>
                                </div>
                        } 
                    </div>
                ))
            }
        </div>
    );
}

export default BreadCrumb;