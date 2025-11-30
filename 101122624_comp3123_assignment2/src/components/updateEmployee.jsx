import { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router";
import { useParams } from 'react-router';

export default function UpdateEmployees({props}){
    const navigate = useNavigate();
    const  {employeeid}  = useParams();

    const [ employee, setEmployee ] = useState({});

    const getEmployee = (employeeId) => {
        try {
        axios.get(`http://localhost:8081/api/v1/emp/employees/${employeeId}`)
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
        axios.put(`http://localhost:8081/api/v1/emp/employees/${employeeid}`,employee
        ).then(
            navigate('/employees')
        )
        .catch(error=>{
            alert(error)
        })
    };
    
    const logOut=(event)=>{
        navigate("/login")
    };

    const Backout=(event)=>{
        navigate("/employees")
    };

return(
        <main>
            <section>
                <form onSubmit={handleSubmit}>
                <header>
                    <h1>Update Employee</h1>
                </header>

                <label htmlFor='first_name'>First Name:</label>
                <input
                id="first_name"
                name='first_name'
                type='text'
                value={employee.first_name}
                onChange={handleChange}
                placeholder='Jane'
                />

                <label htmlFor='last_name'>Last Name:</label>
                <input
                id="last_name"
                name='last_name'
                type='text'
                value={employee.last_name}
                onChange={handleChange}
                placeholder='Doe'
                />

                <label htmlFor='email'>Email:</label>
                <input
                id="email"
                name='email'
                type='text'
                value={employee.email}
                onChange={handleChange}
                placeholder='JaneDoe@123.gmail.com'
                />

                <label htmlFor='position'>Position:</label>
                <input
                id="position"
                name='position'
                type='text'
                value={employee.position}
                onChange={handleChange}
                />

                <label htmlFor='salary'>Salary:</label>
                <input
                id="salary"
                name='salary'
                type='number'
                value={employee.salary}
                onChange={handleChange}
                />

                <label htmlFor='department'>Department:</label>
                <input
                id="department"
                name='department'
                type='text'
                value={employee.department}
                onChange={handleChange}
                />

                <button type='submit' className='update button'>
                    Update
                </button>
                </form>
            </section>
            <button onClick={logOut}>LogOut</button>
            <button onClick={Backout}>Cancel</button>
        </main>
    )
}

