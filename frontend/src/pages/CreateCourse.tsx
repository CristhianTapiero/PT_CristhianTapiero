import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { config } from "../api/config";

const CreateCourse: React.FC = () => {
    const navigate = useNavigate();
    const [course, setcourse] = useState({
        name: null,
        duration: null,
        quota: null,
        modalityId: null,
    });

    const handleChange = (e: any) => {
        setcourse({
            ...course,
            [e.target.name]: e.target.name !== "name" ? parseInt(e.target.value) : e.target.value,
        });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!course.name || !course.quota || !course.modalityId || !course.duration) {
            console.error("Faltan campos por llenar");
            return
        }
        try {
            const response = await fetch(`${config.apiBaseUrl}}/courses`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(course),
            });
            const data = await response.json();
            console.log(data);
            navigate("/dashboard");
        } catch (error) {
            console.error("Error al crear el curso:", error);
        }
    };

    return (
        <div className="flex flex-col items-center gap-y-4 mt-7">
            <form onSubmit={handleSubmit} className="w-2/4 max-w-3xl min-w-max px-2 py-6 rounded-xl border-2 border-black">
                <h1 className="title">Crear Curso</h1>
                <div className="input_label">
                    <label htmlFor="name">Nombre</label>
                    <input type="text" id="name" name="name" onChange={handleChange} />
                </div>
                <div className="input_label">
                    <label htmlFor="duration">Duración</label>
                    <input type="number" id="duration" name="duration" onChange={handleChange} />
                </div>
                <div className="input_label">
                    <label htmlFor="quota">Cupo</label>
                    <input type="number" id="quota" name="quota" onChange={handleChange} />
                </div>
                <div className="input_label">
                    <label htmlFor="modalityId">Modalidad</label>
                    <select name="modalityId" id="modalityId" defaultValue={1} onChange={handleChange}>
                        <option value={1}>Virtual</option>
                        <option value={2}>Remoto</option>
                        <option value={3}>Presencial</option>
                    </select>
                </div>
                <button className="button-primary" type="submit">Crear</button>
            </form>
        </div>
    );
}

export default CreateCourse;