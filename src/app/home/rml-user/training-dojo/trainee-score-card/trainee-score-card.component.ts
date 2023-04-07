import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { ApiService } from 'src/app/home/api.service';
import { LoaderserviceService } from 'src/app/loaderservice.service';

@Component({
  selector: 'app-trainee-score-card',
  templateUrl: './trainee-score-card.component.html',
  styleUrls: ['./trainee-score-card.component.css']
})
export class TraineeScoreCardComponent implements OnInit {

  idno :any
  data:any 
  constructor(private active: ActivatedRoute, private service : ApiService,public loader:LoaderserviceService) { }

  ngOnInit(): void {

    this.idno = this.active.snapshot.paramMap.get('trainee_idno')

    this.service.traineeScorecard({'trainee_idno': this.idno})
    .subscribe({
      next: (response)=>{console.log('score', response); this.data = response},
      error: (err)=>{console.log(err)}
    })


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


