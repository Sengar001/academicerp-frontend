import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

const DepartmentList = () => {
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const response = await api.get("/department");
                setDepartments(response.data);
            } catch (error) {
                alert("Failed to fetch departments!");
            }
        };
        fetchDepartments();
    }, []);

    // Handle delete department
    const handleDelete = async (departmentId) => {
        if (window.confirm("Are you sure you want to delete this department?")) {
            try {
                await api.delete(`/department/delete/${departmentId}`);
                setDepartments((prev) =>
                    prev.filter((dept) => dept.department_id !== departmentId)
                );
                alert("Department deleted successfully!");
            } catch (error) {
                alert("Failed to delete department!");
            }
        }
    };

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="mb-0">Departments</h3>
                <Link to="/departments/create" className="btn btn-success">
                    + Create Department
                </Link>
            </div>
            <div className="table-responsive">
                <table className="table table-bordered table-hover">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Capacity</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {departments.length > 0 ? (
                            departments.map((dept) => (
                                <tr key={dept.department_id}>
                                    <td>{dept.department_id}</td>
                                    <td>{dept.name}</td>
                                    <td>{dept.capacity}</td>
                                    <td>
                                        <Link
                                            to={`/departments/${dept.department_id}`}
                                            className="btn btn-primary btn-sm me-2"
                                        >
                                            View
                                        </Link>
                                        <Link
                                            to={`/departments/update/${dept.department_id}`}
                                            className="btn btn-warning btn-sm me-2"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(dept.department_id)}
                                            className="btn btn-danger btn-sm"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center">
                                    No departments available.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <Link to="/" className="btn btn-secondary">
                    Logout
                </Link>
            </div>
        </div>
    );
};

export default DepartmentList;
