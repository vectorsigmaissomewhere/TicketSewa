import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './components/Auth/Signup';
import Login from './components/Auth/Login';
import Home from './components/Home/Home';
import Profile from './components/Profile/Profile';
import AccountPublicProfile from './components/Profile/AccountPublicProfile';
import AccountSettingsNav from './components/Profile/AccountSettingsNav';
import AddTransaction from './components/Profile/AddTransaction';
import AddModerator from './components/Profile/AddModerator';
import AllEvent from './components/AllEvent/AllEvent'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/settings/accountprofile' element={<AccountPublicProfile />} />
        <Route path='/settings/accountconfig' element={<AccountSettingsNav />}/>
        <Route path='/settings/transaction' element={<AddTransaction />} />
        <Route path='settings/moderator' element={<AddModerator />} />
        <Route path='/event' element={<AllEvent />} />
      </Routes>
    </Router>
  );
}

export default App;
