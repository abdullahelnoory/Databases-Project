import React, { useState, useEffect } from 'react';
import Nav2 from './nav';
import axios from"axios"


export default function Adddriver()
{

    
    const [forminput , setforminput] = useState({is_private:"",
        ssn:"", driver_fname:"",driver_mname:"",driver_lname:"",governorate:""})
     
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

    return (
        <div>
        <header>
 <Nav2/>
 </header>
 <h2 className="site_Title">Add Driver</h2>   
 <div className='Addtrip'>

<form className='Addtrip_box'>

<div className="input-container">
<label >  First Name </label>
<input value={forminput.driver_fname} type="text" onChange={(event) =>{

setforminput({...forminput,driver_fname:event.target.value})
}
}>
</input>
</div>

<div className="input-container">
<label >  Middle Name </label>
<input value={forminput.driver_mname} type="text" onChange={(event) =>{

setforminput({...forminput,driver_mname:event.target.value})
}
}>
</input>
</div>


<div className="input-container">
<label >  Last Name </label>
<input value={forminput.driver_lname} type="text" onChange={(event) =>{

setforminput({...forminput,driver_lname:event.target.value})
}
}>
</input>
</div>
<div className="input-container">
<label>SSN</label>
<input value={forminput.Id } type="text" onChange={(event) =>{

setforminput({...forminput,Id :event.target.value})
}
}></input>

</div>
<button className='button' onClick={sendData}>Submit</button>

</form>
</div>
</div>


    );
}