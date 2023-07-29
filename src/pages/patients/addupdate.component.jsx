import { React, useState, useEffect, useContext } from 'react';
import './patients.styles.css';
import BreadCrumb from '../../components/breadcrumb/breadcrumb.component';
import FormInput from '../../components/form-input/form-input.component';
import SelectField from '../../components/select-field/select-field.component';
import TextareaField from '../../components/textarea-field/textarea-field.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import axios from '../../axios/axios';
import UserContext from '../../context/user-context';
import { useNavigate } from 'react-router-dom';

const AddUpdatePatients = () => {
    const breadcrumbPaths = [ { name: 'home', url: '' }, {name: 'Patients', url: '/patients'}, {name: 'Add Patient', url: '#'} ];
    const [ user, setUser ] = useState([]);
    const [ genderOptions, setGenderOptions ] = useState([]);
    const [ cuser ] = useContext(UserContext);
    const [ BloodgroupOptions, setBloodgroupOptions ] = useState([]);
    const [ msg, setMsg ] = useState(null);
    const [ error, setError ] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name] : value });
    }

    useEffect( () => {
        getPrefetch();
    }, []);

    const getPrefetch = async () => {
        await axios.get(`user/prefetch`, {
            headers: {
                'Authorization' : `Bearer ${cuser.access_token}`
            }
        })
        .then( (res) => {
            if( res.data.status ) {
                setGenderOptions(res.data.data.genders);
                setBloodgroupOptions(res.data.data.bloodGroups);
            }
        })
        .catch( (err) => {
            console.log(err);
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/user/patient', user, {
            headers: {
                'Authorization' : `Bearer ${cuser.access_token}`
            }
        })
        .then( (res) => {
            if( res.data.status ) {
                setMsg(res.data.message);
                setError(false);
                setTimeout( () => {
                    navigate('/patients');
                }, 2000);
                
            }
        })
        .catch( (err) => {
            if( err.response.data.status === false ) {
                setMsg(err.response.data.message);
                setError(true);
            }
        })
    }

    return (
        <div className='app-update-patients__component'>
            <BreadCrumb paths={breadcrumbPaths} />
            
            <h2>Add Patient</h2>

            <form onSubmit={handleSubmit}>
                <div className='row g-3'>
                    <div className='col-sm-6'>
                        <FormInput className='form-control'
                                    type='text'
                                    id='first_name'
                                    label='First Name'
                                    value={user ? user.first_name : ''}
                                    onChange={handleChange}
                                    name='first_name'
                                    placeholder='Enter first name'
                                    autoComplete='off'
                        />
                    </div>
                    <div className='col-sm-6'>
                        <FormInput className='form-control'
                                    type='text'
                                    id='last_name'
                                    label='Last Name'
                                    value={user ? user.last_name : ''}
                                    onChange={handleChange}
                                    name='last_name'
                                    placeholder='Enter last name'
                                    autoComplete='off'
                        />
                    </div>
                    <div className='col-sm-6'>
                        <FormInput className='form-control'
                                type='text'
                                id='email'
                                label='Email'
                                value={user ? user.email : ''}
                                onChange={handleChange}
                                name='email'
                                placeholder='Enter email'
                                autoComplete='off'
                        />
                    </div>
                    <div className='col-sm-6'>
                        <FormInput className='form-control'
                                    type='password'
                                    label='Password'
                                    id='password'
                                    value={user ? user.password : ''}
                                    handleChange={handleChange}
                                    name='password'
                                    placeholder='Enter password'
                                    autoComplete='off'
                        />
                    </div>
                    <div className='col-sm-6'>
                        <FormInput className='form-control'
                                    type='password'
                                    label='Confirm password'
                                    id='cpassword'
                                    value={user ? user.cpassword : ''}
                                    handleChange={handleChange}
                                    name='cpassword'
                                    placeholder='Enter confirm password'
                                    autoComplete='off'
                        />
                    </div>
                    <div className='col-sm-6'>
                        <FormInput className='form-control'
                                type='text'
                                id='mobile_number'
                                label='Mobile Number'
                                value={user ? user.mobile_number : ''}
                                onChange={handleChange}
                                name='mobile_number'
                                placeholder='Enter mobile number'
                                autoComplete='off'
                        />
                    </div>
                    <div className='col-sm-6'>
                        <SelectField className='form-control'
                                id='gender'
                                label='Gender'
                                value={user ? user.gender : ''}
                                onChange={handleChange}
                                name='gender'
                                options={genderOptions}
                        />
                    </div>
                    <div className='col-sm-6'>
                        <SelectField className='form-control'
                                id='blood_group'
                                label='Blood Group'
                                value={user ? user.blood_group : ''}
                                onChange={handleChange}
                                name='blood_group'
                                options={BloodgroupOptions}
                        />
                    </div>
                    <div className='col-sm-12'>
                        <TextareaField className='form-control'
                                type='text'
                                id='address'
                                label='Address'
                                defaultValue={user ? user.address : ''}
                                onChange={handleChange}
                                name='address'
                                placeholder='Enter address'
                                autoComplete='off'
                        />
                    </div>
                </div>
                <div className={ error === false ? 'success-message' : error === true ? 'error-message' : '' }> { msg } </div>
                <CustomButton type="submit" className="btn btn-custom">SUBMIT</CustomButton>
            </form>
        </div>
    );
}

export default AddUpdatePatients;