import { useState } from 'react';
import '/src/styles/LoginForm.css';
import { useNavigate } from 'react-router-dom';
import logo from '/src/assets/kaewja-logo.jpg';
import { Link } from 'react-router-dom';


const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    if (username === 'ajarnnok' && password === 'errortagger') {
      setIsLoggedIn(true);
    } 
    else if (username !== 'ajarnnok') {
      alert('Username is incorrect!');
    }
    else if (password !== 'errortagger') {
      alert('Password is incorrect')
    }
  };

  if (isLoggedIn) {
    console.log("Login successfully!!!");
    navigate('/dashboard');
  }

  return (
    <>
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
                {/* <AiOutlineUser className='icon'/> */}
            </div>
            <div className="input-box2">
                <input
                  type="password"
                  placeholder='Password'
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {/* <MdLockOpen className='icon'/> */}

            </div>

            <div className="forgot">
              <p>Forgot your password? <Link className='forgot-link' to="reset-password">Click Here</Link> </p>
            </div>

            <button type='submit' onClick={handleLogin}>Login</button>
        </form>
    </div>
    </>

  );
}

export default LoginForm;