
import { UserRole, Page, Patient, StaffMember, Appointment, NavItem } from './types';
import { DashboardIcon, PatientIcon, AppointmentIcon, StaffIcon, BillingIcon, PharmacyIcon, LabIcon, InpatientIcon, ReportsIcon } from './components/icons';

export const MOCK_PATIENTS: Patient[] = [
  { id: 'PID001', name: 'John Doe', age: 45, gender: 'Male', phone: '123-456-7890', email: 'john.doe@example.com', address: '123 Main St, Anytown', bloodGroup: 'O+', registrationDate: '2023-10-15' },
  { id: 'PID002', name: 'Jane Smith', age: 32, gender: 'Female', phone: '234-567-8901', email: 'jane.smith@example.com', address: '456 Oak Ave, Anytown', bloodGroup: 'A-', registrationDate: '2023-11-01' },
  { id: 'PID003', name: 'Mike Johnson', age: 51, gender: 'Male', phone: '345-678-9012', email: 'mike.j@example.com', address: '789 Pine Ln, Anytown', bloodGroup: 'B+', registrationDate: '2023-11-20' },
  { id: 'PID004', name: 'Emily Davis', age: 28, gender: 'Female', phone: '456-789-0123', email: 'emily.d@example.com', address: '101 Maple Dr, Anytown', bloodGroup: 'AB+', registrationDate: '2024-01-05' },
  { id: 'PID005', name: 'Chris Lee', age: 65, gender: 'Male', phone: '567-890-1234', email: 'chris.lee@example.com', address: '212 Birch Rd, Anytown', bloodGroup: 'O-', registrationDate: '2024-02-12' },
];

export const MOCK_STAFF: StaffMember[] = [
  { id: 'SID001', name: 'Dr. Alice Williams', role: UserRole.Doctor, department: 'Cardiology', phone: '987-654-3210', email: 'alice.w@hospital.com', shift: 'Day' },
  { id: 'SID002', name: 'Dr. Bob Brown', role: UserRole.Doctor, department: 'Neurology', phone: '876-543-2109', email: 'bob.b@hospital.com', shift: 'Night' },
  { id: 'SID003', name: 'Nurse Carol White', role: UserRole.Nurse, department: 'General Ward', phone: '765-432-1098', email: 'carol.w@hospital.com', shift: 'Day' },
  { id: 'SID004', name: 'David Green', role: UserRole.Receptionist, department: 'Front Desk', phone: '654-321-0987', email: 'david.g@hospital.com', shift: 'Evening' },
  { id: 'SID005', name: 'Eve Black', role: UserRole.Pharmacist, department: 'Pharmacy', phone: '543-210-9876', email: 'eve.b@hospital.com', shift: 'Day' },
  { id: 'SID006', name: 'Frank Hill', role: UserRole.Admin, department: 'Administration', phone: '432-109-8765', email: 'frank.h@hospital.com', shift: 'Day' },
];

export const MOCK_APPOINTMENTS: Appointment[] = [
  { id: 'APP001', patientId: 'PID001', patientName: 'John Doe', doctorId: 'SID001', doctorName: 'Dr. Alice Williams', department: 'Cardiology', date: '2024-08-01', time: '10:00 AM', status: 'Scheduled' },
  { id: 'APP002', patientId: 'PID002', patientName: 'Jane Smith', doctorId: 'SID002', doctorName: 'Dr. Bob Brown', department: 'Neurology', date: '2024-08-01', time: '11:30 AM', status: 'Scheduled' },
  { id: 'APP003', patientId: 'PID003', patientName: 'Mike Johnson', doctorId: 'SID001', doctorName: 'Dr. Alice Williams', department: 'Cardiology', date: '2024-08-02', time: '09:00 AM', status: 'Completed' },
  { id: 'APP004', patientId: 'PID004', patientName: 'Emily Davis', doctorId: 'SID001', doctorName: 'Dr. Alice Williams', department: 'Cardiology', date: '2024-08-03', time: '02:00 PM', status: 'Scheduled' },
  { id: 'APP005', patientId: 'PID001', patientName: 'John Doe', doctorId: 'SID002', doctorName: 'Dr. Bob Brown', department: 'Neurology', date: '2024-08-05', time: '01:00 PM', status: 'Cancelled' },
];

const allNavItems: NavItem[] = [
    { page: Page.Dashboard, icon: DashboardIcon },
    { page: Page.Appointments, icon: AppointmentIcon },
    { page: Page.Patients, icon: PatientIcon },
    { page: Page.Staff, icon: StaffIcon },
    { page: Page.Billing, icon: BillingIcon },
    { page: Page.Pharmacy, icon: PharmacyIcon },
    { page: Page.Laboratory, icon: LabIcon },
    { page: Page.Inpatient, icon: InpatientIcon },
    { page: Page.Reports, icon: ReportsIcon },
];

export const ROLE_NAV_CONFIG: Record<UserRole, Page[]> = {
  [UserRole.Admin]: [Page.Dashboard, Page.Patients, Page.Appointments, Page.Staff, Page.Billing, Page.Pharmacy, Page.Laboratory, Page.Inpatient, Page.Reports],
  [UserRole.Doctor]: [Page.Dashboard, Page.Appointments, Page.Patients, Page.Inpatient, Page.Reports],
  [UserRole.Nurse]: [Page.Dashboard, Page.Appointments, Page.Patients, Page.Inpatient],
  [UserRole.Receptionist]: [Page.Dashboard, Page.Appointments, Page.Patients, Page.Billing],
  [UserRole.Pharmacist]: [Page.Dashboard, Page.Pharmacy],
  [UserRole.LabTechnician]: [Page.Dashboard, Page.Laboratory],
  [UserRole.Accountant]: [Page.Dashboard, Page.Billing, Page.Reports],
};

export const getNavItemsForRole = (role: UserRole): NavItem[] => {
  const allowedPages = ROLE_NAV_CONFIG[role];
  return allNavItems.filter(item => allowedPages.includes(item.page));
};
