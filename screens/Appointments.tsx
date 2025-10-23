
import React, { useState, useMemo } from 'react';
import { MOCK_APPOINTMENTS } from '../constants';
import { Appointment } from '../types';

const getStatusColor = (status: 'Scheduled' | 'Completed' | 'Cancelled') => {
    switch (status) {
        case 'Scheduled': return 'bg-blue-100 text-blue-800';
        case 'Completed': return 'bg-green-100 text-green-800';
        case 'Cancelled': return 'bg-red-100 text-red-800';
    }
};

const Appointments: React.FC = () => {
    const [filter, setFilter] = useState<'all' | 'Scheduled' | 'Completed' | 'Cancelled'>('all');

    const filteredAppointments = useMemo(() => {
        if (filter === 'all') return MOCK_APPOINTMENTS;
        return MOCK_APPOINTMENTS.filter(app => app.status === filter);
    }, [filter]);

    return (
        <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <h2 className="text-2xl font-semibold text-gray-800">Appointment Schedule</h2>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
                     <select 
                        value={filter}
                        onChange={(e) => setFilter(e.target.value as any)}
                        className="px-4 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="all">All Statuses</option>
                        <option value="Scheduled">Scheduled</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                     </select>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200">
                        Book Appointment
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    {filteredAppointments.length > 0 ? (
                    <tbody className="divide-y divide-gray-200">
                        {filteredAppointments.map((app) => (
                            <tr key={app.id} className="hover:bg-gray-50">
                                <td className="py-4 px-6 whitespace-nowrap text-sm font-medium text-gray-900">{app.patientName}</td>
                                <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-800">{app.doctorName}</td>
                                <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-500">{app.department}</td>
                                <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-500">{app.date} at {app.time}</td>
                                <td className="py-4 px-6 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(app.status)}`}>
                                        {app.status}
                                    </span>
                                </td>
                                <td className="py-4 px-6 whitespace-nowrap text-sm font-medium">
                                    <a href="#" className="text-blue-600 hover:text-blue-900 mr-4">Reschedule</a>
                                    <a href="#" className="text-red-600 hover:text-red-900">Cancel</a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    ) : null}
                </table>
                 {filteredAppointments.length === 0 && (
                    <div className="text-center py-16">
                        <p className="text-gray-500 text-lg font-semibold">No appointments found</p>
                        <p className="text-gray-400 mt-2">Try selecting a different status.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Appointments;
