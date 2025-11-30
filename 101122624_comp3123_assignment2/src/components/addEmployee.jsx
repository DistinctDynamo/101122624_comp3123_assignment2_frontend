import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router";

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
        axios.post('http://localhost:8081/api/v1/emp/employees',userData
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
                value={formData.first_name}
                onChange={handleChange}
                placeholder='Jane'
                required
                />

                <label htmlFor='last_name'>Last Name:</label>
                <input
                id="last_name"
                name='last_name'
                type='text'
                value={formData.last_name}
                onChange={handleChange}
                placeholder='Doe'
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

                <label htmlFor='position'>Position:</label>
                <input
                id="position"
                name='position'
                type='text'
                value={formData.position}
                onChange={handleChange}
                required
                />

                <label htmlFor='salary'>Salary:</label>
                <input
                id="salary"
                name='salary'
                type='number'
                value={formData.salary}
                onChange={handleChange}
                required
                />

                <label htmlFor='department'>Department:</label>
                <input
                id="department"
                name='department'
                type='text'
                value={formData.department}
                onChange={handleChange}
                required
                />

                <button type='submit' className='add button'>
                    Add
                </button>
                </form>
            </section>
            <button onClick={logOut}>LogOut</button>
            <button onClick={Backout}>Cancel</button>
        </main>
    )
}