import React, {useState} from "react";

const CreateEnroll:React.FC = () => {
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
            const response = await fetch("http://localhost:3001/enroll/", {
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
        <div>
            <h1>Crear vinculación a curso</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="userId">Usuario</label>
                <input type="number" id="studentId" name="studentId" onChange={handleChange} />
                <label htmlFor="courseId">Curso</label>
                <input type="number" id="courseId" name="courseId" onChange={handleChange} />
                <label htmlFor="statusId">Estado</label>
                <select name="statusId" id="statusId" defaultValue={1} onChange={handleChange}>
                    <option value={1}>Inscrito</option>
                    <option value={2}>Aprobado</option>
                    <option value={3}>Rechazado</option>
                    <option value={4}>Matriculado</option>
                </select>
                <button className="button-primary" type="submit">Crear</button>
            </form>
        </div>
    );
}

export default CreateEnroll;