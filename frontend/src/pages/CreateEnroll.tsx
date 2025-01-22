import React, { useState } from "react";
import { config } from "../api/config";

const CreateEnroll: React.FC = () => {
    const [enrollment, setEnrollment] = useState({
        studentId: 0,
        courseId: 0,
        statusId: 1,
    });

    const handleChange = (e: any) => {
        setEnrollment({
            ...enrollment,
            [e.target.name]: parseInt(e.target.value),
        });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        console.log(enrollment);
        if (!enrollment.studentId || !enrollment.courseId || !enrollment.statusId) {
            console.error("Faltan campos por llenar");
            return
        }
        try {
            const response = await fetch(`${config.apiBaseUrl}/enroll/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(enrollment),
            });
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error("Error al crear el curso:", error);
        }
    };

    return (
        <div className="flex flex-col items-center gap-y-4 mt-7">
            <form onSubmit={handleSubmit} className="w-2/4 max-w-3xl min-w-max px-2 py-6 rounded-xl border-2 border-black">
            <h1 className="title">Crear vinculación a curso</h1>
                <div className="input_label">
                    <label htmlFor="userId">Usuario:</label>
                    <input className="flex-grow" type="number" id="studentId" name="studentId" onChange={handleChange} />
                </div>
                <div className="input_label">
                    <label htmlFor="courseId">Curso:</label>
                    <input className="flex-grow" type="number" id="courseId" name="courseId" onChange={handleChange} />
                </div>
                <div className="input_label">
                    <label htmlFor="statusId">Estado</label>
                    <select name="statusId" id="statusId" defaultValue={1} onChange={handleChange}>
                        <option value={1}>Inscrito</option>
                        <option value={2}>Aprobado</option>
                        <option value={3}>Rechazado</option>
                        <option value={4}>Matriculado</option>
                    </select>
                </div>
                <button className="button-primary rounded-md" type="submit">Crear</button>
            </form>
        </div>
    );
}

export default CreateEnroll;