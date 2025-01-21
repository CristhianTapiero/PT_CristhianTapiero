import { config } from './config';

class ApiService {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    // Método genérico para manejar respuestas
    private async handleResponse<T>(response: Response): Promise<T> {
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error al realizar la solicitud');
        }
        return response.json();
    }

    // Método GET
    async get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
        const url = new URL(`${this.baseUrl}${endpoint}`);
        if (params) {
            Object.keys(params).forEach((key) =>
                url.searchParams.append(key, params[key])
            );
        }

        const response = await fetch(url.toString(), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return this.handleResponse<T>(response);
    }

    // Método POST
    async post<T>(endpoint: string, data: any): Promise<T> {
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        return this.handleResponse<T>(response);
    }

    // Método PUT
    async put<T>(endpoint: string, data: any): Promise<T> {
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        return this.handleResponse<T>(response);
    }

    // Método DELETE
    async delete<T>(endpoint: string): Promise<T> {
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return this.handleResponse<T>(response);
    }
}

export const apiService = new ApiService(config.apiBaseUrl || 'defaultBaseUrl');
