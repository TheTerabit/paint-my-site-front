import { Component, OnInit, Inject } from '@angular/core';
import { RestapiService } from '../restapi.service';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-settings',
  templateUrl: './category-settings.component.html',
  styleUrls: ['./category-settings.component.css']
})
export class CategorySettingsComponent implements OnInit {

  newCategory: NewCategory = new NewCategory();
  categories: Category[];


  constructor(private service: RestapiService,  @Inject(LOCAL_STORAGE) private storage: StorageService, private router: Router) { }


  ngOnInit(): void {
    if(this.storage.get('logged') !='yes')
      this.router.navigate(['login']);
    else {
      this.service.getCategories().subscribe(data => {
        this.categories = data;
      });
    }
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