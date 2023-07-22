import { React, useContext } from 'react';
import './sidebar.styles.css';
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom';
import UserContext from '../../context/user-context';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import BloodtypeIcon from '@mui/icons-material/Bloodtype';
import SettingsIcon from '@mui/icons-material/Settings';

const SideBar = () => {

    const [ cuser ] = useContext(UserContext);

    return (
        <div className="sidebar__component">
            <div className="sidebar__header">

                <Avatar src={cuser && cuser.profile_picture ? process.env.REACT_APP_SERVER_API_BASE_URL + cuser.profile_picture : ''}>{ cuser.first_name.substring(0, 1) }</Avatar>

                <div className="sidebar__headerRight">
                    { `${cuser.first_name} ${cuser.last_name}` }
                </div>

            </div>
            <div className="sidebar_body">
                <ul className="sidebar_bodyorderlist">
                    <li className='sidebar_bodylist'>
                        <Link to='/dashboard' className='sidebar__icons'> <DashboardIcon />Dashboard </Link>
                    </li>
                    <li className='sidebar_bodylist'>
                        <Link to='#' className='sidebar__icons'> <LocalHospitalIcon />Doctors </Link>
                    </li>
                    <li className='sidebar_bodylist'>
                        <Link to='#' className='sidebar__icons'> <BloodtypeIcon /> Patients </Link>
                    </li>
                    <li className='sidebar_bodylist'>
                        <Link to='#' className='sidebar__icons'> <SettingsIcon /> Settings </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default SideBar;