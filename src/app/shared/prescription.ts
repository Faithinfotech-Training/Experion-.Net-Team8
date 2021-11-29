import { Employee } from './employee';
import { Patient } from './patient';
export class Prescription {
    PrescriptionId: number;
    DoctorName: string;
    PatientName: string;
    Prescription: string;
    PrescriptionDate: Date = new Date();

    Patient:Patient;
    Employee:Employee;
}
