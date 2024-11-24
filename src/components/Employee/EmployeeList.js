import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { useParams, Link } from "react-router-dom";

const EmployeeList = () => {
    const { id } = useParams(); 
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await api.get(`/department/${id}`);
                setEmployees(response.data);
            } catch (error) {
                alert("Failed to fetch employees for the department!");
            }
        };
        fetchEmployees();
    }, [id]);

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h3>Employees in Department { id }</h3>
                <Link to="/departments" className="btn btn-secondary">
                    Back to Departments
                </Link>
            </div>
            {employees.length > 0 ? (
                <div className="table-responsive">
                    <table className="table table-bordered table-hover">
                        <thead className="table-dark">
                            <tr>
                                <th>ID</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Title</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map((emp) => (
                                <tr key={emp.employee_id}>
                                    <td>{emp.employee_id}</td>
                                    <td>{emp.first_name}</td>
                                    <td>{emp.last_name}</td>
                                    <td>{emp.email}</td>
                                    <td>{emp.title}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="alert alert-warning text-center" role="alert">
                    No employees found in this department.
                </div>
            )}
        </div>
    );
};

export default EmployeeList;
