
import React, { useState, useMemo } from 'react';
import { MOCK_PATIENTS } from '../constants';
import { Patient } from '../types';
import Modal from '../components/Modal';

const Patients: React.FC = () => {
    const [patients, setPatients] = useState<Patient[]>(MOCK_PATIENTS);
    const [searchTerm, setSearchTerm] = useState('');
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    
    const initialFormState = { name: '', age: '', gender: 'Male', phone: '', email: '' };
    const [newPatient, setNewPatient] = useState(initialFormState);

    const filteredPatients = useMemo(() => {
        if (!searchTerm) return patients;
        return patients.filter(patient =>
            patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            patient.phone.includes(searchTerm)
        );
    }, [searchTerm, patients]);
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewPatient(prev => ({ ...prev, [name]: value }));
    };

    const handleAddPatient = (e: React.FormEvent) => {
        e.preventDefault();
        const newPatientRecord: Patient = {
            id: `PID${(patients.length + 10).toString().padStart(3, '0')}`,
            name: newPatient.name,
            age: parseInt(newPatient.age, 10) || 0,
            gender: newPatient.gender as 'Male' | 'Female' | 'Other',
            phone: newPatient.phone,
            email: newPatient.email,
            address: 'N/A',
            bloodGroup: 'N/A',
            registrationDate: new Date().toISOString().split('T')[0],
        };
        setPatients(prev => [newPatientRecord, ...prev]);
        setAddModalOpen(false);
        setNewPatient(initialFormState);
    };

    return (
        <>
            <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                    <h2 className="text-2xl font-semibold text-gray-800">Patient Records</h2>
                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
                        <input
                            type="text"
                            placeholder="Search by name, ID, or phone..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
                        />
                        <button 
                            onClick={() => setAddModalOpen(true)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
                        >
                            Add Patient
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient ID</th>
                                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
                                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
                                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        {filteredPatients.length > 0 ? (
                        <tbody className="divide-y divide-gray-200">
                            {filteredPatients.map((patient) => (
                                <tr key={patient.id} className="hover:bg-gray-50">
                                    <td className="py-4 px-6 whitespace-nowrap text-sm font-medium text-gray-900">{patient.id}</td>
                                    <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-800">{patient.name}</td>
                                    <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-500">{patient.age}</td>
                                    <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-500">{patient.gender}</td>
                                    <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-500">{patient.phone}</td>
                                    <td className="py-4 px-6 whitespace-nowrap text-sm font-medium">
                                        <a href="#" className="text-blue-600 hover:text-blue-900 mr-4">Edit</a>
                                        <a href="#" className="text-red-600 hover:text-red-900">Delete</a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        ) : null}
                    </table>
                     {filteredPatients.length === 0 && (
                        <div className="text-center py-16">
                            <p className="text-gray-500 text-lg font-semibold">No patients found</p>
                            {searchTerm && <p className="text-gray-400 mt-2">Try adjusting your search criteria.</p>}
                        </div>
                    )}
                </div>
            </div>
            
            <Modal isOpen={isAddModalOpen} onClose={() => setAddModalOpen(false)} title="Add New Patient">
                <form onSubmit={handleAddPatient}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                            <input type="text" name="name" id="name" value={newPatient.name} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" required />
                        </div>
                        <div>
                            <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
                            <input type="number" name="age" id="age" value={newPatient.age} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" required />
                        </div>
                        <div>
                             <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
                             <select name="gender" id="gender" value={newPatient.gender} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" required>
                                <option>Male</option>
                                <option>Female</option>
                                <option>Other</option>
                             </select>
                        </div>
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                            <input type="tel" name="phone" id="phone" value={newPatient.phone} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" required />
                        </div>
                         <div className="md:col-span-2">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                            <input type="email" name="email" id="email" value={newPatient.email} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" required />
                        </div>
                    </div>
                    <div className="flex justify-end pt-6 space-x-2">
                        <button type="button" onClick={() => setAddModalOpen(false)} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Save Patient</button>
                    </div>
                </form>
            </Modal>
        </>
    );
};

export default Patients;
