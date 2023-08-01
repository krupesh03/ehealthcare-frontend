import { React, useState, useEffect, useContext } from 'react';
import './patients.styles.css';
import BreadCrumb from '../../components/breadcrumb/breadcrumb.component';
import FormInput from '../../components/form-input/form-input.component';
import SelectField from '../../components/select-field/select-field.component';
import TextareaField from '../../components/textarea-field/textarea-field.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import axios from '../../axios/axios';
import UserContext from '../../context/user-context';
import { useNavigate, useParams } from 'react-router-dom';
import DateTimePicker from '../../components/datetime-picker/datetime-picker.component';

const AddUpdatePatients = () => {
    const { userId } = useParams();
    const Title = userId === undefined ? 'Add Patient' : 'Update Patient';
    const breadcrumbPaths = [ { name: 'home', url: '' }, {name: 'Patients', url: '/patients'}, {name: Title, url: '#'} ];
    const [ user, setUser ] = useState([]);
    const [ genderOptions, setGenderOptions ] = useState([]);
    const [ cuser ] = useContext(UserContext);
    const [ BloodgroupOptions, setBloodgroupOptions ] = useState([]);
    const [ msg, setMsg ] = useState(null);
    const [ error, setError ] = useState(null);
    const navigate = useNavigate();
    const [startDate, setStartDate] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name] : value });
    }

    useEffect( () => {
        getPrefetch();

        if( userId !== undefined ) {
            getPatientDetails();
        }
    }, [userId]);

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

    const getPatientDetails = async () => {
        await axios.get(`user/patient/${userId}`, {
            headers: {
                'Authorization' : `Bearer ${cuser.access_token}`
            }
        })
        .then( (res) => {
            if( res.data.status ) {
                setUser(res.data.data);
            }
        })
        .catch( (err) => {
            console.log(err);
        })
    }

    const handleEdit = (e) => {
        e.preventDefault();
        axios.put(`user/patient/${userId}`, user, {
            headers : {
                'Authorization' : `Bearer ${cuser.access_token}`
            }
        })
        .then((res) => {
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

    const handleDateSelect = (date) => {
        //console.log(e.target.value);
    }

    const handleDateChange = (date) => {

        setStartDate(date);
        var newDate = '';
        if( date ) {
            var day = date.getDate();
            if( day < 10 ) {
                day = '0'+day;
            }
            var month = date.getMonth() + 1;
            if( month < 10 ) {
                month = '0'+month;
            }
            var year = date.getFullYear();
            newDate = year + '-' + month + '-' + day;
        }
        setUser({...user, admission_date: newDate});
    }

    return (
        <div className='app-update-patients__component'>
            <BreadCrumb paths={breadcrumbPaths} />
            
            <h2>{Title}</h2>

            <form onSubmit={ userId === undefined ? handleSubmit : handleEdit }>
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
                    {
                        userId === undefined
                        ?
                        (
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
                        )
                        :
                        ''
                    }
                    {
                        userId === undefined
                        ?
                        (
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
                        )
                        :
                        ''
                    }
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
                    <div className='col-sm-4'>
                        <SelectField className='form-control'
                                id='gender'
                                label='Gender'
                                value={user ? user.gender : ''}
                                onChange={handleChange}
                                name='gender'
                                options={genderOptions}
                        />
                    </div>
                    <div className='col-sm-4'>
                        <SelectField className='form-control'
                                id='blood_group'
                                label='Blood Group'
                                value={user ? user.blood_group : ''}
                                onChange={handleChange}
                                name='blood_group'
                                options={BloodgroupOptions}
                        />
                    </div>
                    <div className='col-sm-4'>
                        <DateTimePicker className='form-control'
                                label='Admission Date'
                                selected={user && user.patient_admissions ? new Date(user.patient_admissions.admission_date) : startDate}
                                onSelect={handleDateSelect}
                                onChange={handleDateChange}
                                placeholderText="Click to select a date"
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