import { useState,useEffect } from 'react';
import axios from 'axios';

export default function ViewEmployee({employeeId,setModalOpen}){

    const [ employee, setEmployee ] = useState({});

    const getEmployee = (Id) => {
        try {
        axios.get(`http://localhost:8081/api/v1/emp/employees/${Id}`)
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
            <div>
                <table border="1" cellPadding="5">
                            <tr>{employee.first_name}</tr>
                            <tr>{employee.last_name}</tr>
                            <tr>{employee.email}</tr>
                            <tr>{employee.position}</tr>
                            <tr>{employee.salary}</tr>
                            <tr>{employee.department}</tr>
                    </table>
                <button
                    onClick={() => {
                    setModalOpen({ state: false, id: "" });
                    }}>
                Cancel
                </button>
            </div>
  );
}