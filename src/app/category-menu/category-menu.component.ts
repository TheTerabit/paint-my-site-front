import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-category-menu',
  templateUrl: './category-menu.component.html',
  styleUrls: ['./category-menu.component.css']
})
export class CategoryMenuComponent implements OnInit {

  categories: Category[];
  selected: string;
  @Output()
  category = new EventEmitter<string>();

  constructor(private http: HttpClient) {
    this.http.get<Category[]>('https://paint-my-site-api-deploy.herokuapp.com/categories').subscribe(data => {
      this.categories = data;
      })
      this.selected='all';
     }

  ngOnInit(): void {
  }

  selectCategory(categoryName: string): void {
    this.category.emit(categoryName);
    this.selected=categoryName;
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