import { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import Toolbar from '../../components/toolbar/toolbar';
import WeatherBar from '../../components/weatherBar/weatherBar';
import Google from './google/google';

type LoginValues = {
    email: string;
    password: string;
}

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginValues>();
    const [responseMessage, setResponseMessage] = useState('');

    const onSubmit = async (data: LoginValues) => {
        try {
            const response = await axios.post('http://localhost:9000/api/auth/login', data);
            const token = response.data.token;
            localStorage.setItem('token', token);
            setResponseMessage("Login successful. Welcome back!");
            setTimeout(() => {
                window.location.href = '/home';
            }, 800);
        } catch (err) {
            setResponseMessage("Invalid credentials. Try again!");
        }
    };
    

    return (
        <>  
            <WeatherBar/>
            <Toolbar />
            <h1>Join Gilad's Club!</h1>
            <Google/>
            {/* <Facebook/> */}
            <div className="login">
                <form id="loginForm" onSubmit={handleSubmit(onSubmit)}>
                    <p>Email</p>
                    <input {...register('email', { required: true })} type="email" placeholder='Enter email'/>
                    {errors.email && <span>This field is required</span>}

                    <p>Password</p>
                    <input {...register('password', { required: true })} type="password" placeholder='Enter password'/>
                    {errors.password && <span>This field is required</span>}

                    <p>
                        <button type="submit">Sign in!</button>
                    </p>
                </form>
                {responseMessage && <p>{responseMessage}</p>}
            </div>
        </>
    );
};

export default Register;
