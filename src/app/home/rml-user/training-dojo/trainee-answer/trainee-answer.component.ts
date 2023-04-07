import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/home/api.service';
import { LoaderserviceService } from 'src/app/loaderservice.service';

@Component({
  selector: 'app-trainee-answer',
  templateUrl: './trainee-answer.component.html',
  styleUrls: ['./trainee-answer.component.css']
})
export class TraineeAnswerComponent implements OnInit {

  idno:any
  module:any
  data:any
  slno:any
  status:any

  constructor(private active:ActivatedRoute, private service: ApiService,public loader:LoaderserviceService) {
    this.idno = this.active.snapshot.paramMap.get('trainee_idno')
    this.module = this.active.snapshot.paramMap.get('module_name')
    this.slno = this.active.snapshot.paramMap.get('slno')
   }

  ngOnInit(): void {

    this.service.traineeAnswers({'idno': this.idno, 'module':this.module, slno:this.slno})
    .subscribe({
      next: (response:any)=>
      {
        console.log('asnwers', response); 
        this.data = response[0]
        this.status = response[1]

        if(this.status.status == 'OFFLINE')
        {
          this.data[0].question = 'This is an Offline exam'
        }
      },
      error: (err)=>{console.log(err)}
    })

  }

}
