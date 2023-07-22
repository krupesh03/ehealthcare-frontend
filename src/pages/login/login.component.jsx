import React, { useState, useEffect, useContext } from 'react';
import './login.styles.css';
import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import axios from '../../axios/axios';
import { useNavigate, useParams } from 'react-router-dom';
import UserContext from '../../context/user-context';

const Login = () => {

    const navigate = useNavigate();
    let { module } = useParams();
    const [user, setUser] = useState({
        email: "",
        password: "",
        type: module === 'administrator' ? 1 : module === 'doctor' ? 2 : 3
    });
    const [msg, setMsg] = useState(null);
    const [cuser, setcUser] = useContext(UserContext);

    const handleLogin = (e) => {
        e.preventDefault();
        axios.post('/auth/login', user)
        .then( res => {
            if( res.data.status ) {
                setcUser(res.data.data);
                navigate('/dashboard');
            }
        })
        .catch( err => {
            if( err.response.data.status === false ) {
                setMsg(err.response.data.message);
            }
        });
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value});
    }

    useEffect(() => {
        if (module !== undefined) {
            let userType = module === 'administrator' ? 1 : module === 'doctor' ? 2 : 3
            setUser({ email: "", password: "", type: userType });
            setMsg(null);
        }
    }, [module])

    return (
        <div className='login__component'> 
            <div className='login_header'>{ module } Login</div>
            <form className='login-form' onSubmit={ handleLogin }>
                <div className="mb-3 row">
                    <div className="col-sm-12">
                        <FormInput className='form-control'
                                    type='text'
                                    id='email'
                                    label='Email'
                                    value={user.email}
                                    handleChange={handleChange}
                                    name='email'
                                    placeholder='Enter your email'
                                    autoComplete='off'
                        />
                    </div>
                </div>
                <div className="mb-3 row">
                    <div className="col-sm-12">
                        <FormInput className='form-control'
                                    type='password'
                                    label='Password'
                                    id='password'
                                    value={user.password}
                                    handleChange={handleChange}
                                    name='password'
                                    placeholder='Enter your password'
                                    autoComplete='off'
                        />
                    </div>
                </div>
                <div className={msg ? `error-message` : ''}>{ msg }</div>
                <CustomButton type="submit" className="btn btn-custom">LOGIN</CustomButton>
            </form>
        </div>
    );
}

export default Login;