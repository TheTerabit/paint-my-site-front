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
  
  
  logged: boolean = false;
  changedUser: User;
  

  constructor(private service: RestapiService,  @Inject(LOCAL_STORAGE) private storage: StorageService, private router: Router) { }

  ngOnInit(): void {
    
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
class Category {
  id: number;
  name: string;
  description: string;
  photoUrl: string;
  projects: Project[];
}
class NewCategory {
  name: string;
  description: string;
  photoUrl: string;
}
interface Project {
id: number;
name: string;
description: string;
photos: Photo[];
categoryId: number;
}

interface Photo {
id: number;
url: string;
orderInProject: number;
projectId: number;
}