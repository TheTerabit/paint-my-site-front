import { Component, OnInit, Inject } from '@angular/core';
import { RestapiService } from '../restapi.service';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {

  user: User = new User();

  constructor(private service: RestapiService,  @Inject(LOCAL_STORAGE) private storage: StorageService, private router: Router) { }

  ngOnInit(): void {
    if(this.storage.get('logged') !='yes')
      this.router.navigate(['login']);
    else {
      this.service.getUser().subscribe(data => {
        this.user = data;
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