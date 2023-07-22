import { React, useState, useEffect, useContext } from "react";
import { Link } from 'react-router-dom';
import './doctors.styles.css';
import axios from '../../axios/axios';
import UserContext from '../../context/user-context';
import BreadCrumb from '../../components/breadcrumb/breadcrumb.component';
import UserList from '../../components/user-list/user-list.component';
import Pagination from "../../components/pagination/pagination.component";

const Doctors = () => {
    const breadcrumbPaths = [ { name: 'home', url: '' }, {name: 'Doctors', url: '/doctors'}];
    const [ cuser ] = useContext(UserContext);
    const [ doctors, setDoctors ] = useState([]);
    const [ msg, setMsg ] = useState(null);

    useEffect( () => {
        getDoctors();
    }, []);

    const getDoctors = async () => {
        await axios.get(`/user/getDoctors?per_page=5&page=1`, {
            headers: {
                'Authorization' : `Bearer ${cuser.access_token}`
            }
        })
        .then( res => {
            if( res.data.status ) {
                setDoctors(res.data.data);
            }
        })
        .catch( err => {
            if( err.response.data.status === false ) {
                setMsg(err.response.data.message);
            }
        });
    }

    return (
        <div className="doctors-listing__component">
            <BreadCrumb paths={breadcrumbPaths} />

            <h2>Doctors</h2>

            <div className="add-doctors">
                <Link to="#">+ Add Doctor</Link>
            </div>

            <div className='listing-header'>
                <div className='header-block'>
                    <span>Name</span>
                </div>
                <div className='header-block'>
                    <span>Email</span>
                </div>
                <div className='header-block'>
                    <span>Mob. Number</span>
                </div>
                <div className='header-block'>
                    <span>Gender</span>
                </div>
                <div className='header-block'>
                    <span>Blood Group</span>
                </div>
                <div className='header-block'>
                    <span>Qualification</span>
                </div>
                <div className='header-block'>
                    <span>Doctor Category</span>
                </div>
                <div className='header-block'>
                    <span>Address</span>
                </div>
                <div className='header-block'>
                    <span>Action</span>
                </div>
            </div>

            {
                doctors.rows 
                ?
                    doctors.rows.map( (doctor) => (
                        <UserList key={doctor.id} userList={doctor} type={2} />
                    ))
                : 
                (
                    <div className="no--data"> { msg } </div>
                )
            }

            {
                doctors.rows
                ?
                    (<Pagination pages={doctors} />)
                :
                    ''
            }
 
        </div>
    );
}

export default Doctors;