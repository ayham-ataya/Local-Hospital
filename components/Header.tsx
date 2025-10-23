
import React from 'react';
import { UserRole, Page } from '../types';
import { MenuIcon } from './icons';

interface HeaderProps {
    currentPage: Page;
    currentUserRole: UserRole;
    onRoleChange: (role: UserRole) => void;
    onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, currentUserRole, onRoleChange, onMenuClick }) => {
    return (
        <header className="flex justify-between items-center h-20 px-4 sm:px-6 bg-white border-b flex-shrink-0">
            <div className="flex items-center">
                 <button 
                    onClick={onMenuClick} 
                    className="md:hidden mr-4 text-gray-600 hover:text-gray-800"
                    aria-label="Open menu"
                >
                    <MenuIcon className="h-6 w-6" />
                </button>
                <h1 className="text-xl sm:text-3xl font-semibold text-gray-800">{currentPage}</h1>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
                <span className="hidden sm:inline text-sm text-gray-600">Viewing as:</span>
                <select 
                    value={currentUserRole} 
                    onChange={(e) => onRoleChange(e.target.value as UserRole)}
                    className="p-2 border rounded-md bg-white text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    aria-label="Change user role"
                >
                    {Object.values(UserRole).map(role => (
                        <option key={role} value={role}>{role}</option>
                    ))}
                </select>
            </div>
        </header>
    );
};

export default Header;
