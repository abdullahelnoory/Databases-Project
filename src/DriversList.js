import DGrid from './griddriv.js'

export default function driversList()
{

    return(
    <div className="DriversList">
     <DGrid/>
     <button>Add Driver</button>
     <button>
        update Salary
     </button>
     <button>
        Remove Driver
     </button>
    </div>

    );
}