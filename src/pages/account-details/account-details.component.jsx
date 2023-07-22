import { React, useState, useEffect, useContext } from 'react';
import './account-details.styles.css';
import axios from '../../axios/axios';
//import { useNavigate } from 'react-router-dom';
import BreadCrumb from '../../components/breadcrumb/breadcrumb.component';
import FormInput from '../../components/form-input/form-input.component';
import SelectField from '../../components/select-field/select-field.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import UserContext from '../../context/user-context';
import TextareaField from '../../components/textarea-field/textarea-field.component';
import Avatar from '@mui/material/Avatar';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

const AccountDetails = () => {
    const breadcrumbPaths = [ { name: 'home', url: '' }, {name: 'Account Details', url: '/account-details'}];
    //const navigate = useNavigate;
    const [ GenderOptions, setGenderOptions ] = useState([]);
    const [ BloodgroupOptions, setBloodgroupOptions ] = useState([]);
    const [ cuser, setcUser ] = useContext(UserContext);
    const [ user, setUser ] = useState(cuser);
    const [ msg, setMsg ] = useState(null);
    const [ error, setError ] = useState(null);

    useEffect( () => {
        async function getPrefetch() {
            await axios.get('/user/prefetch', {
                headers: {
                    'Authorization' : `Bearer ${cuser.access_token}`
                }
            })
            .then( res => {
                if( res.data.status ) {
                    setGenderOptions(res.data.data.genders);
                    setBloodgroupOptions(res.data.data.bloodGroups)
                }
            })
            .catch( err => {
                if( err.response.status === 401 ) {
                    //console.log('thiiiis');
                    //setcUser(null);
                    //navigate('/');
                }
            })
        }
        getPrefetch();
        
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    } 

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put(`/user/update_c`, {
            first_name: user.first_name, 
            last_name: user.last_name, 
            mobile_number: user.mobile_number, 
            gender: user.gender, 
            blood_group: user.blood_group, 
            address: user.address,
            profile_picture: user.profile_picture
        }, {
            headers: {
                'Authorization' : `Bearer ${cuser.access_token}`
            }
        })
        .then( res => {
            if( res.data.status ) {
                setcUser(user);
                setMsg(res.data.message);
                setError(false);
            }
        })
        .catch( err => {
            if( err.response.data.status === false ) {
                setMsg(err.response.data.message);
                setError(true);
            }
        });
    }

    const onFileChange = (e) => {

        const formData = new FormData();
        formData.append('avatar', e.target.files[0]);

        axios.post(`/user/uploadpic`, formData, {
            headers: {
                'Authorization' : `Bearer ${cuser.access_token}`
            }
        })
        .then( res => {
            if( res.data.status ) {
                setUser({ ...user, profile_picture: res.data.data.filename });
                setMsg(res.data.message);
                setError(false);
            }
        })
        .catch( err => {
            if( err.response.data.status === false ) {
                setMsg(err.response.data.message);
                setError(true);
            }
        });
    }

    return (
        <div className='account-details__component'>
            <BreadCrumb paths={breadcrumbPaths} />

            <h2>Account Details</h2>

            <div className='row g-3'>
                <div className="col-sm-6">
                    <Avatar 
                        sx={{ width: 200, height: 200 }} 
                        src={user && user.profile_picture ? 
                                process.env.REACT_APP_SERVER_API_BASE_URL + user.profile_picture : 
                            cuser && cuser.profile_picture ? 
                                process.env.REACT_APP_SERVER_API_BASE_URL + cuser.profile_picture 
                            : ''
                    } />
                    
                    <FormInput className='form-control' 
                                type='file'
                                id='profile_picture' 
                                onChange={onFileChange} 
                                name='profile_picture' 
                    />
                    <label htmlFor="profile_picture" className="camera-icon-class">
                        <CameraAltIcon />
                    </label>
                </div>
                <div className="col-sm-6">
                    <div className='row g-3'>
                        <div className="col-sm-12">
                            <FormInput className='form-control'
                                    type='text'
                                    id='first_name'
                                    label='First Name'
                                    value={user.first_name}
                                    onChange={handleChange}
                                    name='first_name'
                                    placeholder='Enter your first name'
                                    autoComplete='off'
                            />
                        </div>
                    </div>
                    <div className='row g-3'>
                        <div className="col-sm-12">
                            <FormInput className='form-control'
                                        type='text'
                                        id='last_name'
                                        label='Last Name'
                                        value={user.last_name}
                                        onChange={handleChange}
                                        name='last_name'
                                        placeholder='Enter your last name'
                                        autoComplete='off'
                            />
                        </div>
                    </div>
                </div>
                <div className="col-sm-6">
                    <FormInput className='form-control'
                                type='text'
                                id='email'
                                label='Email'
                                value={user.email}
                                onChange={handleChange}
                                name='email'
                                placeholder='Enter your email'
                                autoComplete='off'
                                readOnly
                    />
                </div>
                <div className="col-sm-6">
                    <FormInput className='form-control'
                                type='text'
                                id='mobile_number'
                                label='Mobile Number'
                                value={user.mobile_number}
                                onChange={handleChange}
                                name='mobile_number'
                                placeholder='Enter your mobile number'
                                autoComplete='off'
                    />
                </div>
                <div className="col-sm-6">
                    <SelectField className='form-control'
                                id='gender'
                                label='Gender'
                                value={user.gender}
                                onChange={handleChange}
                                name='gender'
                                options={GenderOptions}
                    />
                </div>
                <div className="col-sm-6">
                    <SelectField className='form-control'
                                id='blood_group'
                                label='Blood Group'
                                value={user.blood_group}
                                onChange={handleChange}
                                name='blood_group'
                                options={BloodgroupOptions}
                    />
                </div>
                <div className="col-sm-12">
                    <TextareaField className='form-control'
                                type='text'
                                id='address'
                                label='Address'
                                defaultValue={user.address}
                                onChange={handleChange}
                                name='address'
                                placeholder='Enter your address'
                                autoComplete='off'
                    />
                </div>
                <div className={ error === false ? 'success-message' : error === true ? 'error-message' : '' }> { msg } </div>
                <CustomButton type="button" className="btn btn-custom" onClick={handleSubmit}>SUBMIT</CustomButton>
            </div> 
        </div>
    );
}

export default AccountDetails;