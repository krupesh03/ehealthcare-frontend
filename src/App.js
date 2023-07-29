import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
import './App.css';
import Header from './components/header/header.component';
import Homepage from './pages/homepage/homepage.component';
import Aboutus from './pages/aboutus/aboutus.component';
import Faq from './pages/faq/faq.component';
import Login from './pages/login/login.component';
import Dashboard from './pages/dashboard/dashboard.component';
import AccountDetails from './pages/account-details/account-details.component';
import ChangePassword from './pages/change-password/change-password.component';
import Doctors from './pages/doctors/doctors.component';
import AddUpdateDoctors from './pages/doctors/addupdate.component';
import Footer from './components/footer/footer.component';
import SideBar from './components/sidebar/sidebar.component';
import UserContext from './context/user-context';
import { useState, useEffect } from 'react';
import Patients from './pages/patients/patients.component';
import AddUpdatePatients from './pages/patients/addupdate.component';

function App() {

  const navigate = useNavigate();
  let { module } = useParams();
  const [cuser, setcUser] = useState(null);

  useEffect( () => {
    console.log('useeffect', cuser);
    if( !cuser ) {
      //navigate(`/login/administrator`);
    } else {
      //navigate('/dashboard');
    }
  }, [navigate, cuser])
  
  return (
    <div className="App">
      <UserContext.Provider value={[cuser, setcUser]}>
        <Header /> 
      </UserContext.Provider>
        <div className={ cuser ? `app_body` : ''}>
          { cuser ? 
                <UserContext.Provider value={[cuser, setcUser]}>
                  <SideBar />
                </UserContext.Provider>
           : '' }
          <div className={ cuser ? 'main-layout' : ''}>
            <Routes>
              <Route exact path='/' element={ <Homepage /> } />
              <Route path='/about-us' element={ <Aboutus /> } />
              <Route path='/faq' element={ <Faq /> } />

              <Route path='/login/:module' 
                    element={ 
                      <UserContext.Provider value={[cuser, setcUser]}>
                        <Login /> 
                      </UserContext.Provider>
                    } />
              
                <Route path='/dashboard' 
                      element={ 
                        <UserContext.Provider value={[cuser, setcUser]}>
                          <Dashboard /> 
                        </UserContext.Provider>
                      } />
                <Route path='/account-details' 
                      element={ 
                        <UserContext.Provider value={[cuser, setcUser]}>
                          <AccountDetails />
                        </UserContext.Provider>
                      } />
                <Route path='/change-password' 
                      element={ 
                        <UserContext.Provider value={[cuser, setcUser]}>
                          <ChangePassword />
                        </UserContext.Provider>
                      } />
                <Route path='/doctors'
                      element={
                        <UserContext.Provider value={[cuser, setcUser]}>
                          <Doctors />
                        </UserContext.Provider>
                      } />
                <Route path='/add-doctors'
                      element={
                        <UserContext.Provider value={[cuser, setcUser]}>
                          <AddUpdateDoctors />
                        </UserContext.Provider>
                      } />
                <Route path='/update-doctor/:userId'
                      element={
                        <UserContext.Provider value={[cuser, setcUser]}>
                          <AddUpdateDoctors />
                        </UserContext.Provider>
                      } />
                <Route path='/patients'
                      element={
                        <UserContext.Provider value={[cuser, setcUser]}>
                          <Patients />
                        </UserContext.Provider>
                      } />
                <Route path='/add-patients'
                      element={
                        <UserContext.Provider value={[cuser, setcUser]}>
                          <AddUpdatePatients />
                        </UserContext.Provider>
                      } />
                <Route path='/update-patient/:userId'
                      element={
                        <UserContext.Provider value={[cuser, setcUser]}>
                          <AddUpdatePatients />
                        </UserContext.Provider>
                      } />
              
            </Routes>
          </div>
        </div>
        <Footer />
    </div>
  );
}

export default App;
