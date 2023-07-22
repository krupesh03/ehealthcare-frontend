import { React, useContext } from 'react';
import './header.styles.css';
import { Link, useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import UserContext from '../../context/user-context';

const Header = () => {

    const navigate = useNavigate();

    const [ cuser, setcUser]  = useContext(UserContext);

    const handleLogout = (e) => {
        e.preventDefault();
        setcUser(null);
        navigate('/');
    }

    return (
        <div className='header__component'>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link to='/' className='navbar-brand'>eHCare</Link>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {
                        !cuser ?
                        ( <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to='/' className='nav-link active'>Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/about-us' className='nav-link'>About Us</Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/faq' className='nav-link'>FAQ</Link>
                            </li>
                        </ul>)
                        :
                        ( <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul> )
                    }
                        <div className='d-flex'>
                        {
                            cuser ? 
                            ( <ul className="navbar-nav">
                                <li className="nav-item dropdown">
                                    <Link to="#" className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false"> 
                                        <Avatar src={cuser && cuser.profile_picture ? process.env.REACT_APP_SERVER_API_BASE_URL + cuser.profile_picture : ''}>{ cuser.first_name.substring(0, 1) }</Avatar>
                                    </Link>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                        <li><Link className="dropdown-item" to="/account-details">Account Details</Link></li>
                                        <li><Link className="dropdown-item" to="/change-password">Change Password</Link></li>
                                        <li><Link className="dropdown-item" to="#" onClick={ handleLogout }>Logout</Link></li>
                                    </ul>
                                </li> 
                            </ul>)
                            :
                            ( <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link to='/login/doctor' className='nav-link'>Doctor Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to='/login/patient' className='nav-link'>Patient Login</Link>
                                </li>
                            </ul>)
                        }
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Header;
