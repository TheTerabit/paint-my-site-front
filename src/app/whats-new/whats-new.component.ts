import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-whats-new',
  templateUrl: './whats-new.component.html',
  styleUrls: ['./whats-new.component.css']
})
export class WhatsNewComponent implements OnInit {

  projects: Project[];

  constructor(private http: HttpClient) {
    this.http.get<Project[]>('https://paint-my-site-api.herokuapp.com/projects').subscribe(data => {
      this.projects = data.reverse().slice(0,4);
      console.log(this.projects);
      })
     }
  
  ngOnInit(): void {
  }

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