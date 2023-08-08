import { React, useContext, useState, useEffect } from 'react';
import './dashboard.styles.css';
import UserContext from '../../context/user-context';
import BreadCrumb from '../../components/breadcrumb/breadcrumb.component';
import axios from '../../axios/axios';
import constants from '../../constants/constants';
import SelectField from '../../components/select-field/select-field.component';

const Dashboard = () => {
    const [ cuser ] = useContext(UserContext);
    const breadcrumbPaths = [{ name: 'home', url: '' }, {name: 'Dashboard', url: '#'}];
    const [ data, setData ] = useState([]);
    const [ year, setYear ] = useState(new Date().getFullYear());
    const [ month, setMonth ] = useState(new Date().getMonth()+1);

    const yearOptions = [{ key: 2019, value : 2019 }, { key: 2020, value : 2020 }, { key: 2021, value : 2021 }, { key: 2022, value : 2022 }, { key: 2023, value : 2023 }, { key: 2024, value : 2024 },{ key: 2025, value : 2025 }, { key: 2026, value : 2026 }];

    const monthOptions = [{ key: 1, value : 1 }, { key: 2, value : 2 }, { key: 3, value : 3 }, { key: 4, value : 4 }, { key: 5, value : 5 }, { key: 6, value : 6 }, { key: 7, value : 7 }, { key: 8, value : 8 }, { key: 9, value : 9 }, { key: 10, value : 10 }, { key: 11, value : 11 }, { key: 12, value : 12 }];

    useEffect( () => {
        getDashboardData(year, month);
    }, []);

    const getDashboardData = async (year, month) => {
        await axios.get(`dashboard?year=${year}&month=${month}`, {
            headers: {
                'Authorization' : `Bearer ${cuser.access_token}`
            }
        })
        .then( res => {
            if( res.data.status ) {
                setData(res.data.data);
            }
        })
        .catch( err => {
            console.log(err);
        })
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log( name, value);
        if( name === 'year' ) {
            setYear(value);
            getDashboardData(value, month);
        }
        if( name === 'month' ) { console.log('here');
            setMonth(value);
            getDashboardData(year, value);
        }
    }

    return (
        <div className='dashboard__component'>
            <BreadCrumb paths={breadcrumbPaths} />
            <h2> Welcome { `${cuser.first_name} ${cuser.last_name}` } </h2>

            <div className='row g-3'>
                <div className='col-sm-6'>
                    <SelectField className='form-control'
                                id='year'
                                label='Year'
                                value={year}
                                onChange={handleChange}
                                name='year'
                                options={yearOptions}
                        />
                </div>
                <div className='col-sm-6'>
                    <SelectField className='form-control'
                            id='month'
                            label='Month'
                            value={month}
                            onChange={handleChange}
                            name='month'
                            options={monthOptions}
                    />
                </div>
            </div>

            <table border="1">
                <tr>
                    <th colSpan="2">ACTIVE USERS</th>
                </tr>
                <tr>
                    <th>TYPE</th>
                    <th>COUNT</th>
                </tr>
                <tbody>
                {
                    data.active_users ?
                        data.active_users.map( (auser, key) => (
                            <tr key={key}>
                                <td>{ Object.keys(constants.userType).find(key => constants.userType[key] === auser.user_type) }</td>
                                <td>{ auser.user_count }</td>
                            </tr>
                        ))
                    :
                    <tr><td colSpan="2">No data</td></tr>
                }
                </tbody>
            </table>
        </div>
    );
}

export default Dashboard;