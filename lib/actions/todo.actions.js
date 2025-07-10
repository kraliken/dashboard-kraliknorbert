"use server"

import axios from 'axios';
import { cookies } from 'next/headers'
import { todoFormSchema } from "../schemas";
import * as z from "zod/v4";

const BASE_URL = process.env.BASE_URL

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

        const cookieStore = await cookies();
        const token = cookieStore.get('access_token')?.value;

        console.log(token);

        if (!token) {
            throw new Error('No token – the user is not logged in.');
        }

        const url = new URL(`${BASE_URL}/api/v1/todos`);

        if (category) url.searchParams.append("category", category);
        if (period) url.searchParams.append("period", period);

        const response = await axios.get(url.toString(), {
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