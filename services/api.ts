import axios from 'axios';
import { Tour, BookingDetails } from '../types';

const API_URL = '/api';

export const api = axios.create({
    baseURL: API_URL,
});

export const tourService = {
    getAll: async (): Promise<Tour[]> => {
        const response = await api.get<Tour[]>('/tours');
        return response.data;
    },

    getById: async (id: string): Promise<Tour> => {
        const response = await api.get<Tour>(`/tours/${id}`);
        return response.data;
    }
};

export const bookingService = {
    create: async (booking: any): Promise<any> => {
        // Create FormData
        const formData = new FormData();
        Object.keys(booking).forEach(key => {
            formData.append(key, booking[key]);
        });

        // Use 'multipart/form-data' automatically when body is FormData
        const response = await api.post('/bookings', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    }
};

export const authService = {
    login: async (credentials: any): Promise<any> => {
        const response = await api.post('/auth/login', credentials);
        return response.data;
    }
};

export const destinationService = {
    getAll: async (): Promise<any[]> => {
        const response = await api.get('/destinations');
        return response.data;
    },
    getByIdOrSlug: async (idOrSlug: string): Promise<any> => {
        const response = await api.get(`/destinations/${idOrSlug}`);
        return response.data;
    },
    create: async (data: any): Promise<any> => {
        const response = await api.post('/destinations', data);
        return response.data;
    },
    update: async (id: string, data: any): Promise<any> => {
        const response = await api.put(`/destinations/${id}`, data);
        return response.data;
    },
    delete: async (id: string): Promise<any> => {
        const response = await api.delete(`/destinations/${id}`);
        return response.data;
    }
};
