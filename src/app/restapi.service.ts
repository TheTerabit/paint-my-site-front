import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import {Router} from '@angular/router';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestapiService {

  constructor(private http: HttpClient, @Inject(LOCAL_STORAGE) private storage: StorageService, private router: Router) { }

  public setCredentials(username: string, password: string) {
    this.storage.set('username', username);
    this.storage.set('password', password);
    console.log(this.storage.get('username'));
    console.log(this.storage.get('password'));
  }

  public login(username: string, password: string): boolean {
    console.log(username, password);
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(username+":"+password)});
    this.http.post<Response>('https://paint-my-site-api.herokuapp.com/user', null, {headers}).subscribe(data =>
    {
      this.storage.set('logged', 'yes');
      this.router.navigate(['dashboard']);
    },
    error =>  {
      console.log('oops', error);
      this.storage.set('logged', 'no');
      this.router.navigate(['login']);

    }
    );
    return true;
  }
  public getUser(): Observable<User> {
    return this.http.get<User>('https://paint-my-site-api.herokuapp.com/user');
  }

  public updateUser(user: User) {
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(this.storage.get('username')+":"+this.storage.get('password'))});
    return this.http.put('https://paint-my-site-api.herokuapp.com/user', user, {headers});
  }

  public getCategories() {
    return this.http.get<Category[]>('https://paint-my-site-api.herokuapp.com/categories');
  }
  public getProjects() {
    return this.http.get<Project[]>('https://paint-my-site-api.herokuapp.com/projects');
  }
  public getPhotos() {
    return this.http.get<Photo[]>('https://paint-my-site-api.herokuapp.com/photos');
  }

  public createCategory(category: Category) {
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(this.storage.get('username')+":"+this.storage.get('password'))});
    return this.http.post('https://paint-my-site-api.herokuapp.com/categories', category, {headers});
  }

  public updateCategory(category: Category) {
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(this.storage.get('username')+":"+this.storage.get('password'))});
    return this.http.put('https://paint-my-site-api.herokuapp.com/categories/' + category.id, category, {headers});
  }

  public deleteCategory(id: number) {
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(this.storage.get('username')+":"+this.storage.get('password'))});
    return this.http.delete('https://paint-my-site-api.herokuapp.com/categories/' + id, {headers});
  }

  
  public createProject(project: Project) {
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(this.storage.get('username')+":"+this.storage.get('password'))});
    return this.http.post('https://paint-my-site-api.herokuapp.com/projects', project, {headers});
  }

  public updateProject(project: Project) {
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(this.storage.get('username')+":"+this.storage.get('password'))});
    return this.http.put('https://paint-my-site-api.herokuapp.com/projects/' + project.id, project, {headers});
  }

  public deleteProject(id: number) {
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(this.storage.get('username')+":"+this.storage.get('password'))});
    return this.http.delete('https://paint-my-site-api.herokuapp.com/projects/' + id, {headers});
  }
  

  /*
  const currentTodoList = this.storage.get(STORAGE_KEY);
        
  this.storage.set(STORAGE_KEY, currentTodoList);

  */
}
interface Response {
  login: string;
}

interface User {
  name: string;
  surname: string;
  jobTitle: string;
  aboutMe: string;
  phoneNumber: string;
  email: string;
  profilePictureUrl: string;
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