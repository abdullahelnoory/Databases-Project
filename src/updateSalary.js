
import { useState, useEffect } from 'react';
export default function Adddriver() {
  const [forminput, setforminput] = useState({ salary: "", d_ssn: "" })


  const [userssn, setuserssn] = useState(() => {
    const storedSSN = localStorage.getItem('userssn');
    return storedSSN ? JSON.parse(storedSSN).ssn : '';
  });


  useEffect(() => {


    fetch('http://localhost:6969/manager/drivers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        m_ssn: userssn,// Manager ssn here
        salary: forminput.salary,
        d_ssn: forminput.ssn,

      }),
    })
  }, []);




  return (
    <div className="Addtrip">
      <form>
        <label>
          Updated Salary
        </label>
        <input onChange={(event) => {

          setforminput({ ...forminput, Id: event.target.value })
        }} >
        </input>
      </form>



    </div>

  );

}