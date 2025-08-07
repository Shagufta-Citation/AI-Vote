
import React from 'react';
import { Idea } from '../types';
import DownloadIcon from './icons/DownloadIcon';

interface ExportButtonProps {
    ideas: Idea[];
}

const ExportButton: React.FC<ExportButtonProps> = ({ ideas }) => {
    const exportToCsv = () => {
        if (ideas.length === 0) return;

        const headers = [
            'ID', 'Title', 'Description', 'Votes', 'Category', 'Themes',
            'Author Name', 'Author Email', 'Author Team', 'Author Division', 'Created At'
        ];

        const escapeCsvCell = (cellData: any): string => {
            const stringData = String(cellData);
            if (stringData.includes(',') || stringData.includes('"') || stringData.includes('\n')) {
                return `"${stringData.replace(/"/g, '""')}"`;
            }
            return stringData;
        };

        const rows = ideas.map(idea => [
            idea.id,
            idea.title,
            idea.description,
            idea.votes,
            idea.category,
            idea.themes.join('; '), // Join themes with a semicolon
            idea.authorName,
            idea.authorEmail,
            idea.authorTeam,
            idea.authorDivision,
            idea.createdAt.toISOString()
        ].map(escapeCsvCell));

        const csvContent = [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
        
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        if (link.href) {
            URL.revokeObjectURL(link.href);
        }
        link.href = URL.createObjectURL(blob);
        link.download = `idea_export_${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <button
            onClick={exportToCsv}
            disabled={ideas.length === 0}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Export current view to CSV"
        >
            <DownloadIcon className="w-5 h-5" />
            <span className="hidden sm:inline">Export CSV</span>
        </button>
    );
};

export default ExportButton;
