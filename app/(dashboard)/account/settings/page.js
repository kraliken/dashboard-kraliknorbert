import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import UserCard from "@/components/UserCard";
import { UserPen } from "lucide-react";
import { cookies } from 'next/headers';


const AccountSettingsPage = async () => {

    const cookieStore = await cookies();
    const userData = cookieStore.get('user_data')?.value;
    const user = userData ? JSON.parse(userData) : null;

    return (
        <div className="flex pb-4">
            <UserCard user={user} />
        </div>
    )
}

export default AccountSettingsPage