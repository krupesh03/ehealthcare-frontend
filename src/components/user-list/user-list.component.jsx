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

const UserList = ({ userList, type, func }) => { 
    const [ cuser ] = useContext(UserContext);

    if ( type === 2 ) {
        var deleteDoctorApiEndpoint = 'deleteDoctor';
        var restoreDoctorApiEndpoint = 'restoreDoctor';
    }

    const handleDelete = (e) => {

        e.preventDefault();
        const id = e.currentTarget.getAttribute('data-id');
        axios.delete(`user/${deleteDoctorApiEndpoint}/${id}`, {
            headers: {
                'Authorization' : `Bearer ${cuser.access_token}`
            }
        })
        .then( res => {
            if( res.data.status ) { 
                alert(res.data.message);
                func(constants.ROWS_PER_PAGES[0], 1);
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
        axios.put(`user/${restoreDoctorApiEndpoint}/${id}`, {}, {
            headers: {
                'Authorization' : `Bearer ${cuser.access_token}`
            }
        })
        .then( res => {
            if( res.data.status ) { 
                alert(res.data.message);
                func(constants.ROWS_PER_PAGES[0], 1);
            }
        })
        .catch( err => {
            if( err.response.data.status === false ) {
                alert(err.response.data.message);
            }
        })
    }

    return (
        <div className='user-list__component'>
            <span className='avatar-name'> 
                <Avatar src={userList.profile_picture ? process.env.REACT_APP_SERVER_API_BASE_URL + userList.profile_picture : ''}>{ userList.first_name.substring(0, 1) }</Avatar>
                {userList.first_name} {userList.last_name} 
            </span>
            <span className='email'> {userList.email} </span>
            <span className='mobile_number'> {userList.mobile_number} </span>
            <span className='gender'> {userList.gender} </span>
            <span className='blood_group'> {userList.blood_group} </span>
            <span className='qualification'> {userList.qualificationDetails.value} </span>
            <span className='doctor_category'> {userList.doctorCategoryDetails.value} </span>
            <span className='address'> {userList.address} </span>
            {
                !userList.deletedAt
                ?
                (
                    <span className='action'>
                        <Link to={`/update-doctor/${userList.id}`}>
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