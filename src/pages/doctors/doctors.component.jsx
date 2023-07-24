import { React, useState, useEffect, useContext } from "react";
import { Link } from 'react-router-dom';
import './doctors.styles.css';
import axios from '../../axios/axios';
import UserContext from '../../context/user-context';
import BreadCrumb from '../../components/breadcrumb/breadcrumb.component';
import UserList from '../../components/user-list/user-list.component';
import Pagination from "../../components/pagination/pagination.component";
import constants from '../../constants/constants';
import SearchForm from "../../components/search-form/search-form.component";

const Doctors = () => {
    const breadcrumbPaths = [ { name: 'home', url: '' }, {name: 'Doctors', url: '/doctors'}];
    const [ cuser ] = useContext(UserContext);
    const [ doctors, setDoctors ] = useState([]);
    const [ msg, setMsg ] = useState(null);
    const [ searchQuery, setSearchQuery ] = useState('');

    useEffect( () => {
        getDoctors(constants.ROWS_PER_PAGES[0], 1);
    }, []);

    const getDoctors = async (perPage , page) => {
        await axios.get(`/user/getDoctors?per_page=${perPage}&page=${page}&search_query=${searchQuery}`, {
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
                setDoctors([]);
                setMsg(err.response.data.message);
            }
        });
    }

    const handleSearchChange = (e) => {
        const { value } = e.target;
        setSearchQuery(value);
    }

    return (
        <div className="doctors-listing__component">
            <BreadCrumb paths={breadcrumbPaths} />

            <h2>Doctors Listing</h2>

            <div className="doc-listing-header">
                <SearchForm func={getDoctors}
                            onChange={handleSearchChange}
                            placeholder="Search by name, email or mobile number" />

                <div className="add-doctors">
                    <Link to="/add-doctors">+ Add Doctor</Link>
                </div>
            </div>

            <div className='listing-header'>
                <div className='header-block name'>
                    <span>Name</span>
                </div>
                <div className='header-block email'>
                    <span>Email</span>
                </div>
                <div className='header-block mobile_number'>
                    <span>Mob. Number</span>
                </div>
                <div className='header-block gender'>
                    <span>Gender</span>
                </div>
                <div className='header-block blood_group'>
                    <span>Blood Group</span>
                </div>
                <div className='header-block qualification'>
                    <span>Qualification</span>
                </div>
                <div className='header-block doctor_category'>
                    <span>Doctor Category</span>
                </div>
                <div className='header-block address'>
                    <span>Address</span>
                </div>
                <div className='header-block action'>
                    <span>Action</span>
                </div>
            </div>

            {
                doctors.rows 
                ?
                    doctors.rows.map( (doctor) => (
                        <UserList key={doctor.id} userList={doctor} type={2} func={getDoctors} />
                    ))
                : 
                (
                    <div className="no--data"> { msg } </div>
                )
            }

            {
                doctors.rows
                ?
                    (<Pagination pages={doctors} func={getDoctors} />)
                :
                    ''
            }
 
        </div>
    );
}

export default Doctors;