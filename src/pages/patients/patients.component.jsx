import { React, useState, useEffect, useContext } from 'react';
import './patients.styles.css';
import { Link } from 'react-router-dom';
import axios from '../../axios/axios';
import UserContext from '../../context/user-context';
import BreadCrumb from '../../components/breadcrumb/breadcrumb.component';
import constants from '../../constants/constants';
import UserList from '../../components/user-list/user-list.component';
import Pagination from "../../components/pagination/pagination.component";
import SearchForm from "../../components/search-form/search-form.component";

const Patients = () => {
    const breadcrumbPaths = [ { name: 'home', url: '' }, {name: 'Patients', url: '/patients'}];
    const [ cuser ] = useContext(UserContext);
    const [ patients, setPatients ] = useState([]);
    const [ msg, setMsg ] = useState(null);
    const [ searchQuery, setSearchQuery ] = useState('');

    useEffect( () => {
        getPatients(constants.ROWS_PER_PAGES[0], 1);
    }, []);

    const getPatients =  async (perPage, page) => {
        await axios.get(`user/patient?per_page=${perPage}&page=${page}&search_query=${searchQuery}`, {
            headers: {
                'Authorization' : `Bearer ${cuser.access_token}`
            }
        })
        .then( res => {
            if( res.data.status ) {
                setPatients(res.data.data);
            }
        })
        .catch( err => {
            if( err.response.data.status === false ) {
                setPatients([]);
                setMsg(err.response.data.message);
            }
        });
    }

    const handleSearchChange = (e) => {
        const { value } = e.target;
        setSearchQuery(value);
    }

    return (
        <div className='patients-listing__component'>
            <BreadCrumb paths={breadcrumbPaths} />

            <h2>Patients Listing</h2>

            <div className="patient-listing-header">
                <SearchForm func={getPatients}
                            onChange={handleSearchChange}
                            placeholder="Search by name, email or mobile number" />

                <div className="add-patients">
                    <Link to="/add-patients">+ Add Patient</Link>
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
                <div className='header-block address'>
                    <span>Address</span>
                </div>
                <div className='header-block action'>
                    <span>Action</span>
                </div>
            </div>

            {
                patients.rows
                ?
                    patients.rows.map( (patient) => (
                        <UserList key={patient.id} userList={patient} type={constants.userType.PATIENT} func={getPatients} />
                    ))
                :
                (
                    <div className="no--data"> { msg } </div>
                )
            }

            {
                patients.rows
                ?
                    (<Pagination pages={patients} func={getPatients} />)
                :
                    ''
            }

        </div>
    );
}

export default Patients;