import { useState } from 'react';
import axios from 'axios';

const CreatePDF = () => {
    const [responseMessage, setResponseMessage] = useState('');

    const createPDF = async () => {
        try {
            await axios.post('http://localhost:9000/api/logs/pdf/');
        } catch (error) {
            setResponseMessage('Could not create PDF!');
        }
    };
    return (
        <>
            <div className="createPDF">
                <form id="pdfForm">
                    <button onClick={createPDF}>Create PDF</button>
                </form>
                {responseMessage && <p>{responseMessage}</p>}
            </div>
        </>
    );
};


export default CreatePDF;

