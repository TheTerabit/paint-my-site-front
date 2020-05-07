import { Component, OnInit, Inject, Input } from '@angular/core';
import { RestapiService } from '../restapi.service';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Router } from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @Input()
  current: string = "dashboard";
  
  user: User = new User();
  logged: boolean = false;
  changedUser: User;

  constructor(private service: RestapiService,  @Inject(LOCAL_STORAGE) private storage: StorageService, private router: Router) { }

  ngOnInit(): void {
    if(this.storage.get('logged') !='yes')
      this.router.navigate(['login']);
    else {
      this.service.getUser().subscribe(data => {
        this.user = data;
        this.changedUser = data;
      });
    }
  }
  updateUser() {
    this.service.updateUser(this.user).subscribe(data =>
      {
        console.log("success");
      });
  }

}

class User {
  name: string;
  surname: string;
  jobTitle: string;
  aboutMe: string;
  phoneNumber: string;
  email: string;
  profilePictureUrl: string;
}