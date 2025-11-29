import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router";

export default function Login(){
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username:'',
        email:'',
        password:'',
    });

    const handleChange = (event)=>{
        const{name, value}=event.target;
        setFormData((previous)=>({
            ...previous,
            [name]:value,
        }));
    };

    const handleSubmit = (event)=>{
        event.preventDefault();
        const userData={
            username: formData.username,
            email: formData.email,
            password: formData.password
        }
        axios.post('http://localhost:8081/api/v1/user/login',userData)
        .then((response)=>{
            console.log(response.status, response.data.token);
        }).then(
            navigate('/employees')
        ).catch(error=>{
            alert(error)
        })
    };
    
    return(
        <main>
            <section>
                <form onSubmit={handleSubmit}>
                    <header>
                        <h1>Login</h1>
                    </header>

                <label htmlFor='username'>Username</label>
                <input
                id="username"
                name='username'
                type='text'
                value={formData.username}
                onChange={handleChange}
                placeholder='Jane Doe'
                required
                />

                <label htmlFor='email'>Email</label>
                <input
                id="email"
                name='email'
                type='text'
                value={formData.email}
                onChange={handleChange}
                placeholder='JaneDoe@123.gmail.com'
                required
                />

                <label htmlFor='password'>Password:</label>
                <input
                id="password"
                name='password'
                type='text'
                value={formData.password}
                onChange={handleChange}
                placeholder='*********'
                required
                />

                <button type='submit' className='login button'>
                    Login
                </button>
                
                </form>
            </section>
        </main>
    )
}