import { Component, OnInit, Inject } from '@angular/core';
import { RestapiService } from '../restapi.service';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-photo-settings',
  templateUrl: './photo-settings.component.html',
  styleUrls: ['./photo-settings.component.css']
})
export class PhotoSettingsComponent implements OnInit {

  photos: Photo[];
  newPhoto: NewPhoto = new NewPhoto();

  constructor(private service: RestapiService,  @Inject(LOCAL_STORAGE) private storage: StorageService, private router: Router) { }

  ngOnInit(): void {
    if(this.storage.get('logged') !='yes')
      this.router.navigate(['login']);
    else {
      this.getPhotos();
    }
  }

  getPhotos() {
    this.service.getPhotos().subscribe(data => {
      this.photos = data;
      this.newPhoto = new NewPhoto();
    });
  }

  createPhoto(photo: Photo) {
    console.log(photo);
    this.service.createPhoto(photo).subscribe(data =>
      {
        console.log("success");
        this.getPhotos();
      });
  }

  updatePhoto(photo: Photo) {
    this.service.updatePhoto(photo).subscribe(data =>
      {
        console.log("success");
        this.getPhotos();
      });
  }

  deletePhoto(id: number) {
    this.service.deletePhoto(id).subscribe(error =>
      {
        console.log(error);
        this.getPhotos();
      });
  }
}

class Photo {
id: number;
url: string;
orderInProject: number;
projectId: number;
}

class NewPhoto {
  url: string;
  orderInProject: number;
  projectId: number;
  }
