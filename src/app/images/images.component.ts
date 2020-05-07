import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit {

  @Input()
  projects = []

  constructor() { }

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