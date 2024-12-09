import ANav from './Components/navbar';

export default function Adminhome() {
    const userssn = sessionStorage.getItem('ssn');


    return (
        <div>
            <ANav />
            <h1 id="admin-greeting" className="Mname" style={{ margin: '15px' }}>
                Hello User {userssn}
            </h1>
        </div>
    );
}