"use client"

import { Card, CardAction, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { UserPen } from 'lucide-react'
import AccountSheet from './sheets/AccountSheet'
import AccountSettingsFrom from './forms/AccountSettingsFrom'
import { useUser } from '@/lib/context/UserContext'

const UserCard = () => {

    const { user } = useUser();

    console.log(user);
    return (
        <Card className="flex-1">
            <CardHeader>
                <CardTitle className="text-xl font-semibold">Account Settings</CardTitle>
                <CardAction>
                    <AccountSheet
                        title="Add email"
                        trigger={
                            <Button variant="ghost" size="sm" className="flex items-center gap-1 text-sm">
                                <UserPen className="w-4 h-4" /> Edit
                            </Button>
                        }
                    >
                        <AccountSettingsFrom user={user} />
                    </AccountSheet>
                </CardAction>
            </CardHeader>
            <CardContent>
                <div className="space-y-4 text-sm">
                    <div>
                        <span className="font-medium text-muted-foreground">Username:</span><br />
                        <span>{user.username}</span>
                    </div>
                    <div>
                        <span className="font-medium text-muted-foreground">Email:</span><br />
                        <span>{user.email || <em className="text-muted-foreground">not provided</em>}</span>
                    </div>
                    <div>
                        <span className="font-medium text-muted-foreground">Role:</span><br />
                        <span>{user.role}</span>
                    </div>
                    <div>
                        <span className="font-medium text-muted-foreground">Created at:</span><br />
                        <span>{new Date(user.created_at).toLocaleDateString('hu-HU')}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default UserCard