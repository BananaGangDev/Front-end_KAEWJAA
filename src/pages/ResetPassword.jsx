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
        <div className='reset-h1'>
          <h1>Reset Password</h1>
        </div>
        <div>
          <label>Old Password</label>
          <div className="old">
            <input
              className='input-old'
                type="password"
                placeholder="Old password"
                required
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
        </div>
        <div>
          <label>New Password</label>
          <div className="new">
            <input
              className="input-new"
              type="password"
              placeholder="New password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
        </div>
        <div>
          <label>Confirm New Password</label>
          <div className="confirm">
            <input
              className="input-confirm"
              type="password"
              placeholder="New password"
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