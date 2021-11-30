import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-receptionist',
  templateUrl: './receptionist.component.html',
  styleUrls: ['./receptionist.component.scss']
})
export class ReceptionistComponent implements OnInit {

  loggedUserName:string;
  constructor(private authService: AuthService,private router:Router) { }

  ngOnInit(): void {
    this.loggedUserName=localStorage.getItem('Username');
  }
  logOut(){
    this.authService.logout();
    this.router.navigateByUrl('login');
   }

}
