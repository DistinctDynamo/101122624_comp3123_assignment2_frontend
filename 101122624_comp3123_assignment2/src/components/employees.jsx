import React, {useState,useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from "react-router";
import ViewEmployee from './viewEmployee';

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
        <div>
            <h3>Employee List</h3>
            <button onClick={navigateToAdd}>Add Employee</button>
            <table border="1" cellPadding="5">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Position</th>
                        <th>Department</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map(employee => (
                        <tr key={employee._id}>
                            <td>{employee.first_name}</td>
                            <td>{employee.last_name}</td>
                            <td>{employee.position}</td>
                            <td>{employee.department}</td>
                            <td>    
                            <button onClick={() => {
                                setOpenModal({state:true,
                                             id:employee._id});
                            }}>
                            View
                            </button>
                            <button onClick={e=>navigateToUpdate(employee._id)}>Edit</button>
                            <button onClick={e=>deleteEmployee(employee._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {openModal.state && <ViewEmployee employeeId={openModal.id} setModalOpen={setOpenModal} />}
            <button onClick={logOut}>LogOut</button>
        </div>
    )
    }else{
        navigate("/login")
        localStorage.setItem('LoggedIn','False')
    }
    
}