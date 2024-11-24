import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";

const DepartmentForm = () => {
    const [name, setName] = useState("");
    const [capacity, setCapacity] = useState(0);
    const { id } = useParams();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = { name, capacity };
            if (id) {
                await api.put(`/department/update/${id}`, payload);
            } else {
                await api.post("/department/create", payload);
            }
            navigate("/departments");
        } catch {
            alert("Failed to save department!");
        }
    };

    return (
        <div className="container mt-5">
            <div className="card mx-auto shadow p-4" style={{ maxWidth: "500px" }}>
                <h3 className="text-center mb-4">
                    {id ? "Update Department" : "Create Department"}
                </h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter department name"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Capacity</label>
                        <input
                            type="number"
                            className="form-control"
                            value={capacity}
                            onChange={(e) => setCapacity(e.target.value)}
                            placeholder="Enter department capacity"
                            min="1"
                            required
                        />
                    </div>
                    <div className="d-flex justify-content-between">
                        <button type="submit" className="btn btn-primary">
                            {id ? "Update" : "Create"}
                        </button>
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => navigate("/departments")}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DepartmentForm;
