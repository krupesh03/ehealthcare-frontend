import { React, useContext } from 'react';
import './dashboard.styles.css';
import UserContext from '../../context/user-context';
import BreadCrumb from '../../components/breadcrumb/breadcrumb.component';

const Dashboard = () => {
    const [ cuser ] = useContext(UserContext);
    const breadcrumbPaths = [{ name: 'home', url: '' }, {name: 'Dashboard', url: '/dashboard'}];

    return (
        <div className='dashboard__component'>
            <BreadCrumb paths={breadcrumbPaths} />
            <p> Welcome { `${cuser.first_name} ${cuser.last_name}` } </p>
        </div>
    );
}

export default Dashboard;