import { Component, OnInit } from '@angular/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {default as _rollupMoment} from 'moment';

const moment = _rollupMoment || _moment;

const obsTableColumns = [
  'PatientId',
  'FirstName',
  'MidName',
  'LastName',
  'NHSno',
  'Birthdate',
  'OnWard',
  'LastSeen',
  'RetDue'
];

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
  selector: 'app-obs',
  templateUrl: './obs.component.html',
  styleUrls: ['./obs.component.css'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
  
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class ObsComponent implements OnInit {

  public chartType: string;
  chartRange: string;
  constructor() { 
  }

  ngOnInit() {
  }

  public onValChange(val: string) {
    this.chartType = val;
    console.log(val);
  }

  public onRangeChange(val: string) {
    this.chartRange = val;
  }

}
