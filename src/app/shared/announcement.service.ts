import { HttpClient } from '@angular/common/http';
import { Announcement } from './announcement';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {
  formData : Announcement = new Announcement();
  announcements : Announcement[];

  constructor(private httpClient: HttpClient) { 
    
  }

  getAnnouncements(){
    this.httpClient
      .get(environment.apiUrl + '/api/roles')
      .toPromise()
      .then((response) => (this.announcements = response as Announcement[]));
  }

  //insert announcement
  insertAnnouncement(announcement: Announcement): Observable<any> {
    return this.httpClient.post(
      environment.apiUrl + '/api/employee/AddEmployee',
      announcement
    );
  }

  
}
