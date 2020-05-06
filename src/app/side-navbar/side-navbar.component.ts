import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.css']
})
export class SideNavbarComponent implements OnInit {

  @Input()
  current: string;

  constructor() {
   }

  ngOnInit(): void {
  }

}
