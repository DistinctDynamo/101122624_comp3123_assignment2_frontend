import { useState,useEffect } from 'react';
import axios from 'axios';
import {Button,Container, CssBaseline, TableCell} from '@mui/material';
import Table from '@mui/material/Table'
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';

export default function ViewEmployee({employeeId,setModalOpen}){

    const [ employee, setEmployee ] = useState({});

    const getEmployee = (Id) => {
        try {
        axios.get(`http://localhost:8082/api/v1/emp/employees/${Id}`)
            .then(response=>{
                setEmployee(response.data);
            })
        } catch (error) {
        console.error('Failed to fetch employee');
        }
    }

    useEffect(() => {
    getEmployee(employeeId);
    }, [employeeId]);

    return (
            <Container>
                <CssBaseline/>
                <TableContainer>
                <Table border="1" cellPadding="5">
                            <TableRow>First Name: {employee.first_name}</TableRow>
                            <TableRow>Last Name: {employee.last_name}</TableRow>
                            <TableRow>Email: {employee.email}</TableRow>
                            <TableRow>Position: {employee.position}</TableRow>
                            <TableRow>Salary: {employee.salary}</TableRow>
                            <TableRow>Department: {employee.department}</TableRow>
                            <TableRow>Date of Joining: {employee.date_of_joining}</TableRow>
                    </Table>
                    </TableContainer>
                <Button variant='contained'
                    onClick={() => {
                    setModalOpen({ state: false, id: "" });
                    }}>
                Cancel
                </Button>
                
            </Container>
  );
}