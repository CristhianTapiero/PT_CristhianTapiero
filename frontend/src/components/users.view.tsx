import React, { useState } from "react";
import MyModal from "../assets/popup.tsx";

const Table: React.FC = () => {
    const [visible, setVisible] = useState(false);
    const users = [{
        id: 1,
        name: 'John Doe',
        cursos: ['Curso 1', 'Curso 2'],
        email: 'ksakdj@gmail.com'
    }, {
        id: 2,
        name: 'Jane Doe',
        cursos: ['Curso 1', 'Curso 4'],
        email: 'jasdasd@gmail.com'
    }]
    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <div className="flex flex-col items-center min-w-2xl w-4/5 h-5/6">
                <h2 className="py-4 text-2xl font-semibold">Usuarios</h2>
                <div className="flex justify-end w-full my-3">
                    <button onClick={() => setVisible(true)} className="button-primary">Agregar</button>
                </div>
                <MyModal visible={visible} onClose={() => setVisible(false)} >
                    <div className="bg-white p-4 rounded w-3/5 h-4/5 overflow-y-scroll relative flex flex-col">
                        <button id="close-button" className="absolute right-4 top-4">X</button>
                        <h1 className="font-semibold text-center text-xl text-gray-700">
                            Registrar Usuario
                        </h1>
                        <p className="text-center text-gray-700 mb-5">Página para el registro de usuarios</p>

                        <div className="flex flex-col flex-grow justify-center items-center gap-y-5">
                            <input type="text" placeholder="Cedula" className="input"/>
                            <input type="text" placeholder="Nombres" className="input"/>
                            <input type="text" placeholder="Apellidos" className="input"/>
                            <input type="email" placeholder="Email" className="input"/>
                            <input type="tel" placeholder="Telefono" className="input"/>
                            <select name="role" id="role" defaultValue={0} className="input w-fit">
                                <option value={0} disabled>Seleccione un rol</option>
                                <option value="admin">Admin</option>
                                <option value="coordinador">Coordinador</option>
                                <option value="profesor">Profesor</option>
                                <option value="estudiante">Estudiante</option>
                            </select>
                            <button className="button-primary w-max self-center text-xl">
                                Registrar
                            </button>
                        </div>
                    </div>
                </MyModal>
                <table className="w-full">
                    <thead className="bg-gray-300">
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Email</th>
                            <th>Cursos</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td className="py-2">{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.cursos.join(', ')}</td>
                                <td className="text-center gap-x-2">
                                    <button className="button-primary mr-2">Editar</button>
                                    <button className="button-disruptive ml-2">Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Table