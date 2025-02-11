import { Routes, Route, useNavigate } from "react-router-dom";
import Profile from "../Profile/AccountPublicProfile";

function Settings() {
  return (
    <div>
      <h1>Settings Page</h1>
      <Routes>
        <Route path="accountprofile" element={<Profile />} />
        
      </Routes>
    </div>
  );
}

export default Settings;
