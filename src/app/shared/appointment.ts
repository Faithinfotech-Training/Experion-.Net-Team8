import { Patient } from './patient';
export class Appointment {
    AppoinmentId: number;
    AppoinmentDate: Date = new Date();
    PatientId: number;



    //object oriented model
    Patient:Patient;

}
