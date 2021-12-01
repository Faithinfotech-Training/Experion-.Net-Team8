import { Appointment } from './appointment';
export class Doctor {
   AppointmentId:number;
   AppointmentType: string;
   PatientName:string;
   Age:number;
   MobileNo: number;
   Gender:string;
   Address:string;
   EmployeeName:string;
   AppointmentStatus:boolean;
   AppointmentDate: Date = new Date();
}
