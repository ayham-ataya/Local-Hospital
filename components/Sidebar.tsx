
import React from 'react';
import { Page, NavItem } from '../types';
import { LogoIcon } from './icons';

interface SidebarProps {
    navItems: NavItem[];
    currentPage: Page;
    setCurrentPage: (page: Page) => void;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const SidebarNav: React.FC<{
    navItems: NavItem[];
    currentPage: Page;
    handleNavigation: (page: Page) => void;
}> = ({ navItems, currentPage, handleNavigation }) => (
    <nav className="flex-1 px-4 py-4">
        <ul>
            {navItems.map((item) => (
                <li key={item.page}>
                    <a
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            handleNavigation(item.page);
                        }}
                        className={`flex items-center py-3 px-4 my-1 rounded-lg transition-colors duration-200 ${
                            currentPage === item.page
                                ? 'bg-blue-600 text-white shadow-md'
                                : 'text-gray-600 hover:bg-gray-200 hover:text-gray-800'
                        }`}
                    >
                        <item.icon className="h-5 w-5 mr-3" />
                        <span>{item.page}</span>
                    </a>
                </li>
            ))}
        </ul>
    </nav>
);


const Sidebar: React.FC<SidebarProps> = ({ navItems, currentPage, setCurrentPage, isOpen, setIsOpen }) => {

    const handleNavigation = (page: Page) => {
        setCurrentPage(page);
        if (isOpen) {
            setIsOpen(false);
        }
    };

    const sidebarContent = (
         <div className="flex flex-col w-64 bg-white h-full shadow-lg">
            <div className="flex items-center justify-center h-20 border-b flex-shrink-0">
                <LogoIcon className="h-10 w-10 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-800 ml-2">HMS</h1>
            </div>
            <SidebarNav navItems={navItems} currentPage={currentPage} handleNavigation={handleNavigation} />
        </div>
    );

    return (
        <>
            {/* Static sidebar for medium and up */}
            <div className="hidden md:flex flex-shrink-0">
                {sidebarContent}
            </div>

             {/* Mobile sidebar with transition */}
            <div
                className={`fixed inset-y-0 left-0 z-40 transform transition-transform duration-300 ease-in-out md:hidden ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                {sidebarContent}
            </div>

            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
                    onClick={() => setIsOpen(false)}
                ></div>
            )}
        </>
    );
};

export default Sidebar;
