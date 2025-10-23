
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Card from '../components/Card';
import { PatientIcon, AppointmentIcon, StaffIcon, BillingIcon } from '../components/icons';
import { MOCK_PATIENTS, MOCK_STAFF, MOCK_APPOINTMENTS } from '../constants';

const patientAdmissionsData = [
    { name: 'Jan', patients: 30 }, { name: 'Feb', patients: 45 },
    { name: 'Mar', patients: 60 }, { name: 'Apr', patients: 50 },
    { name: 'May', patients: 70 }, { name: 'Jun', patients: 85 },
];

const departmentData = [
    { name: 'Cardiology', value: 400 }, { name: 'Neurology', value: 300 },
    { name: 'Oncology', value: 250 }, { name: 'Pediatrics', value: 500 },
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];


const Dashboard: React.FC = () => {
    const upcomingAppointments = MOCK_APPOINTMENTS.filter(a => a.status === 'Scheduled').slice(0, 5);

    return (
        <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card title="Total Patients" value={MOCK_PATIENTS.length} icon={PatientIcon} color="bg-blue-500" />
                <Card title="Appointments Today" value={MOCK_APPOINTMENTS.filter(a => a.status === 'Scheduled').length} icon={AppointmentIcon} color="bg-green-500" />
                <Card title="Total Staff" value={MOCK_STAFF.length} icon={StaffIcon} color="bg-yellow-500" />
                <Card title="Revenue (Today)" value="$12,500" icon={BillingIcon} color="bg-red-500" />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                <div className="lg:col-span-3 bg-white p-6 rounded-xl shadow-md">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Patient Admissions</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={patientAdmissionsData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="patients" fill="#3B82F6" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Appointments by Department</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie data={departmentData} cx="50%" cy="50%" labelLine={false} outerRadius={100} fill="#8884d8" dataKey="value">
                                {departmentData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Upcoming Appointments */}
            <div className="bg-white p-6 rounded-xl shadow-md">
                 <h3 className="text-xl font-semibold text-gray-800 mb-4">Upcoming Appointments</h3>
                 <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
                                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {upcomingAppointments.map((app) => (
                                <tr key={app.id} className="hover:bg-gray-50">
                                    <td className="py-4 px-6 whitespace-nowrap text-sm font-medium text-gray-900">{app.patientName}</td>
                                    <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-500">{app.doctorName}</td>
                                    <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-500">{app.date} at {app.time}</td>
                                    <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-500">{app.department}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                 </div>
            </div>
        </div>
    );
};

export default Dashboard;
