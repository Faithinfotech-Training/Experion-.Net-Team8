// import { Appointmenttypes } from './appointmenttypes';

// import { Employee } from './employee';
// import { Patient } from './patient';
export class Appointment {
    AppointmentId: number =0;
    AppointmentDate: Date = new Date();
    PatientId: number;
    EmployeeId: number;
    AppointmentStatus: boolean = false;
    AppointmentTypeId:number;



    // //object oriented model
    // Patient:Patient;
    // Employee:Employee;
    // Appointmenttypes:Appointmenttypes;

}
