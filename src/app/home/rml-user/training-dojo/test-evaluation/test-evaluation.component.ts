import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/home/api.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-test-evaluation',
  templateUrl: './test-evaluation.component.html',
  styleUrls: ['./test-evaluation.component.css']
})
export class TestEvaluationComponent implements OnInit {

  trainee:any
  modules :any
  form :any

  trainee_id :any = ''

  constructor(private service : ApiService, private fb : UntypedFormBuilder, private route: ActivatedRoute, private router: Router) {
    this.form = this.fb.group({
      trainee: ['',Validators.required],
      test : ['',Validators.required],
      module : ['',Validators.required],
      file :[''],
      score :[''],
      pf: [''],
      percent: [''],
      priorityval:[''],
      min_percent:[''],
      plant_code:['']

    })
   }
   filterTrainee: Observable<any[]>;

  ngOnInit(): void {

    this.service.getTrainee()
    .subscribe(
      {
        next: (response)=>{
          console.log('trainee : ', response)
          this.trainee = response
          this.filterTrainee = this.form.get('trainee').valueChanges.pipe(
            startWith(''),
            map((value:any) => this.filterOptions(value))
          );
      },
        error: (error)=> console.log(error)
      }
    )
    
    this.service.getOfflineModules()
    .subscribe(
      {
        next: (response)=>{console.log('trainee : ', response) , this.modules = response},
        error: (error)=> console.log(error)
      }
    )

  }

  filterOptions(value: any): any[] {
    console.log(value, "/////////////////");
    
    const filterValue = value.toLowerCase();
    return this.trainee.filter((trainee:any) => trainee.fullname.toLowerCase().includes(filterValue));
  }

  offline_page()
  {
    if(this.form.controls['score'].value == '' || this.form.controls['score'].value == null)
    {
      alert("please enter mark for the paper")
    }
    else
    {
      var i = this.form.controls['module'].value.split('.')[0]-1
      this.form.controls['pf'].setValue(this.modules[i].pass_criteria <= this.form.controls['score'].value ? 'p' : 'f')
      this.form.controls['priorityval'].setValue(this.modules[i].priorityval)
      this.form.controls['percent'].setValue(((this.form.controls['score'].value) / (this.modules[i].total_marks)) * 100)
      this.form.controls['min_percent'].setValue(this.modules[i].pass_percent)
      this.form.controls['plant_code'].setValue(sessionStorage.getItem('plantcode'))
      console.log(this.form.value)
  
      this.service.offlineUpload(this.form.value)
      .subscribe({
        next: (res) =>{console.log(res);
        alert("Updated Successfully")
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload'
        this.router.navigate(['/rml/training_dojo/test-evaluation'], {relativeTo: this.route})  
        this.form.reset()
        },
        error: (err) => console.log(err) 
      })
    }

  }

  store_trainee(event:any)
  {
    this.trainee_id = event.option.value
    console.log(this.trainee_id);
    
  }

  get_test_status(event:any)
  {

    var value = event.target.value.split('.')[1]
    var obj = {module_name : value, idno : this.trainee_id}
    console.log(obj)
    this.service.get_test_status(obj)
    .subscribe(
      {
        next: (response:any)=>
        {
        console.log(response)
        if(response.status=='already')
        {
          alert("Trainee already finished evauation")
          this.form.reset()
        }
        if(response.status=='exam failed')
        {
          this.form.controls['test'].setValue('post-test')
        }
        else
          this.form.controls['test'].setValue(response.status)
        }
      }
    )

  }

  offline_upload(event:any)
  {
    if(this.form.invalid)
      alert('select the above requirements')
    else
    {
      var exten = event.target.files[0].name.split('.')
      exten = exten.pop()
      var formData = new FormData()
  
      formData.append("file", event.target.files[0], this.trainee_id+'_'+this.form.controls['module'].value+'_'+this.form.controls['test'].value+'.'+exten )
    
      this.service.offline_test(formData)
      .subscribe({
        next:(res) => {console.log(res)
        this.form.controls['file'].setValue(this.trainee_id+'_'+this.form.controls['module'].value+'_'+this.form.controls['test'].value+'.'+exten)},
        error:(err)=> {console.log(err)}
      })
    }


  }
}
