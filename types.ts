// FIX: Import React to resolve 'Cannot find namespace React' error.
import React from 'react';

export enum UserRole {
  Admin = 'Admin',
  Doctor = 'Doctor',
  Nurse = 'Nurse',
  Receptionist = 'Receptionist',
  Pharmacist = 'Pharmacist',
  LabTechnician = 'Lab Technician',
  Accountant = 'Accountant',
}

export enum Page {
  Dashboard = 'Dashboard',
  Patients = 'Patients',
  Appointments = 'Appointments',
  Staff = 'Staff',
  Billing = 'Billing',
  Pharmacy = 'Pharmacy',
  Laboratory = 'Laboratory',
  Inpatient = 'Inpatient',
  Reports = 'Reports',
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  phone: string;
  email: string;
  address: string;
  bloodGroup: string;
  registrationDate: string;
}

export interface StaffMember {
  id: string;
  name: string;
  role: UserRole;
  department: string;
  phone: string;
  email: string;
  shift: 'Day' | 'Night' | 'Evening';
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  department: string;
  date: string;
  time: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled';
}

export interface NavItem {
  page: Page;
  icon: React.ComponentType<{ className?: string }>;
}
