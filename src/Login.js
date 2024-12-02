<<<<<<< Updated upstream
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
=======
import React, { useState, useEffect } from 'react';
>>>>>>> Stashed changes

export default function Login() {
  const [forminput, setforminput] = useState({
    email: "",
    password: ""
  })
  const history = useHistory();

<<<<<<< Updated upstream
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
=======
export default function Login()
{const [forminput , setforminput] = useState({email:"",
    password:"",})
const [usertype,setusertype]=useState({type:"",  ssn: "",
  ssn: "",
  email: "",
  fname: "",
  mname: "",
  lname: "",
  password:""

})
    const sendData = async () => {
        
      
        try {
          const response = await fetch('http://localhost:6969/accounts/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(forminput),
          });
      
          const result = await response.json();
          console.log('Response from server:', result);
        } catch (error) {
          console.error('Error sending data:', error);
        }

        if(result.type=="Admin")
          
      };


      /*useEffect(() => {
        fetch('http://localhost:6969/accounts/login')
          .then((response) => response.json())
          .then((data) => setusertype(data.data))
          .catch((error) => console.error('Error fetching data:', error));
      }, []);
      */



      
    return(
        <div className='Login'>
<form className="Login_box">
   
    <div className="input-container">
    <label > Username</label>
    <input value={forminput.email} type="text" onChange={(event) =>{
      
       setforminput({...forminput,email:event.target.value})
       }
    }>
    </input>
    </div>
    <div className="input-container">
    <label>Password</label>
    <input value={forminput.password} type="password" onChange={(event) =>{
      
      setforminput({...forminput,password:event.target.value})
>>>>>>> Stashed changes
      }

<<<<<<< Updated upstream
      console.log('Response from server:', result);
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };
=======
<button onClick={sendData}  className="button">
Login
    </button>
    <a  className=" alink" href="/Signup"> 
        Sign up
    </a>
>>>>>>> Stashed changes


  return (
    <div className='Login'>
      <form className="Login_box">

        <div className="input-container">
          <label > Username</label>
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

        <button onClick={sendData} className="button">
          Login
        </button>
        <a className=" alink" href="/Signup">
          Sign up
        </a>

      </form>
    </div>

  );
}
