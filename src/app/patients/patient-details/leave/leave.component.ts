import { Component, OnInit } from '@angular/core';
import { MatDatepicker, MatDatepickerInputEvent } from '@angular/material/datepicker';


import { LeaveReg } from 'src/app/models/LeaveReg';

import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { default as _rollupMoment } from 'moment';
import { MatTableDataSource } from '@angular/material';

const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'DD/MM/YYYY',
    monthYearA11yLabel: 'YYYY',
  },
};

@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.css'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class LeaveComponent implements OnInit {
  chartRange: string;
  // dataSource = new MatTableDataSource();
  public leaveStart: any;
  public leaveEnd: any;

  dataSource = new MatTableDataSource();

  leaveTableColumns: string[] = [
    // 'ObsId',
    'TimeOut',
    'Type',
    'Description',
    'IsCurrent',
    'TimeRetDue',
    'TimeRetActual'
  ];

  constructor() { }

  ngOnInit() {
    this.chartRange = 'Day';
    this.leaveStart = moment().subtract('1', 'days');
    this.leaveEnd = moment();
    const data: LeaveReg[] = [
  {
    LeaveId: 1,
    PatientId: 1,
    Type: 'Leave type',
    Description: 'What they are wearing!',
    IsCurrent: false,
    TimeOut: null,
    TimeRetDue: null,
    TimeRetActual: null
  }
];
    this.dataSource = new MatTableDataSource(data);
  }

  public onRangeChange(val: string) {
    this.chartRange = val;
    this.leaveEnd = moment();
    if (val === 'Day') { this.leaveStart = moment().subtract('1', 'days'); }
    if (val === 'Week') { this.leaveStart = moment().subtract('7', 'days'); }
    if (val === 'Month') { this.leaveStart = moment().subtract('1', 'months'); }
    if (val === 'All') { this.leaveStart = moment('2019-01-01'); }
   // this.getData();
  }

  datesChanged(type: string, event: MatDatepickerInputEvent<Date>) {
    if (type === 'start') {
      this.leaveStart = event.value;
    } else if (type === 'end') { this.leaveEnd = event.value; }

  //  this.getData();
  }

  showDialog(leave: LeaveReg) {

  }

}
