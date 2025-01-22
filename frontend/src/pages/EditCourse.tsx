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
        <div className="flex flex-col items-center gap-y-4 mt-7">
            <form className="w-2/4 max-w-3xl min-w-max px-2 py-6 rounded-xl border-2 border-black">
                <h1 className="title">Editar Curso</h1>
                <div className='input_label'>
                    <label htmlFor="name">Nombre</label>
                    <input type="text" id="name" name="name" defaultValue={course.name} onChange={(e) => setCourse({ ...course, name: e.target.value })} />
                </div>
                <div className='input_label'>
                    <label htmlFor="duration">Duración</label>
                    <input type="number" id="duration" name="duration" defaultValue={course.duration} onChange={(e) => setCourse({ ...course, duration: e.target.value })} />
                </div>
                <div className='input_label'>
                    <label htmlFor="quota">Cupo</label>
                    <input type="number" id="quota" name="quota" defaultValue={course.quota} onChange={(e) => setCourse({ ...course, quota: e.target.value })} />
                </div>
                <div className='input_label'>
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
            <div className="relative overflow-x-auto mt-7 w-4/5 justify-self-center flex flex-col gap-y-4 min-h-screen">
                <table className="w-full overflow-scroll text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Id Usuario
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Nombre Completo
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {users && users.map((user: any) => (

                            <tr key={user.Users.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <td className="px-6 py-4">
                                    {user.Users.id}
                                </td>
                                <td className="px-6 py-4">
                                    {user.Users.firstName} {user.Users.lastName}
                                </td>
                                <td className="px-6 py-4 align-middle text-center">
                                    <div className='flex gap-x-2 h-10 items-center justify-center'>
                                        <button onClick={() => removeUser(user.id)} className="bg-red-600 rounded-sm transition-colors hover:bg-red-900 text-white px-2 py-1" >Eliminar</button>
                                    </div>
                                </td>
                            </tr>

                        ))}
                    </tbody>
                </table>

            </div>
        </div>
    );
};
