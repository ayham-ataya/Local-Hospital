
import React, { useState, useMemo } from 'react';
import { MOCK_STAFF } from '../constants';
import { StaffMember, UserRole } from '../types';

const Staff: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredStaff = useMemo(() => {
        if (!searchTerm) return MOCK_STAFF;
        return MOCK_STAFF.filter(staff =>
            staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            staff.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
            staff.role.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm]);

    return (
        <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <h2 className="text-2xl font-semibold text-gray-800">Staff Members</h2>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
                     <input
                        type="text"
                        placeholder="Search by name, role, or department..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
                    />
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200">
                        Add Staff
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Staff ID</th>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    {filteredStaff.length > 0 ? (
                    <tbody className="divide-y divide-gray-200">
                        {filteredStaff.map((staff) => (
                            <tr key={staff.id} className="hover:bg-gray-50">
                                <td className="py-4 px-6 whitespace-nowrap text-sm font-medium text-gray-900">{staff.id}</td>
                                <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-800">{staff.name}</td>
                                <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-500">{staff.role}</td>
                                <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-500">{staff.department}</td>
                                <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-500">{staff.phone}</td>
                                <td className="py-4 px-6 whitespace-nowrap text-sm font-medium">
                                    <a href="#" className="text-blue-600 hover:text-blue-900 mr-4">Edit</a>
                                    <a href="#" className="text-red-600 hover:text-red-900">Delete</a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    ) : null}
                </table>
                 {filteredStaff.length === 0 && (
                    <div className="text-center py-16">
                        <p className="text-gray-500 text-lg font-semibold">No staff members found</p>
                        {searchTerm && <p className="text-gray-400 mt-2">Try adjusting your search criteria.</p>}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Staff;
