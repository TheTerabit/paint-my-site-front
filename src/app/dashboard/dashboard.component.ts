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
  newCategory: NewCategory = new NewCategory();
  user: User = new User();
  logged: boolean = false;
  changedUser: User;
  categories: Category[];
  projects: Project[];
  photos: Photo[];

  constructor(private service: RestapiService,  @Inject(LOCAL_STORAGE) private storage: StorageService, private router: Router) { }

  ngOnInit(): void {
    if(this.storage.get('logged') !='yes')
      this.router.navigate(['login']);
    else {
      this.service.getUser().subscribe(data => {
        this.user = data;
      });

      this.service.getCategories().subscribe(data => {
        this.categories = data;
      });

      this.service.getProjects().subscribe(data => {
        this.projects = data;
      });

      this.service.getPhotos().subscribe(data => {
        this.photos = data;
      });

    }
  }
  updateUser() {
    this.service.updateUser(this.user).subscribe(data =>
      {
        console.log("success");
      });
  }

  getCategories() {
    this.service.getCategories().subscribe(data => {
      this.categories = data;
      this.newCategory = new NewCategory();
    });
  }

  createCategory(category: Category) {
    category.id=null;
    category.projects=null;
    console.log(category);
    this.service.createCategory(category).subscribe(data =>
      {
        console.log("success");
        this.getCategories();
      });
  }

  updateCategory(category: Category) {
    this.service.updateCategory(category).subscribe(data =>
      {
        console.log("success");
        this.getCategories();
      });
  }
  deleteCategory(id: number) {
    this.service.deleteCategory(id).subscribe(error =>
      {
        console.log(error);
        this.getCategories();
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