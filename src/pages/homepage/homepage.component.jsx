import React from 'react'
import './homepage.styles.css';
import homepagePic from '../../images/ehealthcare.jpg';

const Homepage = () => {
    return (
        <div className='homepage__component'>
            <img src={ homepagePic } alt="homepage" width="100%" height="auto" />
        </div>
    );
}

export default Homepage;