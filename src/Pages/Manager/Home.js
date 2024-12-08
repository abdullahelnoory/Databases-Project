import Navbar from './Components/navbar.js';
export default function manager() {
    const userssn = sessionStorage.getItem('ssn');
    return (
        <div>
            <header>
                <Navbar />
            </header>
            <h1 className="Mname" style={{ margin: '15px' }}>
                Hello User {userssn}
            </h1>
        </div>
    );
}