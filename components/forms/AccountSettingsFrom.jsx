'use client';

import { useActionState, useEffect, useState } from 'react';
import { Button } from "../ui/button";
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { useRouter } from 'next/navigation'
import { updateUserAccount } from '@/lib/actions/user.actions';
import { toast } from 'sonner';
import { useUser } from '@/lib/context/UserContext';

const AccountSettingsFrom = ({ user, onSuccess }) => {

    const router = useRouter()

    const { setUser } = useUser();

    const [email, setEmail] = useState(user?.email || '');
    const originalEmail = user?.email || '';

    const [data, action, isPending] = useActionState(updateUserAccount, {
        success: false,
        message: '',
        code: '',
        errors: {},
        data: user || {}
    });

    useEffect(() => {
        console.log("CODE", data.code);
        if (data.success) {
            toast.success(data.message || 'Account updated successfully!');
            setUser(data.data);
            router.refresh()
            onSuccess();
        } else if (data.code === "EMAIL_UNCHANGED") {
            toast.info(data.message);
        } else if (!data.success && data.message) {
            toast.error(data.message);
        }
    }, [data.success, data.message, data.code]);


    const SubmitButton = () => {
        const isUnchanged = email.trim() === originalEmail;
        return (
            <Button disabled={isPending || isUnchanged} className='w-full mt-auto' variant='default'>
                {isPending ? 'Updating...' : 'Update'}
            </Button>
        );
    }
    return (
        <form action={action} className="flex flex-col h-full gap-4 p-4">
            <div className='space-y-4'>
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    name="email"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={data?.errors?.email ? 'border-red-400' : ''}
                />
            </div>
            {data && !data.success && data.errors?.email && (
                <div className='text-center text-destructive'>{data.errors.email}</div>
            )}
            <SubmitButton />
        </form>
    )
}

export default AccountSettingsFrom