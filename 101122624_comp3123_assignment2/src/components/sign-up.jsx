import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router";

export default function Signup(){
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username:'',
        email:'',
        password:'',
    });

    const handleChange = (event)=>{
        event.preventDefault();
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
        axios.post('http://localhost:8081/api/v1/user/signup',userData
        ).then(
            navigate('/login')
        )
        .catch(error=>{
            alert(error)
        })
    };
    
    return(
        <main>
            <section>
                <form onSubmit={handleSubmit}>
                    <header>
                        <h1>Sign Up</h1>
                    </header>

                <label htmlFor='username'>Username:</label>
                <input
                id="username"
                name='username'
                type='text'
                value={formData.username}
                onChange={handleChange}
                placeholder='Jane Doe'
                required
                />

                <label htmlFor='email'>Email:</label>
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

                <button type='submit' className='sign up button'>
                    Sign-Up
                </button>
                </form>
            </section>
        </main>
    )
}

