import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarSeparator,
} from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { ChevronDown, ChevronUp, LayoutDashboard, LogOut, Settings, User2 } from "lucide-react";
import Link from "next/link";
import { signout } from "@/lib/actions/auth.actions";
import { cookies } from 'next/headers';
import { todoListLinks, todoReportLinks } from "@/lib/constants";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";

export async function AppSidebar() {

    const cookieStore = await cookies();
    const userData = cookieStore.get('user_data')?.value;
    const { username } = userData ? JSON.parse(userData) : null;

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader className="py-4">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link href="/">
                                <LayoutDashboard />
                                <span>Dashboard</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarSeparator />

            <SidebarContent>
                <Collapsible defaultOpen={true} className="group/collapsible">
                    <SidebarGroup>
                        <CollapsibleTrigger>
                            <SidebarGroupLabel>
                                TODO LIST
                                <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                            </SidebarGroupLabel>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    {todoListLinks.map(todolink => (
                                        <SidebarMenuItem key={todolink.label}>
                                            <SidebarMenuButton asChild>
                                                <Link href={todolink.href}>
                                                    {todolink.icon}
                                                    {todolink.label}
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </CollapsibleContent>
                    </SidebarGroup>
                </Collapsible>
                <Collapsible defaultOpen={true} className="group/collapsible">
                    <SidebarGroup>
                        <CollapsibleTrigger>
                            <SidebarGroupLabel>
                                TODO REPORTS
                                <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                            </SidebarGroupLabel>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    {todoReportLinks.map(todolink => (
                                        <SidebarMenuItem key={todolink.label}>
                                            <SidebarMenuButton asChild>
                                                <Link href={todolink.href}>
                                                    {todolink.icon}
                                                    {todolink.label}
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </CollapsibleContent>
                    </SidebarGroup>
                </Collapsible>
            </SidebarContent>

            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton>
                                    <User2 />{username} <ChevronUp className="ml-auto" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem asChild>
                                    <Link href="/account/settings">
                                        <Settings />
                                        Settings
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={signout}>
                                    <LogOut />
                                    Sign out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}