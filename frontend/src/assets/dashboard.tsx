import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Dashboard: React.FC = () => {
    const [users, setUsers] = useState<any[]>([]);
    const [courses, setCourses] = useState<any[]>([]);
    const navigate = useNavigate();

    // Consultar a la API y obtener los usuarios
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(`${process.env.API_BASE_URL}/users`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error('Error al cargar los usuarios:', error);
            }
        };
        const fetchCourses = async () => {
            try {
                const response = await fetch(`${process.env.API_BASE_URL}/courses`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setCourses(data);
            } catch (error) {
                console.error('Error al cargar los cursos:', error);
            }
        }

        fetchUsers();
        fetchCourses();
    }, []);

    const handleUserDelete = async (id:string) => {
        try {
            const response = await fetch(`${process.env.API_BASE_URL}/users/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            if (response.ok) {
                const newUsers = users.filter((user) => user.id !== id);
                setUsers(newUsers);
            } else {
                throw new Error('Error al eliminar el usuario');
            }
        } catch (error) {
            console.error('Error al eliminar el usuario:', error);
        }
    }

    const handleCourseDelete = async (id:string) => {
        try {
            const response = await fetch(`${process.env.API_BASE_URL}/courses/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            if (response.ok) {
                const newCourses = courses.filter((course) => course.id !== id);
                setCourses(newCourses);
            } else {
                throw new Error('Error al eliminar el curso');
            }
        } catch (error) {
            console.error('Error al eliminar el curso:', error);
        }
    }

    return (
        <div className="relative overflow-x-auto">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-semibold text-gray-700">Usuarios</h1>
                <button onClick={() => navigate(`/create-user`)} className="flex items-center px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-lg active:bg-blue-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue">
                    Agregar usuario
                </button>
            </div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Nombre de usuario
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Correo
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Teléfono
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Acciones
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(users) && users.map((user) => (
                        <tr key={user.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <td className="px-6 py-4">
                                {user.firstName} {user.lastName}
                            </td>
                            <td className="px-6 py-4">
                                {user.email}
                            </td>
                            <td className="px-6 py-4">
                                {user.phone}
                            </td>
                            <td className="px-6 py-4 align-middle text-center">
                            <button 
                                    onClick={() => navigate(`/edit-user/${user.id}`)} 
                                    className="bg-indigo-600 hover:bg-indigo-900 text-white px-2 py-1"
                                >
                                    Editar
                                </button>
                                <button onClick={() => handleUserDelete(user.id)} className="bg-red-600 hover:bg-red-900 text-white px-2 py-1 mt-2" >Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-semibold text-gray-700">Cursos</h1>
                <button onClick={() => navigate(`/create-course`)} className="flex items-center px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-lg active:bg-blue-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue">
                    Agregar curso
                </button>
            </div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            ID
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Nombre
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Modalidad
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Cupos
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Acciones
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(courses) && courses.map((course) => (
                        <tr key={course.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <td className="px-6 py-4">
                                {course.id}
                            </td>
                            <td className="px-6 py-4">
                                {course.name}
                            </td>
                            <td className="px-6 py-4">
                                {course.Modalities.name}
                            </td>
                            <td className="px-6 py-4">
                                {course.quota}
                            </td>
                            <td className="px-6 py-4 align-middle text-center">
                            <button 
                                    onClick={() => navigate(`/edit-course/${String(course.id)}`)} 
                                    className="bg-indigo-600 hover:bg-indigo-900 text-white px-2 py-1"
                                >
                                    Editar
                                </button>
                                <button onClick={() => handleCourseDelete(String(course.id))} className="mt-2 bg-red-600 hover:bg-red-900 text-white px-2 py-1" >Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
