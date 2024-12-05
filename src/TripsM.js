import Grid from './TripsGrid'
import Nav1 from './nav.js';
export default function TripsM() {
    const savedData = localStorage.getItem('forminput');
    console.log(savedData);
    return (
        <div>
            <header>
                <Nav1 />
            </header>
            <h1 style={{ margin: "1%" }}>Trips</h1>
            <Grid></Grid>

        </div>

    );
}