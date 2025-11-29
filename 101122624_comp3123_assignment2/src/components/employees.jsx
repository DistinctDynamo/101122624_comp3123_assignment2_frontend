import React, {useState,useEffect} from 'react';
import axios from 'axios';

export default function EmployeeList(){
    const [employees, SetEmployees] = useState([]);

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

    useEffect(fetchEmployees,[]);

    return (
        <div>
            <h3>Employee List</h3>
            <button >Add Employee</button>
            <table border="1" cellPadding="5">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Position</th>
                        <th>Department</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map(employee => (
                        <tr key={employee.id}>
                            <td>{employee.first_name}</td>
                            <td>{employee.last_name}</td>
                            <td>{employee.position}</td>
                            <td>{employee.department}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}