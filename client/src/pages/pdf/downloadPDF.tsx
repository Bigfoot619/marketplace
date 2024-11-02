import { useState } from 'react';
import axios from 'axios';
import Toolbar from '../../components/toolbar/toolbar';
import CreatePDF from './createPDF';
import WeatherBar from '../../components/weatherBar/weatherBar';
import './downloadPDF.css';

const DownloadPDF = () => {
    const [loader, setLoader] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');

    const downloadPDF = async () => {
        setLoader(true);
        try {
            const response = await axios.get('http://localhost:9000/api/logs/downloadPDF/', {
                responseType: 'arraybuffer', 
            });
            
            setLoader(false);
            const blob = new Blob([response.data], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'users_activity_report.pdf');
            document.body.appendChild(link);
            link.click();

            document.body.removeChild(link);
        } catch (error) {
            setLoader(false);
            setResponseMessage('Could not generate PDF!');
        }
    };

    return (
        <>
            <WeatherBar/>
            <Toolbar />
            <h1>Check Our Database Activities!</h1>
            <div className="showPDF">
                <form id="pdfForm">
                    <CreatePDF/>
                    <button onClick={downloadPDF}>
                        {loader ? <>Downloading</> : <>Download</>}
                    </button>
                </form>
                {responseMessage && <p>{responseMessage}</p>}
            </div>
        </>
    );
};

export default DownloadPDF;
