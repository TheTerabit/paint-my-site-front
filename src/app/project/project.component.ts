import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  project: Project;

  constructor(private route: ActivatedRoute, private http: HttpClient) {
    let projectName = this.route.snapshot.paramMap.get('projectName');
    this.http.get<Project[]>('https://paint-my-site-api-deploy.herokuapp.com/projects').subscribe(data => {
      this.project = data.filter(p => p.name === projectName)[0];
      })
}
  ngOnInit(): void {
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