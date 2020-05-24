import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  current: string = "gallery";
  projects: Project[];

  constructor(private http: HttpClient) {
    this.http.get<Project[]>('https://paint-my-site-api-deploy.herokuapp.com/projects').subscribe(data => {
      this.projects = data;
      console.log(this.projects);
      })
     }

  ngOnInit(): void {
  }

  showProjectsByCategory(categoryName: string): void {
    if (categoryName === 'all'){
      this.http.get<Project[]>('https://paint-my-site-api-deploy.herokuapp.com/projects').subscribe(data => {
        this.projects = data;
        })
      }
      else {
        this.http.get<Category[]>('https://paint-my-site-api-deploy.herokuapp.com/categories').subscribe(data => {
          this.projects = data.filter(c => c.name === categoryName)[0].projects;
        })
      }
  }

}
interface Category {
  id: number;
  name: string;
  description: string;
  photoUrl: string;
  projects: Project[];
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