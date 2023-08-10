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

    const monthOptions = [{ key: 1, value : "January" }, { key: 2, value : "February" }, { key: 3, value : "March" }, { key: 4, value : "April" }, { key: 5, value : "May" }, { key: 6, value : "June" }, { key: 7, value : "July" }, { key: 8, value : "August" }, { key: 9, value : "September" }, { key: 10, value : "October" }, { key: 11, value : "November" }, { key: 12, value : "December" }];

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
                            id='month'
                            label='Month'
                            value={month}
                            onChange={handleChange}
                            name='month'
                            options={monthOptions}
                    />
                </div>
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
            </div>

            <br />

            <div className='row g-3'>
                <div className='col-sm-4'>
                    <table>
                        <tr>
                            <th colSpan="2">Active Users</th>
                        </tr>
                        <tr>
                            <th>Type</th>
                            <th>Count</th>
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
                            <tr><td colSpan="2">No Data</td></tr>
                        }
                        </tbody>
                    </table>
                </div>

                <div className='col-sm-4'>
                    <table>
                        <tr>
                            <th colSpan="2">De-active Users</th>
                        </tr>
                        <tr>
                            <th>Type</th>
                            <th>Count</th>
                        </tr>
                        <tbody>
                            {
                                data.deactive_users ? 
                                    data.deactive_users.map( (duser, key) => (
                                        <tr key={key}>
                                        <td>{ Object.keys(constants.userType).find(key => constants.userType[key] === duser.user_type) }</td>
                                        <td>{ duser.user_count }</td>
                                    </tr>
                                    ))
                                :
                                <tr><td colSpan="2">No Data</td></tr>
                            }
                        </tbody>
                    </table>
                </div>

                <div className='col-sm-4'>
                    <table>
                        <tr>
                            <th colSpan="2">Total Users</th>
                        </tr>
                        <tr>
                            <th>Type</th>
                            <th>Count</th>
                        </tr>
                        <tbody>
                            {
                                data.total_users ? 
                                    data.total_users.map( (tuser, key) => (
                                        <tr key={key}>
                                        <td>{ Object.keys(constants.userType).find(key => constants.userType[key] === tuser.user_type) }</td>
                                        <td>{ tuser.user_count }</td>
                                    </tr>
                                    ))
                                :
                                <tr><td colSpan="2">No Data</td></tr>
                            }
                        </tbody>
                    </table>
                </div>

                <div className='col-sm-12'>
                    <table>
                        <tr>
                            <th colSpan="3">Gender Wise Data</th>
                        </tr>
                        <tr>
                            <th>Type</th>
                            <th>Gender</th>
                            <th>Count</th>
                        </tr>
                        <tbody>
                            {
                                data.gender_data ? 
                                    data.gender_data.map( (guser, key) => (
                                        <tr key={key}>
                                        <td>{ Object.keys(constants.userType).find(key => constants.userType[key] === guser.user_type) }</td>
                                        <td>{ guser.gender === "M" ? "Male" : guser.gender === "F" ? "Female" : "Others" }</td>
                                        <td>{ guser.user_count }</td>
                                    </tr>
                                    ))
                                :
                                <tr><td colSpan="2">No Data</td></tr>
                            }
                        </tbody>
                    </table>
                </div>

                <div className='col-sm-6'>
                    <table>
                        <tr>
                            <th colSpan="2">Doctor Category Data</th>
                        </tr>
                        <tr>
                            <th>Category</th>
                            <th>Count</th>
                        </tr>
                        <tbody>
                            {
                                data.category_data ? 
                                    data.category_data.map( (cat, key) => (
                                        <tr key={key}>
                                        <td>{ cat.value }</td>
                                        <td>{ cat.doc_cnt }</td>
                                    </tr>
                                    ))
                                :
                                <tr><td colSpan="2">No Data</td></tr>
                            }
                        </tbody>
                    </table>
                </div>

                <div className='col-sm-6'>
                    <table>
                        <tr>
                            <th colSpan="2">Doctor Qualification Data</th>
                        </tr>
                        <tr>
                            <th>Qualification</th>
                            <th>Count</th>
                        </tr>
                        <tbody>
                            {
                                data.qualification_data ? 
                                    data.qualification_data.map( (qual, key) => (
                                        <tr key={key}>
                                        <td>{ qual.qualificationDetails.value }</td>
                                        <td>{ qual.doc_cnt }</td>
                                    </tr>
                                    ))
                                :
                                <tr><td colSpan="2">No Data</td></tr>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;