import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trainee-score-card',
  templateUrl: './trainee-score-card.component.html',
  styleUrls: ['./trainee-score-card.component.css']
})
export class TraineeScoreCardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
dummy1 :any =[
  {
    sno:"1",
    module_name:"safety",
    question:"What is the company emergancy number? (A)108 (B)176 (C)188 (D)101",
    correctans:"B",
    ptans:"D",
    potans:"B",
    pot1ans:"",
    ptscore:"",
    potscore:"",
    pot1score:"",
  }
]
}
