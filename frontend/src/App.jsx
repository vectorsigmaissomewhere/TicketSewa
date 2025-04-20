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
import EventDetail from './components/EventDetail/EventDetail';
import UpdateEvent from './components/Profile/UpdateEvent';
import PaymentSuccess from './components/EventDetail/PaymentSuccess';
import PaymentSuccessResult from './components/EventDetail/PaymentSuccessResult';
import Rate from './components/EventDetail/Rate';
import AdminView from './components/AdminView/AdminView';
import ChangeStatusComponent from './components/AdminView/ChangeStatusComponent';
import Faq from './components/Home/Faq';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/profile/' element={<Profile />} />
        <Route path='/profile/:eventContributorId' element={<Profile />} />
        <Route path='/settings/accountprofile' element={<AccountPublicProfile />} />
        <Route path='/settings/accountconfig' element={<AccountSettingsNav />}/>
        <Route path='/settings/transaction' element={<AddTransaction />} />
        <Route path='settings/moderator' element={<AddModerator />} />
        <Route path='/event' element={<AllEvent />} />
        <Route path='/eventdetail/:eventId' element={<EventDetail />} />
        <Route path='/profile/updateevent/:eventId' element={<UpdateEvent />}/>
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-result" element={<PaymentSuccessResult/>} />
        <Route path="/rate" element={<Rate/>} />
        <Route path="/admineventview/:eventId" element={<AdminView />} />
        <Route path="/changestatus/:email" element={<ChangeStatusComponent/>}/>
        <Route path="/faq" element={<Faq/>}/>
      </Routes>
    </Router>
  );
}

export default App;
