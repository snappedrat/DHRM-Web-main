import { Component, OnInit,ChangeDetectionStrategy, ViewEncapsulation,} from '@angular/core';
import { MatMonthView } from '@angular/material/datepicker';
import {CalendarEvent,CalendarMonthViewBeforeRenderEvent,
  CalendarWeekViewBeforeRenderEvent,
  CalendarDayViewBeforeRenderEvent, CalendarView, CalendarMonthViewDay} from "angular-calendar";
import { isSunday, isWednesday, isWeekend } from 'date-fns';
import { HttpClient } from '@angular/common/http';

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

  events: CalendarEvent[] = []

  // attData: any[] = [  
  //   {
  //     "year":2022,
  //     "month":9,
  //     "date":24,
  //     "status":"OD",
  //     "in_time" : '10:00AM',
  //     "out_time" : '5:00PM'
  //   },
  //   {
  //     "year":2022,
  //     "month":9,
  //     "date":2,
  //     "status":"absent",
  //     "in_time" : '10:00AM',
  //     "out_time" : '5:00PM'
  //   },
  //   {
  //     "year":2022,
  //     "month":9,
  //     "date":7,
  //     "status":"permission",
  //     "in_time" : '10:00AM',
  //     "out_time" : '5:00PM'
  //   },
  //   {
  //     "year":2022,
  //     "month":9,
  //     "date":9,
  //     "status":"leave",
  //     "in_time" : '10:00AM',
  //     "out_time" : '5:00PM'
  //   },
  //   {
  //     "year":2022,
  //     "month":9,
  //     "date":30,
  //     "status":"holiday",
  //   },
  //   {
  //     "year":2022,
  //     "month":9,
  //     "date":23,
  //     "status":"OD",
  //   },
  // ]

   in_time = '10:00am'
   out_time = '5:00pm'
    a = "IN_OUT_TIME"
  constructor(private http: HttpClient) { }

  ngOnInit(): void {

  }

  setView(view: CalendarView) {
    this.view = view;
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    console.log(events);
    this.title = events;
    //this.openAppointmentList(date)
  }

  beforeMonthViewRender(renderEvent: CalendarMonthViewBeforeRenderEvent): void
   {

    renderEvent.body.forEach((day) => {

      const attData: any[] = [  
        {
          "year":2022,
          "month":9,
          "date":24,
          "status":"OD",
          "in_time" : '10:00AM',
          "out_time" : '5:00PM'
        },
        {
          "year":2022,
          "month":9,
          "date":2,
          "status":"absent",
          "in_time" : '10:00AM',
          "out_time" : '5:00PM'
        },
        {
          "year":2022,
          "month":9,
          "date":7,
          "status":"permission",
          "in_time" : '10:00AM',
          "out_time" : '5:00PM'
        },
        {
          "year":2022,
          "month":9,
          "date":9,
          "status":"leave",
          "in_time" : '10:00AM',
          "out_time" : '5:00PM'
        },
        {
          "year":2022,
          "month":9,
          "date":30,
          "status":"holiday",
        },
        {
          "year":2022,
          "month":9,
          "date":23,
          "status":"OD",
        },
      ]

      const dayOfWeek = day.date.getDay();
      const dayOfMonth = day.date.getDate();
      const monthofYear = day.date.getMonth();
      if (day.isWeekend) {
        day.cssClass = 'bg-dg';
        console.log(day);
      }
      else {
        day.cssClass = 'bg-green';
      }

      // if(holidaysDate.includes(dayOfMonth) && holidaysMonth.includes(monthofYear+1)){
      //   day.cssClass = 'bg-red';
      // }
      for( var i = 0; i < attData.length; i++){
        switch (attData[i].status)
        {
          case "OD":
          {
            if(attData[i].month == monthofYear+1 && attData[i].date == dayOfMonth)
            {
              day.cssClass = 'bg-purple';
            }
            break
          }
          case "absent":
            {
              if(attData[i].month == monthofYear+1 && attData[i].date == dayOfMonth)
              {
                day.cssClass = 'bg-red';
              }
              break
            }
          case "leave":
             {
              if(attData[i].month == monthofYear+1 && attData[i].date == dayOfMonth)
              {
                day.cssClass = 'bg-magenta';
              }
              break
            }
          case "permission":
              {
               if(attData[i].month == monthofYear+1 && attData[i].date == dayOfMonth)
              {
                 day.cssClass = 'bg-orange';
               }
               break
              }
              case "holidays":
                {
                 if(attData[i].month == monthofYear+1 && attData[i].date == dayOfMonth)
                {
                   day.cssClass = 'bg-blue';
                 }
                }
        }
        if (day.isWeekend) {
          day.cssClass = 'bg-dg';
          console.log(day);
        }

        if(day.isWeekend){
          const a = "IN_OUT_TIME"
        }
        else{
          const a = "NO_IN_OUT_TIME"
        }
        
      }

    });
  }

   
}
