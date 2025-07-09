'use server';

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import axios from 'axios';
import * as z from "zod/v4";
import { signInFormSchema } from '../schemas';

const BASE_URL = process.env.BASE_URL

export async function signInAction(prevState, formData) {

    const raw = Object.fromEntries(formData);
    const result = signInFormSchema.safeParse(raw);

    if (!result.success) {
        const { fieldErrors } = z.flattenError(result.error);
        return { success: false, message: '', errors: fieldErrors, data: raw };
    }

    try {
        const response = await axios.post(`${BASE_URL}/api/v1/auth/sign-in`, formData, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        });

        const { access_token, token_type, user } = response.data;

        const cookieStore = await cookies();

        cookieStore.set('access_token', access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });

        cookieStore.set('user_data', JSON.stringify(user), {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });

    } catch (error) {
        console.log('Login Failed:', error);

        let message = 'Unknown error occurred';
        const errorResponse = axios.isAxiosError(error) ? error.response : null;

        if (errorResponse) {
            switch (errorResponse.status) {
                case 401:
                    message = 'Invalid username or password.';
                    break;
                case 503:
                    message = 'The server is waking up. Please try again in a few seconds.';
                    break;
                default:
                    message =
                        errorResponse.data?.detail || 'An unexpected server error occurred.';
            }
        } else if (axios.isAxiosError(error)) {
            message =
                'Could not connect to the server. Please check your internet connection or try again later.';
        }

        return {
            success: false,
            message,
            errors: {},
            data: raw
        };
    }

    redirect('/');

}

export async function signout() {

    const cookieStore = await cookies();
    const token = cookieStore.get("access_token");
    const user = cookieStore.get("user_data");

    if (token) {
        cookieStore.set("access_token", "", { maxAge: -1, path: "/" });
        if (user) {
            cookieStore.set("user_data", "", { maxAge: -1, path: "/" });
        }
    }

    redirect("/sign-in");
}