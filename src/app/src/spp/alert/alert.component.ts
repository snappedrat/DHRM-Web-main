import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  @Input() type: string;
  @Output() onclose= new EventEmitter <any>();
  constructor() { }

  ngOnInit(): void {
  }
  close(){
    this.onclose.emit();
  }

}
