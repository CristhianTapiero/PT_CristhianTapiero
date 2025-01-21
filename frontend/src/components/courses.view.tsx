import React, { useState } from "react";
import MyModal from "../assets/popup.tsx";

const CoursesView: React.FC = () => {
    const [visible, setVisible] = useState(false);
   const courses = [{
    id : 1,
    name : 'Curso 1',
    modality: 'Virtual',
    duration: '3 meses',
    quota: 20,
    created_at: '2021-10-10',
    updated_at: '2021-10-10'
   },{
    id : 2,
    name : 'Curso 2',
    modality: 'Presencial',
    duration: '6 meses',
    quota: 30,
    created_at: '2021-10-10',
    updated_at: '2021-10-10'
    }]


    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <div className="flex flex-col items-center min-w-2xl w-4/5 h-5/6">
                <h2 className="py-4 text-2xl font-semibold">Cursos</h2>
                <div className="flex justify-end w-full my-3">
                    <button onClick={() => setVisible(true)} className="button-primary">Crear Curso</button>
                </div>
                <MyModal visible={visible} onClose={() => setVisible(false)} >
                    <div className="bg-white p-4 rounded w-3/5 h-4/5 overflow-y-scroll relative flex flex-col">
                        <button id="close-button" className="absolute right-4 top-4">X</button>
                        <h1 className="font-semibold text-center text-xl text-gray-700">
                            Crear Curso
                        </h1>
                        <p className="text-center text-gray-700 mb-5">Página para crear cursos</p>

                        <div className="flex flex-col flex-grow justify-center items-center gap-y-5">
                            <input type="text" name="course_id" id="course_id" disabled className="input" placeholder="Identificador"/>
                            <input type="text" placeholder="Nombre" className="input"/>
                            <input type="text" placeholder="Modalidad" className="input"/>
                            <input type="number" placeholder="Cupo" className="input"/>
                            <div className="flex items-center justify-center gap-x-2 w-5/6">
                                <label htmlFor="duracion">Duracion: </label>
                                <input type="number" name="duracion" className="input w-12"/>
                                <span>meses</span>
                            </div>
                            <button className="button-primary w-max self-center text-xl">
                                Crear curso
                            </button>
                        </div>
                    </div>
                </MyModal>
                <table className="w-full">
                    <thead className="bg-gray-300">
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Modalidad</th>
                            <th>Duración</th>
                            <th>Cupo</th>
                            <th>Fecha de Creación</th>
                            <th>Fecha de Actualización</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.map(user => (
                            <tr key={user.id}>
                                <td className="py-2">{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.modality}</td>
                                <td>{user.duration}</td>
                                <td>{user.quota}</td>
                                <td>{user.created_at}</td>
                                <td>{user.updated_at}</td>
                                <td className="text-center">
                                    <button className="button-primary mr-1">Editar</button>
                                    <button className="button-disruptive ml-1">Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default CoursesView