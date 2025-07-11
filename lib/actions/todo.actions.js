"use server"

import axios from 'axios';
import { cookies } from 'next/headers'
import { todoFormSchema } from "../schemas";
import { revalidatePath } from 'next/cache';

import * as z from "zod/v4";

const BASE_URL = process.env.BASE_URL

function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}


export async function createTodo(prevState, formData) {

    const rawFormData = Object.fromEntries(formData);

    if (rawFormData.deadline === "") {
        rawFormData.deadline = null;
    }

    const result = todoFormSchema.safeParse(rawFormData);

    if (!result.success) {
        const { fieldErrors } = z.flattenError(result.error);
        return { success: false, errors: fieldErrors, data: rawFormData };
    }

    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('access_token')?.value;

        if (!token) {
            throw new Error('No token – the user is not logged in.');
        }

        const response = await axios.post(`${BASE_URL}/api/v1/todos/create`, rawFormData, {
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `access_token=${token}` // Explicit cookie beállítás!
            },
            withCredentials: true
        });

        return {
            success: true,
            message: 'Todo successfully created!',
            errors: {},
            data: {}
        };

    } catch (error) {
        console.error('Todo creation failed:', error);
        return {
            success: false,
            message: 'Failed to create todo',
            errors: {},
            data: rawFormData
        };
    }

}

export async function getTodos(period = null, category = null) {

    try {

        await delay(3000);

        const cookieStore = await cookies();
        const token = cookieStore.get('access_token')?.value;

        if (!token) {
            throw new Error('No token – the user is not logged in.');
        }

        const url = new URL(`${BASE_URL}/api/v1/todos/`);

        if (category) url.searchParams.append("category", category);
        if (period) url.searchParams.append("period", period);

        const response = await axios.get(url.toString(), {
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `access_token=${token}`
            },
            withCredentials: true
        });

        return response.data;

    } catch (error) {
        console.error('=== getTodos Error ===');
        console.error('Error message:', error.message);
        console.error('Error code:', error.code);
        console.error('Response status:', error.response?.status);
        console.error('Response data:', error.response?.data);
        console.error('Request headers:', error.config?.headers);
        console.error('Request URL:', error.config?.url);

        // Specifikus error handling
        if (error.response?.status === 401) {
            throw new Error('Authentication failed - please log in again');
        } else if (error.response?.status === 403) {
            throw new Error('Access denied - insufficient permissions');
        } else if (error.code === 'ECONNABORTED') {
            throw new Error('Request timeout - please try again');
        } else {
            throw new Error(`Failed to fetch todos: ${error.response?.status || error.message}`);
        }
    }
}

export async function deleteTodo(todoId) {

    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('access_token')?.value;

        if (!token) {
            throw new Error('No token – the user is not logged in.');
        }

        const response = await axios.delete(`${BASE_URL}/api/v1/todos/${todoId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `access_token=${token}`
            },
            withCredentials: true
        });

        revalidatePath('/todos')

        return {
            success: true,
            message: 'Todo successfully deleted!'
        };

    } catch (error) {
        console.error('Todo deletion failed:', error);
        if (error.response?.status === 401) {
            return {
                success: false,
                message: 'Session expired, please log in again'
            };
        }

        if (error.response?.status === 404) {
            return {
                success: false,
                message: 'Todo not found'
            };
        }

        return {
            success: false,
            message: 'Failed to delete todo'
        };
    }

}
