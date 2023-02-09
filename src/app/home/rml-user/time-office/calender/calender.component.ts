import { Component, OnInit,ChangeDetectionStrategy, ViewEncapsulation,} from '@angular/core';
import { MatMonthView } from '@angular/material/datepicker';
import {CalendarEvent,CalendarMonthViewBeforeRenderEvent,
  CalendarWeekViewBeforeRenderEvent,
  CalendarDayViewBeforeRenderEvent, CalendarView, CalendarMonthViewDay} from "angular-calendar";
import { isSunday, isWednesday, isWeekend } from 'date-fns';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { ApiService } from 'src/app/home/api.service';

interface MyEvent extends CalendarEvent {
  in_time: string;
  out_time: string
}

@Component({
  selector: 'app-calender',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css']
})

export class CalenderComponent implements OnInit {

  title:any[];
  viewDate: Date = new Date();
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;

  evnt: CalendarEvent[] = []

  events: MyEvent[] = [{
    title: 'title',
    start: new Date('2023-02-12'),
    in_time: '1',
    out_time: '2',
  },{
    title: 'title',
    start: new Date('2023-02-13'),
    in_time: '3',
    out_time: '4',
  }]

   in_time = '10:00am'
   out_time = '5:00pm'
    a:any = "IN_OUT_TIME"
  date: string | null;
  constructor(private http: HttpClient, private service: ApiService) { }

  ngOnInit(): void {

  }

  setView(view: CalendarView) {
    this.view = view;
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    console.log(events);
    this.title = events;
  }

  attData: any[] = [ ]

  getDates()
  {
    this.date = new DatePipe('en-US').transform(this.viewDate, 'yyyy/MM')
    console.log(this.date)

    this.service.calendar({id: sessionStorage.getItem('user_name'), date: this.date})
    .subscribe(
      {
        next: (response:any)=>
        {
          console.log(response); this.attData = response
          this.events = []
          for(var i=0; i<this.attData.length; i++)
          {
            var form = 
            {
              title: 'title',
              start: new Date(this.attData[i].att_date),
              in_time: this.attData[i].in_time,
              out_time: this.attData[i].in_time
            }
            this.events.push(form)
          }
            var date:Date = new Date()
            var events:CalendarEvent<any>[] = this.evnt
            this.dayClicked({date, events})

            const element = document.getElementById("yes");

            if (element) 
            {
              element.dispatchEvent(new MouseEvent("click", { bubbles: true }));
            }          
          }
        }
    )

  }

  beforeMonthViewRender(renderEvent: CalendarMonthViewBeforeRenderEvent): void
   {

    renderEvent.body.forEach((day) => {

      const dayOfWeek = day.date.getDay();
      const dayOfMonth = day.date.getDate();
      const monthofYear = day.date.getMonth();

      for( var i = 0; i < this.attData.length; i++)
      {
        var x = new Date(this.attData[i].att_date)
        var date = x.getDate()
        var month = x.getMonth()
        switch (this.attData[i].present)
        {
          case "Present":
          {
            if(month == monthofYear && date == dayOfMonth)
            {
              day.cssClass = 'bg-green';
            }
          break;
          }
          case "Absent":
            {
              if(month == monthofYear && date == dayOfMonth)
              {
                day.cssClass = 'bg-red';
              }
            break;
            }
          case "Comp Off":
             {
              if(month == monthofYear && date == dayOfMonth)
              {
                day.cssClass = 'bg-purple';
              }
              break;
            }
          case "Holiday":
              {
               if(month == monthofYear && date == dayOfMonth)
              {
                 day.cssClass = 'bg-dg';
               }
               break;
              }
              case "Factory Holiday":
                {
                 if(month == monthofYear && date == dayOfMonth)
                {
                   day.cssClass = 'bg-blue';
                 }
                 break;
                }
        }
        // if (day.isWeekend) {
        //   day.cssClass = 'bg-dg';
        // }

        // if(day.isWeekend){
        //   this.a = "IN_OUT_TIME"
        // }
        // else{
        //   this.a = "NO_IN_OUT_TIME"
        // }
        
      }

    });
  }

   
}
