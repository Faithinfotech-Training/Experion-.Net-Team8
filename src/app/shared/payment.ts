import {Patient } from "./patient";

export class Payment {
    PaymentId :number=0;
    Amount :number=0;
    PatientId:number;
    PatientName:string;
    PaymentDate=new Date;
}
