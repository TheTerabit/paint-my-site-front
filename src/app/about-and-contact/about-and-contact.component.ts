import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-about-and-contact',
  templateUrl: './about-and-contact.component.html',
  styleUrls: ['./about-and-contact.component.css']
})
export class AboutAndContactComponent implements OnInit {

  user: User;

  constructor(private http: HttpClient) {
    this.http.get<User>('https://paint-my-site-api-deploy.herokuapp.com/user').subscribe(data => {
      this.user = data;
      })
    }

  ngOnInit(): void {
  }

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
