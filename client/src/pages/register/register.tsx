import { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import Toolbar from '../../components/toolbar/toolbar';
import WeatherBar from '../../components/weatherBar/weatherBar';
import './register.css';

type RegisterValues = {
    name: string;
    email: string;
    password: string;
    bank: number;
}

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<RegisterValues>();
    const [responseMessage, setResponseMessage] = useState('');

    const onSubmit = async (data: RegisterValues) => {
        const parsedData = {
            ...data,
            bank: Number(data.bank)
        };
        try {
            const response = await axios.post('http://localhost:9000/api/auth/register', parsedData);
            setResponseMessage("Registration successful! Welcome, " + response.data.name);
            setTimeout(() => {
                window.location.href = '/login';
            }, 1000);
        } catch (err) {
            setResponseMessage("This email is already exist. Try again!");
        }
    };

    return (
        <>
            <WeatherBar/>
            <Toolbar/>
            <h1>Join Gilad's Club!</h1>
            <div className="register">
                <form id="registerForm" onSubmit={handleSubmit(onSubmit)}>
                    <p>Name</p>
                    <input {...register('name', { required: true })} type="text" placeholder='Enter name' />
                    {errors.name && <span>This field is required</span>}

                    <p>Email</p>
                    <input {...register('email', { required: true })} type="email" placeholder='Enter email'/>
                    {errors.email && <span>This field is required</span>}

                    <p>Password</p>
                    <input {...register('password', { required: true })} type="password" placeholder='Enter password'/>
                    {errors.password && <span>This field is required</span>}

                    <p>Bank</p>
                    <input {...register('bank', { required: true })} type="number" placeholder='Enter bank amount'/>
                    {errors.bank && <span>This field is required</span>}
                    <p>
                        <button type="submit">Register!</button>
                    </p>
                </form>
                {responseMessage && <p>{responseMessage}</p>}
            </div>
        </>
    );
};

export default Register;
