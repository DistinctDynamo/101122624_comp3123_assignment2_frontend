import React, {useState,useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from "react-router";
import ViewEmployee from './viewEmployee';
import {Button,Container, CssBaseline} from '@mui/material';
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

export default function EmployeeList(){
    const navigate = useNavigate();

    const loggedIn = localStorage.getItem('LoggedIn')
    
    const [employees, SetEmployees] = useState([]);
    const [openModal, setOpenModal] = useState(
        {
            state:false,
            id:""
        });

    const fetchEmployees = () =>{
        axios.get('http://localhost:8081/api/v1/emp/employees')
        .then(response=>{
            console.log(response);
            SetEmployees(response.data);
        })
        .catch(error => {
            console.error("There was an error fetching the employees!", error);
        });
    }

    const deleteEmployee = (id)=>{
        axios.delete(`http://localhost:8081/api/v1/emp/employees/${id}`)
        .catch(error=>{
            alert(error)
        })
    };
    
    useEffect(fetchEmployees,[]);

    const navigateToUpdate = (employee_id)=>{
        let parameter = employee_id
        navigate(`/update/${parameter}`);
    }

    const logOut=()=>{
        navigate("/login")
        localStorage.setItem('LoggedIn',"False")
    };

    const navigateToAdd=()=>{
        navigate("/add")
    }
    
    if(loggedIn==="True"){
        return ( 
        <Container maxWidth='md'>
            <CssBaseline/>
            <h2>Employee List</h2>
            <Button variant='contained' onClick={navigateToAdd}>Add Employee</Button>
            <TableContainer>
            <Table border="1" cellPadding="5">
                <TableHead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Position</th>
                        <th>Department</th>
                        <th>Options</th>
                    </tr>
                </TableHead>
                <TableBody>
                    {employees.map(employee => (
                        <TableRow key={employee._id}>
                            <td>{employee.first_name}</td>
                            <td>{employee.last_name}</td>
                            <td>{employee.position}</td>
                            <td>{employee.department}</td>
                            <td>    
                            <Button variant='contained' onClick={() => {
                                setOpenModal({state:true,
                                             id:employee._id});
                            }}>
                            View
                            </Button>
                            <Button variant='contained' onClick={e=>navigateToUpdate(employee._id)}>Edit</Button>
                            <Button variant='contained' onClick={e=>deleteEmployee(employee._id)}>Delete</Button>
                            </td>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            </TableContainer>
            {openModal.state && <ViewEmployee employeeId={openModal.id} setModalOpen={setOpenModal} />}
            <Button variant='contained' onClick={logOut}>LogOut</Button>
        </Container>
    )
    }else{
        navigate("/login")
        localStorage.setItem('LoggedIn','False')
    }
    
}