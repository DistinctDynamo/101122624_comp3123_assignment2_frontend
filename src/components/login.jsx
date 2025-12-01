import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router";
import {Button,Input,Stack,Container, CssBaseline} from '@mui/material';

export default function Login(){
    const navigate = useNavigate();

    const loggedInStatus=()=>{
        let check = localStorage.getItem('LoggedIn')
        if(check === "True"){
            return true
        } else{
            return false
        }
    }

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
        axios.post('http://localhost:8082/api/v1/user/login',userData)
        .then((response)=>{
            console.log(response.status, response.data.token);
        }).then(
           localStorage.setItem('LoggedIn','True')
        ).then(
            navigate('/employees')
        ).catch(error=>{
            alert(error)
        })
    };
    
    return(
        <Container maxWidth='md'>
            <Stack gap={2}>
                <CssBaseline/>
                    <form onSubmit={handleSubmit}>
                    <header>
                        <h1>Login</h1>
                    </header>

                    <label htmlFor='username'>Username:</label>
                    <Input
                    id="username"
                    name='username'
                    type='text'
                    value={formData.username}
                    onChange={handleChange}
                    placeholder='Jane Doe'
                    required
                    />

                    <label htmlFor='email'>Email:</label>
                    <Input
                    id="email"
                    name='email'
                    type='text'
                    value={formData.email}
                    onChange={handleChange}
                    placeholder='JaneDoe@123.gmail.com'
                    required
                    />

                    <label htmlFor='password'>Password:</label>
                    <Input
                    id="password"
                    name='password'
                    type='text'
                    value={formData.password}
                    onChange={handleChange}
                    placeholder='*********'
                    required
                    />

                    {
                        loggedInStatus() ? <p>You are already logged in</p>
                        :<Button variant="contained" type='submit' className='login button'>
                        Login
                        </Button>
                    }
                    
                    </form>
            </Stack>
        </Container>
    )
}