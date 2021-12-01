import { Appointment } from './appointment';

export class Labtechnician {
    AppointmentId: number;
    PatientId: number;
    AppointmentType: string;
    PatientName: string;
    Age: number;
    MobileNo: number;
    Gender: string;
    Address: string;
    EmployeeName: string;
    AppointmentStatus: boolean;
    AppointmentDate: Date = new Date();
}
