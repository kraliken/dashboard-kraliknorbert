'use server';

import { cookies } from 'next/headers';
import axios from 'axios';
import * as z from "zod/v4";
import { emailUpdateSchema } from '../schemas';

const BASE_URL = process.env.BASE_URL

export async function updateUserAccount(prevState, formData) {

    const rawFormData = Object.fromEntries(formData);
    const result = emailUpdateSchema.safeParse(rawFormData);

    if (!result.success) {
        const { fieldErrors } = z.flattenError(result.error);
        return { success: false, message: '', errors: fieldErrors, data: rawFormData };
    }

    try {

        const cookieStore = await cookies();
        const token = cookieStore.get('access_token')?.value;

        if (!token) {
            throw new Error('No token – the user is not logged in.');
        }

        const response = await axios.patch(`${BASE_URL}/api/v1/user/update`, rawFormData, {
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `access_token=${token}`
            },
            withCredentials: true
        });

        return {
            success: true,
            message: 'Account successfully updated!',
            errors: {},
            data: response.data
        };


    } catch (error) {

        const detail = error?.response?.data?.detail;

        if (error?.response?.status === 400 && detail === "Email is already set to this value.") {
            return {
                success: false,
                message: detail,
                code: "EMAIL_UNCHANGED",
                errors: {},
                data: rawFormData,
            };
        }

        return {
            success: false,
            message: 'Failed to update account',
            code: "UNKNOWN_ERROR",
            errors: {},
            data: rawFormData,
        };


    }
}