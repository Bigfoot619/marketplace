import Toolbar from "../../components/toolbar/toolbar";
import WeatherBar from "../../components/weatherBar/weatherBar";

const ContactPage = () => {
    const handleReportClick = () => {
        const email = 'mailto:giladtwili@hotmail.com';
        window.location.href = email;
    };

    return (
        <>
        <WeatherBar/>
        <Toolbar/>
        <div className="contact-page">
            <h1>Contact Us</h1>
            <button className='contact-button' onClick={handleReportClick}>Report</button>
        </div>
        </>
    );
};

export default ContactPage;
