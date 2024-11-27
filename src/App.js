import React from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./components/Auth/Login";
import DepartmentList from "./components/Department/DepartmentList";
import DepartmentForm from "./components/Department/DepartmentFrom";
import EmployeeList from "./components/Employee/EmployeeList";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/departments" element={<DepartmentList />} />
                <Route path="/departments/create" element={<DepartmentForm />} />
                <Route path="/departments/update/:id" element={<DepartmentForm />} />
                <Route path="/departments/:id/employee" element={<EmployeeList />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
