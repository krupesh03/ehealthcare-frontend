import { React, useState, useContext } from 'react';
import './change-password.styles.css';
import axios from '../../axios/axios';
import UserContext from '../../context/user-context';
import BreadCrumb from '../../components/breadcrumb/breadcrumb.component';
import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';

const ChangePassword = () => {
    const breadcrumbPaths = [ { name: 'home', url: '' }, {name: 'Change Password', url: '/change-password'}];
    const [ cuser ] = useContext(UserContext);
    const [ password, setPassword ] = useState(null);
    const [ msg, setMsg ] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPassword({...password, [name] : value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`/auth/change-password`, password, {
            headers: {
                'Authorization' : `Bearer ${cuser.access_token}`
            }
        })
        .then( res => {
            if( res.data.status ) {
                setMsg(res.data.message);
                setPassword(null);
            }
        })
        .catch( err => {
            if( err.response.data.status === false ) {
                setMsg(err.response.data.message);
            }
        })
    }

    return (
        <div className='change-password__component'>
            <BreadCrumb paths={breadcrumbPaths} />
            
            <h2>Change Password</h2>
            
            <form className='change-password-form' onSubmit={handleSubmit}>
                <div className='row g-3'>
                    <div className="col-sm-6">
                        <FormInput className='form-control'
                                    type='password'
                                    id='current_password'
                                    label='Current Password'
                                    value={password ? password.cpassword : ''}
                                    handleChange={handleChange}
                                    name='current_password'
                                    placeholder='Enter your current password'
                                    autoComplete='off'
                        />
                    </div>
                    <div className="col-sm-6">
                        <FormInput className='form-control'
                                    type='password'
                                    label='New Password'
                                    id='new_password'
                                    value={password ? password.npassword : ''}
                                    handleChange={handleChange}
                                    name='new_password'
                                    placeholder='Enter your new password'
                                    autoComplete='off'
                        />
                    </div>
                    <div className="col-sm-6">
                        <FormInput className='form-control'
                                    type='password'
                                    label='Confirm New Password'
                                    id='cnew_password'
                                    value={password ? password.cnpassword : ''}
                                    handleChange={handleChange}
                                    name='cnew_password'
                                    placeholder='Confirm new password'
                                    autoComplete='off'
                        />
                    </div>
                </div>
                
                <span className='success-msg'> { msg } </span>

                <CustomButton type="submit" className="btn btn-custom">SUBMIT</CustomButton>
            </form>
        </div>
    );
}

export default ChangePassword;