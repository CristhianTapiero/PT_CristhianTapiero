import React, { useState, useEffect, useCallback } from "react";

const UserSearch = () => {
    const [query, setQuery] = useState(""); // Término de búsqueda
    const [users, setUsers] = useState<{ id: number; name: string; email: string; cedula: string }[]>([]); // Usuarios encontrados
    const [loading, setLoading] = useState(false); // Indicador de carga
    const [error, setError] = useState<string | null>(null); // Mensajes de error
    const [pagination, setPagination] = useState({
        currentPage: 1,
        pageSize: 10,
        totalPages: 0,
        totalUsers: 0,
    });

    const fetchUsers = useCallback(async (page = 1) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`http://localhost:3001/users/match/${query}?page=${page}&pageSize=${pagination.pageSize}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            if (!response.ok) {
                throw new Error("Failed to fetch users");
            }

            const data = await response.json();
            setUsers(data.users); // Establecer los usuarios encontrados
            setPagination({
                ...data.pagination,
                currentPage: page,
            });
        } catch (err) {
            console.error(err);
            setError("Failed to fetch users. Please try again.");
        } finally {
            setLoading(false);
        }
    }, [query, pagination.pageSize]);

    useEffect(() => {
        if (query.trim() === "") {
            setUsers([]);
            return;
        }
        fetchUsers(pagination.currentPage); // Hacer la búsqueda inicial
    }, [query, pagination.currentPage, fetchUsers]);

    const handlePageChange = (page) => {
        fetchUsers(page); // Cambiar de página
    };

    return (
        <div>
            <h1>User Search</h1>
            <input
                type="text"
                placeholder="Search for users..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={{ padding: "8px", width: "300px", marginBottom: "20px" }}
            />

            {loading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        {user.name} - {user.email} - {user.cedula}
                    </li>
                ))}
            </ul>

            {users.length === 0 && !loading && query && <p>No matching users found.</p>}

            {/* Paginación */}
            {users.length > 0 && !loading && pagination.totalPages > 1 &&
                <div>
                <button
                    disabled={pagination.currentPage === 1}
                    onClick={() => handlePageChange(pagination.currentPage - 1)}
                >
                    Prev
                </button>
                <span>
                    Page {pagination.currentPage} of {pagination.totalPages}
                </span>
                <button
                    disabled={pagination.currentPage === pagination.totalPages}
                    onClick={() => handlePageChange(pagination.currentPage + 1)}
                >
                    Next
                </button>
            </div>}
            {
                query !== "" &&
                <div>
                    <p>Total users found: {pagination.totalUsers}</p>
                </div>
            }
            
        </div>
    );
};

export default UserSearch;

