import { Briefcase, CalendarClock, CalendarDays, CalendarRange, ChevronsRight, Code, ListTodo, ScrollText, UserLock } from "lucide-react";

export const statusColor = {
    backlog: "bg-muted text-muted-foreground",
    progress: "bg-muted text-muted-foreground",
    done: "bg-muted text-muted-foreground",
    // progress: "bg-yellow-100 text-yellow-800",
    // done: "bg-green-100 text-green-800",
};

export const categoryColor = {
    personal: "bg-green-300 text-green-600 dark:text-green-900",
    work: "bg-sky-300 text-sky-900",
    development: "bg-purple-300 text-purple-900",
};

export const todoListLinks = [
    {
        label: "Upcoming",
        icon: <ChevronsRight />,
        href: "/todos?period=upcoming&status=backlog&status=progress",
        colorKey: "",
    },
    {
        label: "Today",
        icon: <CalendarClock />,
        href: "/todos?period=today&status=backlog&status=progress",
        colorKey: "",
    },
    // {
    //     label: "Personal",
    //     icon: <UserLock />,
    //     href: "/todos?category=personal",
    //     colorKey: "bg-green-300 text-green-600 dark:text-green-900 rounded-sm",
    // },
    // {
    //     label: "Work",
    //     icon: <Briefcase />,
    //     href: "/todos?category=work",
    //     colorKey: "bg-sky-300 text-sky-900 rounded-sm",
    // },
    // {
    //     label: "Development",
    //     icon: <Code />,
    //     href: "/todos?category=development",
    //     colorKey: "bg-purple-300 text-purple-900 rounded-sm",
    // },
    {
        label: "Tasks",
        icon: <ListTodo />,
        href: "/todos",
        colorKey: "bg-purple-300 text-purple-900 rounded-sm",
    },
]

export const todoReportLinks = [
    {
        label: "Daily",
        icon: <CalendarDays />,
        href: "/todos/report/daily",
        colorKey: "",
    },
    {
        label: "Weekly",
        icon: <CalendarRange />,
        href: "/todos/report/weekly",
        colorKey: "",
    },
]

export const limits = [5, 10, 25]

