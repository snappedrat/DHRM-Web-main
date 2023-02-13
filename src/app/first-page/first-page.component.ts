import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-first-page',
  templateUrl: './first-page.component.html',
  styleUrls: ['./first-page.component.css']
})
export class FirstPageComponent implements OnInit {

  constructor() { 
    sessionStorage.clear()
  }

  ngOnInit(): void {
  }

  login()
  {
    sessionStorage.setItem('user', 'emp')
  }
  ars()
  {
    sessionStorage.setItem('user', 'trainee')
  }

}
