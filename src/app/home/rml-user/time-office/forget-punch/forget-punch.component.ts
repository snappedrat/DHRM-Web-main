import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forget-punch',
  templateUrl: './forget-punch.component.html',
  styleUrls: ['./forget-punch.component.css']
})
export class ForgetPunchComponent implements OnInit {
    selectedDate: Date = new Date();

  constructor() { }

  ngOnInit(): void {
  }

}
