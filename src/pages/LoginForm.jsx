import { useState } from 'react';
import '/src/styles/LoginForm.css';
import { AiOutlineUser } from "react-icons/ai";
import { MdLockOpen } from "react-icons/md";
// import EmptyPage from '../../EmptyPage';
import logo from '/src/assets/kaewja-logo.jpg';
import { Link } from 'react-router-dom';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (event) => {
    event.preventDefault();
    if (username === 'abc' && password === 'def') {
      setIsLoggedIn(true);
    } 
    else if (username !== 'abc') {
      alert('Username is incorrect!');
    }
    else if (password !== 'def') {
      alert('Password is incorrect')
    }
  };

  if (isLoggedIn) {
    console.log("Login successfully!!!");
  }

  return (
    <div className='wrapper'>
        <form onSubmit={handleLogin}>
            <div className="logo-container">
                <img src={logo} alt="Logo" className="logo"/>
            </div>
            <h1>KAEWJA</h1>
            <div className="input-box1">
                <input
                  type="text"
                  placeholder='Username'
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <AiOutlineUser className='icon'/>
            </div>
            <div className="input-box2">
                <input
                  type="password"
                  placeholder='Password'
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <MdLockOpen className='icon'/>

            </div>

            <div className="forgot">
              {/* <p>Forgot your password? <Link to="/reset_password">Click Here</Link> </p> */}
              <p>Forgot your password? <Link to="reset-password">Click Here</Link> </p>
            </div>

            <button type='submit'>Login</button>
        </form>
    </div>
  );
}

export default LoginForm;