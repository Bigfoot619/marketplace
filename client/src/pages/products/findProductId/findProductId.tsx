import { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import Toolbar from '../../../components/toolbar/toolbar';
import UpdateProductLink from '../../../components/links/productLinks/updateProductLink';
import WeatherBar from '../../../components/weatherBar/weatherBar';
import './findProductId.css';

type TitleValue = {
    title: string;
}

const FindProductId = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<TitleValue>();
    const [responseMessage, setResponseMessage] = useState('');

    const onSubmit = async (data: TitleValue) => {
        const token = localStorage.getItem('token');
        if (!token) {
            setResponseMessage("You have to login first");
            return;
        }
        try {
            const response = await axios.get(`http://localhost:9000/api/product/id/${data.title}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            setResponseMessage("Your product id: " + response.data);
        } catch (err) {
            setResponseMessage("This product is not exist. Try again!");
        }
    };

    return (
        <>
            <WeatherBar/>
            <Toolbar />
            <UpdateProductLink/>
            <h1>Need Product ID?</h1>
            <div className="findProductId-container">
                <form id="EmailForm" onSubmit={handleSubmit(onSubmit)}>
                    <p>Enter Product Title</p>
                    <input {...register('title', { required: true })} type="text" placeholder='Enter product title'/>
                    {errors.title && <span>This field is required</span>}
                    <p>
                        <button type="submit">Find ID</button>
                    </p>
                </form>
                {responseMessage && <p>{responseMessage}</p>}
            </div>
        </>
    );
};

export default FindProductId;
