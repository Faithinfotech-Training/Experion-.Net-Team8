import { Appoinmenttypes } from './appoinmenttypes';
import { Employee } from './employee';
import { Patient } from './patient';
export class Appointment {
    AppoinmentId: number;
    AppoinmentDate: Date = new Date();
    PatientId: number;
    EmployeeId: number;
    AppointmentStatus: boolean = false;
    AppointmentTypeId:number;



    //object oriented model
    Patient:Patient;
    Employee:Employee;
    Appoinmenttypes:Appoinmenttypes;

}
