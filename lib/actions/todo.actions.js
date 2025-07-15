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

export async function getTodos(period = null, category = [], status = [], limit = 5, page = 0) {

    try {

        const cookieStore = await cookies();
        const token = cookieStore.get('access_token')?.value;

        if (!token) {
            throw new Error('No token – the user is not logged in.');
        }

        const url = new URL(`${BASE_URL}/api/v1/todos/`);

        if (period) url.searchParams.append("period", period);

        const normalizedCategory = Array.isArray(category)
            ? category
            : category
                ? [category]
                : []

        if (normalizedCategory.length > 0) {
            normalizedCategory
                .filter((s) => typeof s === "string" && s.trim() !== "")
                .forEach((s) => url.searchParams.append("category", s.trim()))
        }

        const normalizedStatus = Array.isArray(status)
            ? status
            : status
                ? [status]
                : []

        if (normalizedStatus.length > 0) {
            normalizedStatus
                .filter((s) => typeof s === "string" && s.trim() !== "")
                .forEach((s) => url.searchParams.append("status", s.trim()))
        }

        if (limit) url.searchParams.append("limit", limit);
        if (page) url.searchParams.append("offset", page * limit - limit);

        const response = await axios.get(url.toString(), {
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `access_token=${token}`
            },
            withCredentials: true
        });

        return response.data;

    } catch (error) {

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

export async function updateTodo(prevState, todoId, formData) {

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

        await axios.patch(`${BASE_URL}/api/v1/todos/${todoId}`, rawFormData, {
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `access_token=${token}`
            },
            withCredentials: true
        });

        return {
            success: true,
            message: 'Todo successfully updated!',
            errors: {},
            data: {}
        };
    } catch (error) {
        console.error('Todo update failed:', error);
        return {
            success: false,
            message: 'Failed to update todo',
            errors: {},
            data: rawFormData
        };
    }
}

export async function getDailyTodos() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('access_token')?.value;

        if (!token) {
            throw new Error('No token – the user is not logged in.');
        }

        const response = await axios.get(`${BASE_URL}/api/v1/todos/report/daily`, {
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `access_token=${token}`
            },
        });

        return response.data;

    } catch (error) {
        console.error('Todo fetch error:', error);
        throw new Error('Failed to fetch todos');

    }
}

export async function exportDailyTodos() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('access_token')?.value;

        if (!token) {
            throw new Error('No token – the user is not logged in.');
        }

        const response = await axios.get(`${BASE_URL}/api/v1/todos/report/daily/export`, {
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `access_token=${token}`
            },
            responseType: 'arraybuffer',
        });

        return response.data;

    } catch (error) {
        console.error('Todo fetch error:', error);
        throw new Error('Failed to export daily todos');

    }
}

export async function getWeeklyTodos() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('access_token')?.value;

        if (!token) {
            throw new Error('No token – the user is not logged in.');
        }

        const response = await axios.get(`${BASE_URL}/api/v1/todos/report/weekly`, {
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `access_token=${token}`
            },
        });

        return response.data;

    } catch (error) {
        console.error('Todo fetch error:', error);
        throw new Error('Failed to fetch todos');

    }
}

export async function exportWeeklyTodos() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('access_token')?.value;

        if (!token) {
            throw new Error('No token – the user is not logged in.');
        }

        const response = await axios.get(`${BASE_URL}/api/v1/todos/report/weekly/export`, {
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `access_token=${token}`
            },
            responseType: 'arraybuffer',
        });

        return response.data;

    } catch (error) {
        console.error('Todo fetch error:', error);
        throw new Error('Failed to export weekly todos');

    }
}
