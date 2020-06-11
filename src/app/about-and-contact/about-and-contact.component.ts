import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-about-and-contact',
  templateUrl: './about-and-contact.component.html',
  styleUrls: ['./about-and-contact.component.css']
})
export class AboutAndContactComponent implements OnInit {

  user: User;
  email: Email = new Email();

  constructor(private http: HttpClient) {
    this.http.get<User>('https://paint-my-site-api.herokuapp.com/user').subscribe(data => {
      this.user = data;
      })
    }

  ngOnInit(): void {
  }

  sendEmail(email: Email) {
    this.email = new Email();
    console.log(email);
    let sent = document.getElementById('sent');
    sent.innerHTML = "E-mail has been sent!";
    this.http.post('https://paint-my-site-api.herokuapp.com/user/send-email', email).subscribe(data =>
      {
        console.log("success");
      });
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

class Email {
  name: string;
  email: string;
  message: string;
}
