
import {useState} from 'react';
import Nav1 from './nav.js';
export default function AddTrip(          )
{

    const [forminput , setforminput] = useState({Source:"",
        Destination:"", Price:"" ,user:"Manager", email:""})
    
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
          };

    return(
        <div>
               <header>
        <Nav1/>
        </header>
        <h2 className="site_Title">Add Trip</h2>   
        <div className='Addtrip'>
   
<form className='Addtrip_box'>

<div className="input-container">
    <label >Source </label>
    <input value={forminput.Source} type="text" onChange={(event) =>{
      
       setforminput({...forminput,Source:event.target.value})
    }
    }>
    </input>
    </div>
    <div className="input-container">
    <label>Destination</label>
    <input value={forminput.Destination} type="text" onChange={(event) =>{
      
      setforminput({...forminput,Destination:event.target.value})
    }
   }></input>

<label>Price</label>
    <input value={forminput.Price} type="text" onChange={(event) =>{
      
      setforminput({...forminput,Price:event.target.value})
    }
   }></input>
   </div>
<button className='button' onClick={sendData}>Submit</button>

</form>
</div>
</div>
    );
}