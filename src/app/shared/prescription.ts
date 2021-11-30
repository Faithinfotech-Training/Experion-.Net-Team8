import { Employee } from './employee';
import { Patient } from './patient';
export class Prescription {
    PrescriptionId: number;
    EmployeeId: number;
    PatientId: number;
    Prescription: string;
    PrescriptionDate: Date = new Date();

    Patient:Patient;
    Employee:Employee;
}
