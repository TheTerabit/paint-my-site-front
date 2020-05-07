import { Component, OnInit, Inject } from '@angular/core';
import { RestapiService } from '../restapi.service';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  logged: boolean = false;

  constructor(private service: RestapiService,  @Inject(LOCAL_STORAGE) private storage: StorageService, private router: Router) { }

  ngOnInit(): void {
    if(this.storage.get('logged') !='yes')
      this.router.navigate(['login']);
  }

}
