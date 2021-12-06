import { AnnouncementService } from './../shared/announcement.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.scss']
})
export class AnnouncementComponent implements OnInit {
  empId: number;

  constructor(
    public announcementService:AnnouncementService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.empId = this.route.snapshot.params['empId'];
  }

  //onSubmit function
  onSubmit(form: NgForm) {
    console.log(form.value);
    let addId = this.announcementService.formData.AnnId;
    //insert
    if (addId == 0 || addId == null) {
      this.insertAnnouncement(form);
    }
  }

  //clear all contents and Initialization
  resetForm(from?: NgForm) {
    if (from != null) {
      from.resetForm();
    }
  }

  //Insert
  insertAnnouncement(form?: NgForm) {
    console.log('Inserting a record...');
    this.announcementService.insertAnnouncement(form.value).subscribe((data) => {
      console.log(data);
      this.toastr.success('Announcement added', 'CMSApp v2021');
      console.log(form.value.RoleId);
      // direct to a route after adding
    });
  }
}
