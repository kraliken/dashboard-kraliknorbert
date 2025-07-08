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
        return { success: false, errors: fieldErrors, data: raw };
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

        if (axios.isAxiosError(error)) {
            console.log(axios.isAxiosError(error));
            console.log(error.response);
            if (error.response) {
                // A szerver válaszolt, pl. 401 vagy 503
                if (error.response.status === 401) {
                    message = 'Invalid username or password';
                } else if (error.response.status === 503) {
                    message = 'Server is waking up. Please try again in a few seconds.';
                } else {
                    message = error.response.data?.detail || 'Unexpected server error';
                }
            } else {
                // A kérés nem jutott el a szerverig
                message = 'Could not connect to the server. Please check your connection or try again later.';
            }
        } else {
            message = 'An unknown error occurred.';
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