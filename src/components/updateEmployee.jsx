import { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router";
import { useParams } from 'react-router';
import {Button,Input,Stack,Container, CssBaseline} from '@mui/material';

export default function UpdateEmployees({props}){
    const navigate = useNavigate();
    const  {employeeid}  = useParams();

    const [ employee, setEmployee ] = useState({});

    const getEmployee = (employeeId) => {
        try {
        axios.get(`http://localhost:8082/api/v1/emp/employees/${employeeId}`)
            .then(response=>{
                setEmployee(response.data);
            })
        } catch (error) {
        console.error('Failed to fetch employee');
        }
    }

    useEffect(() => {
    getEmployee(employeeid);
  }, [employeeid]);

  const handleChange = (event)=>{
        event.preventDefault();
        const{name, value}=event.target;
        setEmployee((previous)=>({
           ...previous,
            [name]:value,
        }));
    };

    const handleSubmit = (event)=>{
        event.preventDefault();
        axios.put(`http://localhost:8082/api/v1/emp/employees/${employeeid}`,employee
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
                value={employee.first_name}
                onChange={handleChange}
                placeholder='Jane'
                />

                <label htmlFor='last_name'>Last Name:</label>
                <Input
                id="last_name"
                name='last_name'
                type='text'
                value={employee.last_name}
                onChange={handleChange}
                placeholder='Doe'
                />

                <label htmlFor='email'>Email:</label>
                <Input
                id="email"
                name='email'
                type='text'
                value={employee.email}
                onChange={handleChange}
                placeholder='JaneDoe@123.gmail.com'
                />

                <label htmlFor='position'>Position:</label>
                <Input
                id="position"
                name='position'
                type='text'
                value={employee.position}
                onChange={handleChange}
                />

                <label htmlFor='salary'>Salary:</label>
                <Input
                id="salary"
                name='salary'
                type='number'
                value={employee.salary}
                onChange={handleChange}
                />

                <label htmlFor='department'>Department:</label>
                <Input
                id="department"
                name='department'
                type='text'
                value={employee.department}
                onChange={handleChange}
                />

                <Button variant='contained' type='submit' className='update button'>
                    Update
                </Button >
                </form>
            </Stack>
            <Button variant='contained' onClick={logOut}>LogOut</Button>
            <Button variant='contained' onClick={Backout}>Cancel</Button >
        </Container>
    )
}

