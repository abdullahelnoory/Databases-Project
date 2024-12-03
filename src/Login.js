import { useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function Login() {
  const [forminput, setforminput] = useState({
    email: "",
    password: ""
  })
  const history = useHistory();

  const sendData = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:6969/accounts/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(forminput),
      });

      const result = await response.json();
      console.log(result.type);

      if (result.type === "Admin") {
        history.push('/A');
      } else if (result.type === "Manager") {
        history.push('/M');
      } else if (result.type === "Driver") {
        history.push('/D');
      } else if (result.type === "Passenger") {
        history.push('/P');
      }

      console.log('Response from server:', result);
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };


  return (
    <div className='Login'>
      <form className="Login_box">

        <div className="input-container">
          <label > Email</label>
          <input value={forminput.email} type="text" onChange={(event) => {

            setforminput({ ...forminput, email: event.target.value })
          }
          }>
          </input>
        </div>
        <div className="input-container">
          <label>Password</label>
          <input value={forminput.password} type="password" onChange={(event) => {

            setforminput({ ...forminput, password: event.target.value })
          }
          }></input>
        </div>

        <div class="button-container">
          <button onClick={sendData} className="button login">
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
