import './App.css';
import EmployeeList from './components/employees';
import Login from './components/login';
import Signup from './components/sign-up';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router';

function App() {
  return (
    <div>
      <h1>101122624_comp3123_assignment2</h1>
    <BrowserRouter>
        <nav>
          <NavLink to="/sign-up">Sign-up</NavLink>
          <NavLink to="/login">Login</NavLink>
        </nav>

        <Routes>
          <Route path="/sign-up" element={<Signup/>} />
          <Route path="/login" element={<Login/>} /> 
          <Route path="/employees" element={<EmployeeList/>}/>
        </Routes>
      </BrowserRouter>
      </div>
  );
}

export default App;
