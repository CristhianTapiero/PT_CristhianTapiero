import { useParams, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { config } from '../api/config';

export const EditUser: React.FC = () => {
    const { id } = useParams();
    const [user, setUser] = useState<any>(null);
    const [courses, setCourses] = useState<any>(null);
    const navigate = useNavigate();

    const updateData = async (e: any) => {
        e.preventDefault();
        console.log(user);
        try {
            const response = await fetch(`${config.apiBaseUrl}/users/${id}`, {
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

    const removeUser = async (courseId: number) => {
        try {
            const response = await fetch(`${config.apiBaseUrl}/enroll/${courseId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Error al eliminar el usuario:', error);
        }
    }

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`${config.apiBaseUrl}/users/${id}`, {
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
                const response = await fetch(`${config.apiBaseUrl}/enroll/${id}`, {
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
        <div className="flex flex-col items-center gap-y-4 mt-7">
            <form className="w-2/4 max-w-3xl min-w-max px-2 py-6 rounded-xl border-2 border-black">
                <h1 className="title">Editar Usuario</h1>
                <div className='input_label'>
                    <label>Nombre</label>
                    <input type="text" value={user.firstName} onChange={(e) => setUser({ ...user, firstName: e.target.value })} />
                </div>
                <div className='input_label'>
                    <label>Apellido</label>
                    <input type="text" value={user.lastName} onChange={(e) => setUser({ ...user, lastName: e.target.value })} />
                </div>
                <div className='input_label'>
                    <label>Correo</label>
                    <input type="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
                </div>
                <div className='input_label'>
                    <label>Teléfono</label>
                    <input type="text" value={user.phone} onChange={(e) => setUser({ ...user, phone: e.target.value })} />
                </div>
                <button type="submit" onClick={(e) => updateData(e)} className="bg-blue-600 text-white px-4 py-2 rounded">Guardar</button>
            </form>

            <h1 className="text-2xl font-semibold text-gray-700">Cursos</h1>
            <div className="relative overflow-x-auto mt-7 w-4/5 justify-self-center flex flex-col gap-y-4 min-h-screen">
                <table className="w-full overflow-scroll text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Id Curso
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Nombre del Curso
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses && courses.map((course: any) => (
                            <tr key={course.Courses.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <td className="px-6 py-4">
                                    {course.Courses.id}
                                </td>
                                <td className="px-6 py-4">
                                    {course.Courses.name}
                                </td>
                                <td className="px-6 py-4 align-middle text-center">
                                    <div className='flex gap-x-2 h-10 items-center justify-center'>
                                        <button onClick={() => removeUser(course.Courses.id)} className="bg-red-600 rounded-sm transition-colors hover:bg-red-900 text-white px-2 py-1" >Eliminar</button>
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
