import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-hr-view-data',
  templateUrl: './hr-view-data.component.html',
  styleUrls: ['./hr-view-data.component.css']
})
export class HrViewDataComponent implements OnInit {

  var1: any = 'AHAMED'
  uniqueId :any = {'mobile':''}

  constructor(private http: HttpClient, private active : ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  }

  approved()
  {
      this.uniqueId.mobile = this.active.snapshot.paramMap.get('mobile');

      console.log(this.uniqueId);

      this.http
      .post('http://localhost:3000/approved', this.uniqueId)
      .subscribe({
        next: (response) =>{ console.log(response);},
        error: (error) => console.log(error),
      })
      window.alert("Application has been approved")
      this.router.navigate(['rml/new_joiners/hr-approval'])

  }

  rejected()
  {
    this.uniqueId.mobile = this.active.snapshot.paramMap.get('mobile');

    console.log(this.uniqueId);

    this.http
    .post('http://localhost:3000/rejected', this.uniqueId)
    .subscribe({
      next: (response) =>{ console.log(response);},
      error: (error) => console.log(error),
    })
    window.alert("Application has been rejected")
    this.router.navigate(['rml/new_joiners/hr-approval'])
  }
}
