
import React, { useState, useMemo } from 'react';
import { UserRole, Page } from './types';
import { getNavItemsForRole } from './constants';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './screens/Dashboard';
import Patients from './screens/Patients';
import Appointments from './screens/Appointments';
import Staff from './screens/Staff';

const PlaceholderScreen = ({ pageName }: { pageName: string }) => (
    <div className="flex items-center justify-center h-full bg-gray-100 rounded-lg">
        <div className="text-center p-12 bg-white shadow-lg rounded-xl">
            <h1 className="text-4xl font-bold text-gray-700">{pageName}</h1>
            <p className="mt-4 text-lg text-gray-500">This module is under construction.</p>
        </div>
    </div>
);


const App: React.FC = () => {
    const [currentUserRole, setCurrentUserRole] = useState<UserRole>(UserRole.Admin);
    const [currentPage, setCurrentPage] = useState<Page>(Page.Dashboard);
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const navItems = useMemo(() => getNavItemsForRole(currentUserRole), [currentUserRole]);
    
    const handleRoleChange = (role: UserRole) => {
        setCurrentUserRole(role);
        const newNavItems = getNavItemsForRole(role);
        if (!newNavItems.find(item => item.page === currentPage)) {
            setCurrentPage(newNavItems[0]?.page || Page.Dashboard);
        }
    }

    const renderPage = () => {
        switch (currentPage) {
            case Page.Dashboard:
                return <Dashboard />;
            case Page.Patients:
                return <Patients />;
            case Page.Appointments:
                return <Appointments />;
            case Page.Staff:
                return <Staff />;
            case Page.Billing:
            case Page.Pharmacy:
            case Page.Laboratory:
            case Page.Inpatient:
            case Page.Reports:
                return <PlaceholderScreen pageName={currentPage} />;
            default:
                return <Dashboard />;
        }
    };

    return (
        <div className="flex h-screen bg-gray-100 font-sans">
            <Sidebar 
                navItems={navItems}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                isOpen={isSidebarOpen}
                setIsOpen={setSidebarOpen} 
            />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header 
                    currentPage={currentPage} 
                    currentUserRole={currentUserRole}
                    onRoleChange={handleRoleChange}
                    onMenuClick={() => setSidebarOpen(true)}
                />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4 sm:p-6 lg:p-8">
                    {renderPage()}
                </main>
            </div>
        </div>
    );
};

export default App;
