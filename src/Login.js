import {useState} from 'react';


export default function Login()
{const [forminput , setforminput] = useState({email:"",
    password:""})

    const sendData = async () => {
        
      
        try {
          const response = await fetch('http://localhost:6969/endpoint', {
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
      };


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
      }
   }></input>
   </div>

<button onClick={sendData} className="button">
Login
    </button>

    </form>
    </div>

    );
}
