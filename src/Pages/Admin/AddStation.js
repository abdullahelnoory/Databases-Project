import {useState} from 'react';
import NavA from './AdminNav'
export default function AddTrip()
{

    const [forminput , setforminput] = useState({station_name:"",
       statoin_id:"", station_street:"",station_zip:"",station_governorate:""})
    
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
        <NavA/>
        </header>
        <h2 className="site_Title">Add Station</h2>   
        <div className='Addtrip'>
   
<form className='Addtrip_box'>

<div className="input-container">
    <label >Station Name </label>
    <input value={forminput.StationName} type="text" onChange={(event) =>{
      
       setforminput({...forminput,StationName:event.target.value})
    }
    }>
    </input>
    </div>
    <div className="input-container">
    <label>Id</label>
    <input value={forminput.Id } type="text" onChange={(event) =>{
      
      setforminput({...forminput,Id :event.target.value})
    }
   }></input>

<label>Zip</label>
    <input value={forminput.Zip} type="text" onChange={(event) =>{
      
      setforminput({...forminput,Zip:event.target.value})
    }
   }></input>

<label>Governorate</label>
    <input value={forminput.Governorate} type="text" onChange={(event) =>{
      
      setforminput({...forminput,Governorate:event.target.value})
    }
   }></input>
   </div>
<button className='button' onClick={sendData}>Submit</button>

</form>
</div>
</div>
    );
}

