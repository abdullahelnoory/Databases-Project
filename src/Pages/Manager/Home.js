import Navbar from './Components/navbar.js';
export default function manager() {
    const savedData = localStorage.getItem('userssn');
    return (
        <div>
            <header>
                <Navbar />
            </header>
            <h1 className="Mname" style={{ margin: '15px' }}>
                Hello User {savedData}
            </h1>
        </div>
    );
}