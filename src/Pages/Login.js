import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import '../Styles/Login.css';
import logo from '../images/SwiftRoute.png';

export default function Login() {
  const [formInput, setFormInput] = useState({
    email: '',
    password: '',
  });

  const [userSSN, setUserSSN] = useState({
    ssn: '',
  });

  const [error, setError] = useState('');
  const history = useHistory();

  useEffect(() => {
    const savedData = localStorage.getItem('userssn');
    if (savedData) {
      console.log(savedData);
      setUserSSN(JSON.parse(savedData));
    }
  }, []);

  const sendData = async (event) => {
    event.preventDefault();
    setError('');
    localStorage.clear();

    try {
      const response = await fetch('http://localhost:6969/accounts/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formInput),
      });

      const result = await response.json();

      if (response.ok) {
        setUserSSN({ ...userSSN, ssn: result.ssn });
        localStorage.setItem('userssn', JSON.stringify({ ...userSSN, ssn: result.ssn }));

        if (result.type === 'Admin') {
          history.push('/A');
        } else if (result.type === 'Manager') {
          history.push('/M');
        } else if (result.type === 'Driver') {
          history.push('/D');
        } else if (result.type === 'Passenger') {
          history.push('/P');
        } else {
          setError(result.message || 'Login failed. Please check your email and password.');
        }
      }
    } catch (error) {
      console.error('Error sending data:', error);
      setError('An unexpected error occurred. Please try again later.');
    }
  };


  return (
    <div id="Login">
      <form id="Login_box">
        <img src={logo} alt="Swift Route Logo" className="logo" />

        <div id="input-container">
          <label>Email</label>
          <input
            value={formInput.email}
            type="text"
            onChange={(event) => {
              setFormInput({ ...formInput, email: event.target.value });
            }}
          />
        </div>
        <div id="input-container">
          <label>Password</label>
          <input
            value={formInput.password}
            type="password"
            onChange={(event) => {
              setFormInput({ ...formInput, password: event.target.value });
            }}
          />
        </div>

        {error && <div style={{ color: 'red', marginBottom: '15px' }}>{error}</div>}

        <div id="button-container">
          <button onClick={sendData} className="button">
            Login
          </button>
          <a href="/Signup" className="button signup" style={{ textDecoration: 'none' }}>
            Sign Up
          </a>
        </div>
      </form>
    </div>
  );
}
