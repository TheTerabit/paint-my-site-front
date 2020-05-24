import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  constructor(private http: HttpClient) {
    this.http.get<User>('https://paint-my-site-api-deploy.herokuapp.com/user').subscribe(data => {
      this.user = data;
      })
     }


  ngOnInit(): void {
  }
  
  user: User;
  

}

interface User {
  name: string;
  surname: string;
  jobTitle: string;
  aboutMe: string;
  phoneNumber: string;
  email: string;
  profilePictureUrl: string;
}
