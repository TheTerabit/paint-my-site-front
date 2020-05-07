import { Component, OnInit, Inject } from '@angular/core';
import { RestapiService } from '../restapi.service';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-settings',
  templateUrl: './project-settings.component.html',
  styleUrls: ['./project-settings.component.css']
})
export class ProjectSettingsComponent implements OnInit {

  projects: Project[];
  newProject: NewProject = new NewProject();

  constructor(private service: RestapiService,  @Inject(LOCAL_STORAGE) private storage: StorageService, private router: Router) { }

  ngOnInit(): void {
    
    if(this.storage.get('logged') !='yes')
      this.router.navigate(['login']);
    else {
      this.getProjects();
    }
  }

  
  getProjects() {
    this.service.getProjects().subscribe(data => {
      this.projects = data;
      this.newProject = new NewProject();
    });
  }

  createProject(project: Project){
    this.service.createProject(project).subscribe(data =>
      {
        console.log("success");
        this.getProjects();
      });
  }

  updateProject(project: Project){
    this.service.updateProject(project).subscribe(data =>
      {
        console.log("success");
        this.getProjects();
      });
  }

  deleteProject(id: number) {
    this.service.deleteProject(id).subscribe(error =>
      {
        console.log(error);
        this.getProjects();
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
class Project {
id: number;
name: string;
description: string;
photos: Photo[];
categoryId: number;
}

class NewProject {
  name: string;
  description: string;
  categoryId: number;
  }

interface Photo {
id: number;
url: string;
orderInProject: number;
projectId: number;
}