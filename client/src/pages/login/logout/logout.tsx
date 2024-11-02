import { useState } from 'react';
import Toolbar from '../../../components/toolbar/toolbar';
import WeatherBar from '../../../components/weatherBar/weatherBar';

const Logout = () => {
    const [responseMessage, setResponseMessage] = useState('');

    const handleLogout = () => {
        {
            const token = localStorage.getItem('token');
            if (token) {
                localStorage.removeItem('token');
                setResponseMessage("Logout successful. Hope to see you soon!");
                setTimeout(() => {
                    window.location.href = '/home';
                }, 800);
            }
            else {
                setResponseMessage("You have to login first!");
            }
        }
    };


    return (
        <>
            <WeatherBar/>
            <Toolbar />
            <h1>See You Later, Alligator!</h1>
            <div className="logout">
                <button onClick={handleLogout}>Logout</button>
                {responseMessage && <p>{responseMessage}</p>}
            </div>
        </>
    );
};

export default Logout;

