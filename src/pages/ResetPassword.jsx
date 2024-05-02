import { useState } from 'react';
import SideBar from "../components/SideBar";
import '/src/styles/ResetPassword.css'; 

const ResetPassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleResetPassword = (e) => {
    e.preventDefault();
    // reset password logic
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
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
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
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
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
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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