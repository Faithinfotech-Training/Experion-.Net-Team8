import { PaymentService } from './../shared/payment.service';
import { Payment } from './../shared/payment';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  payId: number;
  payment: Payment = new Payment();
  constructor(
    public payService: PaymentService,
    private toastrService: ToastrService,
    private router: Router,
    private route: ActivatedRoute)
   {}

  ngOnInit(): void {
 //get departments
 this.payService.BindCmbPatients();
 
 this.payId = this.route.snapshot.params['paymentId'];
 console.log("payId"+this.payId);
 //this.resetform()
 if (this.payId != 0 || this.payId != null) {
   //getPayment
   this.payService.getPaymentById(this.payId).subscribe((data) => {
     console.log(data);
     var datePipe = new DatePipe('en-UK');
     let formatedDate: any = datePipe.transform(
       data.PaymentDate,
       'yyyy-MM-dd'
     );
     data.PaymentDate = formatedDate;
     this.payService.formData = data;
     this.payService.formData = Object.assign({}, data);
   });
 }
  }
  onSubmit(form: NgForm) {
    console.log(form.value);
    let addId = this.payService.formData.PaymentId;
    if (addId == 0 || addId == null) {
      //Insert
      this.insertPayment(form);
    } else {
      console.log('Updating record...');
      //Update

      this.updatePayment(form);
    }

  }
 

  //Clear all content at Initialization

  resetForm(form?: NgForm) {
    if (form != null) {
      form.resetForm();
    }
  }

  //Insert

  insertPayment(form?: NgForm) {
    console.log('Inserting a record...');

    this.payService.insertPayment(form.value).subscribe((result) => {
      console.log(result);

      this.resetForm(form);

      this.toastrService.success(
        'Payment record has been inserted',
        'Clinic v2021'
      );
    });
  }

  //Update

  updatePayment(form?: NgForm) {
    console.log('Updating a record...');

    this.payService.updatePayment(form.value).subscribe((result) => {
      console.log(result);

      this.resetForm(form);

      this.toastrService.success(
        'Payment record has been updated',
        'Clinic v2021'
      );
    });

   // window.location.reload();
  }

}
