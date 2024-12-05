import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import DriversList from './DriversList.js'

import TripsM from './TripsM.js'
import Mreq from './Mreq.js';
import Nav1 from './nav.js';
export default function manager() {
    const savedData = localStorage.getItem('userssn');
    console.log(savedData);

    return (

        <div>


            <header>
                <Nav1 />
            </header>
            <h1 className="Mname" style={{ margin: '15px' }}>
                Mname
            </h1>

        </div>


    );

}