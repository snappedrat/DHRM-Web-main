import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/home/api.service';

@Component({
  selector: 'app-trainee-answer',
  templateUrl: './trainee-answer.component.html',
  styleUrls: ['./trainee-answer.component.css']
})
export class TraineeAnswerComponent implements OnInit {

  idno:any
  module:any
  data:any

  constructor(private active:ActivatedRoute, private service: ApiService) {
    this.idno = this.active.snapshot.paramMap.get('trainee_idno')
    this.module = this.active.snapshot.paramMap.get('module_name')
   }

  ngOnInit(): void {

    this.service.traineeAnswers({'idno': this.idno, 'module':this.module})
    .subscribe({
      next: (response)=>{console.log('asnwers', response); this.data = response},
      error: (err)=>{console.log(err)}
    })

  }

}
