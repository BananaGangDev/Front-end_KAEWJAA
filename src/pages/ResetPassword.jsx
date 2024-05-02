import { useState } from 'react';
import SideBar from "../components/SideBar";
import '/src/styles/ResetPassword.css'; 
import api from '/src/api.jsx'; // Assume you have an API helper setup

const ResetPassword = () => {
  const [username, setUsername] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleResetPassword = async (e) => {
    e.preventDefault();
    
    // Prepare the data to be sent to the backend
    // const requestData = {
    //   username,
    //   firstname,
    //   lastname,
    //   new_password: newPassword
    // };

    try {
      // Send the request to the backend
      const response = await api.post(`/auth/forget-password?username=${username}&firstname=${firstname}&lastname=${lastname}&new_password=${newPassword}`);
      
      if (response.status === 200) {
        alert('Password reset successfully');
      } else {
        alert(`Error resetting password: ${response.data.detail}`);
      }
    } catch (error) {
      alert('Error resetting password: ' + error.message);
    }
  };

  return (
    <SideBar>
      <div className="reset-password-container">
        <form onSubmit={handleResetPassword}>
          <div className="header">
            <div className="headerContext">Reset Password</div>
          </div>
          <hr id="line" />
          <div>
            <label>Username</label>
            <div className="reset-input">
              <input
                className='input-username'
                type="text"
                placeholder="Username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label>Firstname</label>
            <div className="reset-input">
              <input
                className="input-firstname"
                type="text"
                placeholder="Firstname"
                required
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label>Lastname</label>
            <div className="reset-input">
              <input
                className="input-lastname"
                type="text"
                placeholder="Lastname"
                required
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label>New Password</label>
            <div className="reset-input">
              <input
                className="input-new-password"
                type="password"
                placeholder="New Password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
          </div>
          <div className='reset-submit'>
            <button type="submit">Reset password</button>
          </div>
        </form>
      </div>
    </SideBar>
  );
};

export default ResetPassword;