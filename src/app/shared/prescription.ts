import { Employee } from './employee';
import { Patient } from './patient';
export class Prescription {
  PrescriptionId: number;
  Prescription: string;
  PrescriptionDate: Date = new Date();
  EmployeeId: number;
  PatientId: number;

  Patient: Patient;
  Employee: Employee;
}
