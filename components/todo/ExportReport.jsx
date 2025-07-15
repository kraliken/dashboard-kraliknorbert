"use client"

import { Download } from 'lucide-react'
import { exportDailyTodos, exportWeeklyTodos } from '@/lib/actions/todo.actions';
import { useState } from 'react';
import { Button } from '../ui/button';

const ExportReport = ({ title, type }) => {

    const [isLoading, setIsLoading] = useState(false)

    const handleDownload = async () => {
        try {
            setIsLoading(true)
            const data = type === "daily" ? await exportDailyTodos() : await exportWeeklyTodos()

            const blob = new Blob([data], {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            });

            const url = window.URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = url;
            a.download = `${type}_report_${new Date().toISOString().slice(0, 10)}.xlsx`;
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        } catch (err) {
            console.error('Download failed:', err);
        } finally {
            setIsLoading(false)
        }
    };

    return (
        <Button
            onClick={() => handleDownload()}
            disabled={isLoading}
        >
            <Download className="w-4 h-4 mr-0 sm:mr-1" />
            <span className='hidden sm:inline'>
                {isLoading ? `${title}ing...` : title}
            </span>
        </Button>
    )
}

export default ExportReport