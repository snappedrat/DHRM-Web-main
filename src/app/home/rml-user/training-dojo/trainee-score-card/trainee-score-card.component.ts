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
  dummy :any = [
    {
      module_attended:'Induction Training',
      minpassp:"80.00",
      pts:"5.00",
      pts1:"10.00",
      ptp:"0.00",
      ptpt:"50.00",
      ptp1:"100.00",
      prepf:"Fail",
      postpf:"Pass",
      post1pf:"pass"
    },
    {
      module_attended:'safety',
      minpassp:"80.00",
      pts:"5.00",
      pts1:"10.00",
      ptp:"0.00",
      ptpt:"50.00",
      ptp1:"100.00",
      prepf:"Fail",
      postpf:"Pass",
      post1pf:"pass"
    },
    {
      module_attended:'SS',
      minpassp:"80.00",
      pts:"5.00",
      pts1:"10.00",
      ptp:"0.00",
      ptpt:"50.00",
      ptp1:"100.00",
      prepf:"Fail",
      postpf:"Pass",
      post1pf:"pass"
    },
    {
      module_attended:'Fundamental',
      minpassp:"80.00",
      pts:"5.00",
      pts1:"10.00",
      ptp:"0.00",
      ptpt:"50.00",
      ptp1:"100.00",
      prepf:"Fail",
      postpf:"Pass",
      post1pf:"pass"
    },
  ]
}


