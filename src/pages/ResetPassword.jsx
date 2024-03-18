import { useState } from 'react';
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
    <div className="reset-password-container">
      <form onSubmit={handleResetPassword}>
      <h1>Reset Password</h1>
        <div>
          <label>Old Password</label>
          <div className="input-box1">
            <input
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
          <div className="input-box2">
            <input
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
          <div className="input-box3">
            <input
              type="password"
              placeholder="New password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>
        <button type="submit">Reset password</button>
      </form>
    </div>
  );
};

export default ResetPassword;