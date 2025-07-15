import { AppSidebar } from "@/components/AppSidebar";
import Navbar from "@/components/Navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { UserProvider } from "@/lib/context/UserContext";
import { cookies } from "next/headers"

export default async function DashboardLayout({ children }) {

    const cookieStore = await cookies()
    const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"

    const userData = cookieStore.get("user_data")?.value;
    const user = userData ? JSON.parse(userData) : null;

    return (
        <SidebarProvider defaultOpen={defaultOpen}>
            <UserProvider initialUser={user}>
                <AppSidebar />
                <main className="w-full min-h-full">
                    <Navbar />
                    <div className="px-4">
                        {children}
                        <Toaster />
                    </div>
                </main>
            </UserProvider>
        </SidebarProvider>
    );
}
