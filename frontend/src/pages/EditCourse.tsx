import { useParams, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { config } from '../api/config';

export const EditCourse: React.FC = () => {
    const { id } = useParams();
    const [course, setCourse] = useState<any>(null);
    const [users, setUsers] = useState<any>(null);
    const navigate = useNavigate();

    const updateData = async (e: any) => {
        e.preventDefault();
        console.log(course);
        try {
            const response = await fetch(`${config.apiBaseUrl}/courses/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    name: course.name,
                    duration: parseInt(course.duration),
                    quota: parseInt(course.quota),
                    modalityId: parseInt(course.modalityId),
                }),
            });
            setCourse(null);
            navigate('/dashboard');
            return response;
        } catch (error) {
            console.error('Error al actualizar el usuario:', error);
        }
    }

    const removeUser = async (userId: number) => {
        try {
            const response = await fetch(`${config.apiBaseUrl}/enroll/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            const data = await response.json();
            console.log(data);
            setUsers(users.filter((user: any) => user.Users.id !== userId));
        } catch (error) {
            console.error('Error al eliminar el usuario:', error);
        }
    }

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await fetch(`${config.apiBaseUrl}/courses/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });
                const data = await response.json();
                console.log(data);
                setCourse(data);
            } catch (error) {
                console.error('Error al cargar el usuario:', error);
            }
        };

        const fetchUsers = async () => {
            try {
                const response = await fetch(`${config.apiBaseUrl}/enroll/bycourse/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });
                const data = await response.json();
                setUsers(data);
                console.log(data);
            } catch (error) {
                console.error('Error al cargar los cursos:', error);
            }
        };

        if (id) {
            fetchCourse();
            fetchUsers();
        }
    }, [id]);

    if (!course) {
        return <p>Cargando información del usuario...</p>;
    }

    return (
        <div>
            <h1 className="text-2xl font-semibold text-gray-700">Editar Curso</h1>
            <form className="text-black">
                <div>
                    <label htmlFor="name">Nombre</label>
                    <input type="text" id="name" name="name" defaultValue={course.name} onChange={(e) => setCourse({ ...course, name: e.target.value })} />
                </div>
                <div>
                    <label htmlFor="duration">Duración</label>
                    <input type="number" id="duration" name="duration" defaultValue={course.duration} onChange={(e) => setCourse({ ...course, duration: e.target.value })} />
                </div>
                <div className="flex flex-col w-3/6">
                    <label htmlFor="quota">Cupo</label>
                    <input type="number" id="quota" name="quota" defaultValue={course.quota} onChange={(e) => setCourse({ ...course, quota: e.target.value })} />
                </div>
                <div className="flex gap-x-5 items-center">
                    <label htmlFor="modalityId">Modalidad</label>
                    <select name="modalityId" id="modalityId" defaultValue={course.modalityId} onChange={(e) => setCourse({ ...course, modalityId: e.target.value })}>
                        <option value={1}>Virtual</option>
                        <option value={2}>Remoto</option>
                        <option value={3}>Presencial</option>
                    </select>
                </div>
                <button className="button-primary" onClick={updateData}>Actualizar</button>
            </form>

            <h1 className="text-2xl font-semibold text-gray-700">Estudiantes</h1>
            <ul>
                {users && users.map((user: any) => (
                    <li key={user.Users.id}>
                        {user.Users.firstName} {user.Users.lastName} 
                        <button className="button-disruptive" onClick={()=>removeUser(user.id)}>Desvincular</button>
                    </li>
                ))}
            </ul>

        </div>
    );
};
