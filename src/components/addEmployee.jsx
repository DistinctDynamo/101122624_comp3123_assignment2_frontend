import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router";
import {Button,Input,Stack,Container, CssBaseline} from '@mui/material';

export default function AddEmployee(){
  const navigate = useNavigate();

  const [ formData, setFormData ] = useState({
    first_name:'',
    last_name:'',
    email:'',
    position:'',
    salary:0,
    department:''
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
            first_name:formData.first_name,
            last_name:formData.last_name,
            email:formData.email,
            position:formData.position,
            salary:formData.salary,
            department:formData.department
        }
        axios.post('http://localhost:8082/api/v1/emp/employees',userData
        ).then(
            navigate('/employees')
        )
        .catch(error=>{
            alert(error)
        })
    };
    
    const logOut=()=>{
        navigate("/login")
        localStorage.setItem('LoggedIn','False')
    };

    const Backout=()=>{
        navigate("/employees")
    };

return(
        <Container maxWidth='md'>
            <Stack gap={2}>
                <CssBaseline/>
                <form onSubmit={handleSubmit}>
                <header>
                    <h1>Update Employee</h1>
                </header>

                <label htmlFor='first_name'>First Name:</label>
                <Input
                id="first_name"
                name='first_name'
                type='text'
                value={formData.first_name}
                onChange={handleChange}
                placeholder='Jane'
                required
                />

                <label htmlFor='last_name'>Last Name:</label>
                <Input
                id="last_name"
                name='last_name'
                type='text'
                value={formData.last_name}
                onChange={handleChange}
                placeholder='Doe'
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

                <label htmlFor='position'>Position:</label>
                <Input
                id="position"
                name='position'
                type='text'
                value={formData.position}
                onChange={handleChange}
                required
                />

                <label htmlFor='salary'>Salary:</label>
                <Input
                id="salary"
                name='salary'
                type='number'
                value={formData.salary}
                onChange={handleChange}
                required
                />

                <label htmlFor='department'>Department:</label>
                <Input
                id="department"
                name='department'
                type='text'
                value={formData.department}
                onChange={handleChange}
                required
                />

                <Button variant='contained' type='submit' className='add button'>
                    Add
                </Button>
                </form>
            </Stack>
            <Button variant='contained' onClick={logOut}>LogOut</Button>
            <Button variant='contained' onClick={Backout}>Cancel</Button>
        </Container>
    )
}