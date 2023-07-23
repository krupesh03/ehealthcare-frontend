import { React, useState, useEffect, useContext } from 'react';
import './doctors.styles.css';
import BreadCrumb from '../../components/breadcrumb/breadcrumb.component';
import UserContext from '../../context/user-context';
import axios from '../../axios/axios';
import { useNavigate, useParams } from 'react-router-dom';
import FormInput from '../../components/form-input/form-input.component';
import SelectField from '../../components/select-field/select-field.component';
import TextareaField from '../../components/textarea-field/textarea-field.component';
import CustomButton from '../../components/custom-button/custom-button.component';

const AddUpdateDoctors = () => {
    const { userId } = useParams();
    const Title = userId === undefined ? 'Add Doctor' : 'Update Doctor';
    const breadcrumbPaths = [ { name: 'home', url: '' }, {name: 'Doctors', url: '/doctors'}, {name: Title, url: '#'} ];
    const navigate = useNavigate();
    const [ cuser ] = useContext(UserContext);
    const [ user, setUser ] = useState([]); 
    const [ msg, setMsg ] = useState(null);
    const [ error, setError ] = useState(null);
    const [ GenderOptions, setGenderOptions ] = useState([]);
    const [ BloodgroupOptions, setBloodgroupOptions ] = useState([]);
    const [ QualificationOptions, setQualificationOptions ] = useState([]);
    const [ DocCategoryOptions, setDocCategoryOptions ] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({...user, [name] : value });
    }

    const getPrefetch = async () => {
        await axios.get('user/prefetch', {
            headers: {
                'Authorization' : `Bearer ${cuser.access_token}`
            }
        })
        .then( res => {
            setGenderOptions(res.data.data.genders);
            setBloodgroupOptions(res.data.data.bloodGroups);
            setQualificationOptions(res.data.data.qualifications);
            setDocCategoryOptions(res.data.data.doctorCategory);
        })
        .catch( err => {
            console.log(err);
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('user/addDoctor', user, {
            headers : {
                'Authorization' : `Bearer ${cuser.access_token}`
            }
        })
        .then( res => {
            if( res.data.status ) {
                setMsg(res.data.message);
                setError(false);
                setTimeout( () => {
                    navigate('/doctors');
                }, 2000);
                
            }
        })
        .catch( err => {
            if( err.response.data.status === false ) {
                setMsg(err.response.data.message);
                setError(true);
            }
        }) 
    }

    useEffect( () => {
        getPrefetch();

        if( userId !== undefined ) {
            getDoctorDetails();
        }
    }, [userId])

    const getDoctorDetails = async () => {
        await axios.get(`user/getDoctor/${userId}`, {
            headers: {
                'Authorization' : `Bearer ${cuser.access_token}`
            }
        })
        .then( res => {
            if( res.data.status ) {
                setUser(res.data.data);
            }
        })
        .catch( err => {
            console.log(err);
        })
    }

    const handleEdit = (e) => {
        e.preventDefault();
        axios.put(`user/updateDoctor/${userId}`, user, {
            headers: {
                'Authorization' : `Bearer ${cuser.access_token}`
            }
        })
        .then( res => {
            if( res.data.status ) {
                setMsg(res.data.message);
                setError(false);
                setTimeout( () => {
                    navigate('/doctors');
                }, 2000);
            }
        })
        .catch( err => {
            if( err.response.data.status === false ) {
                setMsg(err.response.data.message);
                setError(true);
            }
        })
    }

    return (
        <div className='add-doctors__component'>
            <BreadCrumb paths={breadcrumbPaths} />

            <h2>{ Title }</h2>

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
                    { userId === undefined ? 
                        (<div className='col-sm-6'>
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
                        </div>) 
                        : 
                        '' 
                    }
                    {
                        userId === undefined ?
                        (<div className='col-sm-6'>
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
                        </div>)
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
                    <div className='col-sm-6'>
                        <SelectField className='form-control'
                                id='gender'
                                label='Gender'
                                value={user ? user.gender : ''}
                                onChange={handleChange}
                                name='gender'
                                options={GenderOptions}
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
                    <div className='col-sm-6'>
                        <SelectField className='form-control'
                                id='qualification'
                                label='Qualification'
                                value={user ? user.qualification : ''}
                                onChange={handleChange}
                                name='qualification'
                                options={QualificationOptions}
                        />
                    </div>
                    <div className='col-sm-6'>
                        <SelectField className='form-control'
                                id='doc_category'
                                label='Doctor category'
                                value={user ? user.doc_category : ''}
                                onChange={handleChange}
                                name='doc_category'
                                options={DocCategoryOptions}
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

export default AddUpdateDoctors;