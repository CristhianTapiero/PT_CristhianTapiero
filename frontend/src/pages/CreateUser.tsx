import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

const CreateUser:React.FC = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        roleId: 4,
        user_password: null
    });

    const handleChange = (e: any) => {
        setUser({
            ...user,
            [e.target.name]: e.target.name === "roleId" ? parseInt(e.target.value) : e.target.value,
        });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!user.firstName || !user.lastName || !user.email || !user.phone || !user.roleId || 
            user.firstName === "" || user.lastName === "" || user.email === "" || user.phone === "" || user.roleId === 0) {
            console.error("Faltan campos por llenar");
            return
        }
        try {
            const response = await fetch("http://localhost:3001/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(user),
            });
            const data = await response.json();
            console.log(data);
            navigate("/dashboard");
        } catch (error) {
            console.error("Error al crear el usuario:", error);
        }
    };

    return (
        <div>
            <h1>Crear Usuario</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="firstName">Nombre</label>
                <input type="text" id="firstName" name="firstName" onChange={handleChange} />
                <label htmlFor="lastName">Apellido</label>
                <input type="text" id="lastName" name="lastName" onChange={handleChange} />
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" onChange={handleChange} />
                <label htmlFor="phone">Teléfono</label>
                <input type="text" id="phone" name="phone" onChange={handleChange} />
                <label htmlFor="rol">Rol</label>
                <select name="roleId" id="rol" defaultValue={4} onChange={handleChange}>
                    <option value={1}>Admin</option>
                    <option value={2}>Coordinador</option>
                    <option value={3}>Docente</option>
                    <option value={4}>Estudiante</option>

                </select>
                <button className="button-primary" type="submit">Crear Usuario</button>
            </form>
        </div>
    );
}

export default CreateUser;