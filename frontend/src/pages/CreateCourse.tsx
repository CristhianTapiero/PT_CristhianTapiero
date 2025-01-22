import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { config } from "../api/config";

const CreateCourse:React.FC = () => {
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
        <div>
            <h1>Crear Curso</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Nombre</label>
                <input type="text" id="name" name="name" onChange={handleChange} />
                <label htmlFor="duration">Duración</label>
                <input type="number" id="duration" name="duration" onChange={handleChange} />
                <label htmlFor="quota">Cupo</label>
                <input type="number" id="quota" name="quota" onChange={handleChange} />
                <label htmlFor="modalityId">Modalidad</label>
                <select name="modalityId" id="modalityId" defaultValue={1} onChange={handleChange}>
                    <option value={1}>Virtual</option>
                    <option value={2}>Remoto</option>
                    <option value={3}>Presencial</option>

                </select>
                <button className="button-primary" type="submit">Crear</button>
            </form>
        </div>
    );
}

export default CreateCourse;