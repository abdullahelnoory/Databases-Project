import NavA from './Components/navbar';
import SGrid from './Components/StationsGrid';

export default function StationsA() {
    return (
        <div>
            <header>
                <NavA />
            </header>
            <h1 id="site_Title">Stations</h1>
            <SGrid />
        </div>
    );
}