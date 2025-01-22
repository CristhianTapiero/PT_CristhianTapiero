import { useParams, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

export const EditUser: React.FC = () => {
    const { id } = useParams();
    const [user, setUser] = useState<any>(null);
    const [courses, setCourses] = useState<any>(null);
    const navigate = useNavigate();

    const updateData = async (e: any ) => {
        e.preventDefault();
        console.log(user);
        try {
            const response = await fetch(`${process.env.API_BASE_URL}/users/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    phone: user.phone,
                    roleId: user.role,
                    user_password: null,
                }),
            });
            setUser(null);
            navigate('/dashboard');
            return response;
        } catch (error) {
            console.error('Error al actualizar el usuario:', error);
        }
    }

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`${process.env.API_BASE_URL}/users/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });
                const data = await response.json();
                setUser(data.rows);
            } catch (error) {
                console.error('Error al cargar el usuario:', error);
            }
        };

        const fetchCourses = async () => {
            try {
                const response = await fetch(`${process.env.API_BASE_URL}/enroll/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });
                const data = await response.json();
                console.log(data.rows);
                setCourses(data.rows);
            } catch (error) {
                console.error('Error al cargar los cursos:', error);
            }
        };

        if (id) {
            fetchUser();
            fetchCourses();
        }
    }, [id]);

    if (!user) {
        return <p>Cargando información del usuario...</p>;
    }

    return (
        <div>
            <h1 className="text-2xl font-semibold text-gray-700">Editar Usuario</h1>
            <button>Volver al dashboard</button>
            <form className="text-black">
                <div>
                    <label>Nombre</label>
                    <input type="text" value={user.firstName} onChange={(e) => setUser({ ...user, firstName: e.target.value })} />
                </div>
                <div>
                    <label>Apellido</label>
                    <input type="text" value={user.lastName} onChange={(e) => setUser({ ...user, lastName: e.target.value })} />
                </div>
                <div>
                    <label>Correo</label>
                    <input type="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
                </div>
                <div>
                    <label>Teléfono</label>
                    <input type="text" value={user.phone} onChange={(e) => setUser({ ...user, phone: e.target.value })} />
                </div>
                <button type="submit" onClick = {(e) => updateData(e)} className="bg-blue-600 text-white px-4 py-2 rounded">Guardar</button>
            </form>

            <h1 className="text-2xl font-semibold text-gray-700">Cursos</h1>
            <ul>
                {courses && courses.map((course: any) => (
                    <li key={course.Courses.id}>{course.Courses.name}</li>
                ))}
            </ul>

        </div>
    );
};
