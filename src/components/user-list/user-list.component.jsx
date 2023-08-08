import {React, useContext} from 'react';
import './user-list.styles.css';
import { Link } from 'react-router-dom';
import UserContext from '../../context/user-context';
import axios from '../../axios/axios';
import Avatar from '@mui/material/Avatar';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import { deepOrange, deepPurple, blueGrey } from '@mui/material/colors';
import constants from '../../constants/constants';

const UserList = ({ userList, type, func, perPage, activePage }) => { 
    const [ cuser ] = useContext(UserContext);

    if ( type === constants.userType.DOCTOR ) {
        var deleteApiEndpoint = 'deleteDoctor';
        var restoreApiEndpoint = 'restoreDoctor';
        var typeName = 'doctor';
    } else if ( type === constants.userType.PATIENT ) {
        var deleteApiEndpoint = 'patient';
        var restoreApiEndpoint = 'rpatient';
        var typeName = 'patient';
    }

    const handleDelete = (e) => {

        e.preventDefault();
        const id = e.currentTarget.getAttribute('data-id');
        axios.delete(`user/${deleteApiEndpoint}/${id}`, {
            headers: {
                'Authorization' : `Bearer ${cuser.access_token}`
            }
        })
        .then( res => {
            if( res.data.status ) { 
                alert(res.data.message);
                func(perPage, activePage);
            }
        })
        .catch( err => {
            if( err.response.data.status === false ) {
                alert(err.response.data.message);
            }
        })
    }

    const handleRestore = (e) => {
        e.preventDefault();
        const id = e.currentTarget.getAttribute('data-id');
        axios.put(`user/${restoreApiEndpoint}/${id}`, {}, {
            headers: {
                'Authorization' : `Bearer ${cuser.access_token}`
            }
        })
        .then( res => {
            if( res.data.status ) { 
                alert(res.data.message);
                func(perPage, activePage);
            }
        })
        .catch( err => {
            if( err.response.data.status === false ) {
                alert(err.response.data.message);
            }
        })
    }

    return (
        <div className={`user-list-${typeName}__component`}>
            <span className='avatar-name'> 
                <Avatar src={userList.profile_picture ? process.env.REACT_APP_SERVER_API_BASE_URL + userList.profile_picture : ''} sx={{ width: 30, height: 30 }} >{ userList.first_name.toUpperCase().substring(0, 1) }</Avatar>&nbsp;
                <div className='name'>{userList.first_name} {userList.last_name}</div> 
            </span>
            <span className='email'> {userList.email} </span>
            <span className='mobile_number'> {userList.mobile_number} </span>
            {
                type === constants.userType.PATIENT
                ?
                (
                    <span className='date_of_birth'> {userList.birth_date} </span>
                )
                :
                ''
            }
            <span className='gender'> {userList.gender === 'M' ? 'Male' : userList.gender === 'F' ? 'Female' : 'Others' } </span>
            <span className='blood_group'> {userList.blood_group} </span>
            {
                type === constants.userType.DOCTOR 
                ?
                (
                    <span className='qualification'> {userList.qualificationDetails.value} </span>
                )
                :
                ''
            }
            {
                type === constants.userType.DOCTOR
                ?
                (
                    <span className='doctor_category'> {userList.doctorCategoryDetails.value} </span>
                )
                :
                ''
            }
            {
                type === constants.userType.PATIENT
                ?
                (
                    <span className='admission_date'> {userList.patient_admissions ? userList.patient_admissions.admission_date : ''} </span>
                )
                :
                ''
            }
            <span className='address'> {userList.address} </span>
            {
                !userList.deletedAt
                ?
                (
                    <span className='action'>
                        <Link to={`/update-${typeName}/${userList.id}`}>
                            <EditIcon sx={{ color: deepPurple[500] }} />
                        </Link>
                        <Link to='#' onClick={ handleDelete } data-id={userList.id}>
                            <DeleteIcon sx={{ color: deepOrange[500] }} />
                        </Link>
                    </span>
                )
                :
                (
                    <span className='action'>
                        <Link to='#' onClick={ handleRestore } data-id={userList.id}>
                            <RestoreFromTrashIcon sx={{ color: blueGrey[500] }} />
                        </Link>
                    </span>
                )

            }
        </div>
    );
}

export default UserList;