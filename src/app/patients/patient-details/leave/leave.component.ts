import { Component, OnInit } from '@angular/core';
import { MatDatepicker, MatDatepickerInputEvent } from '@angular/material/datepicker';


// import { LeaveReg, LeavePayload } from 'src/app/models/LeaveReg';

import { Store} from '@ngrx/store';
import { PtsState, getLeaveLoading, getLeaveLoaded, getLeaves, getSelectedPt } from '../../patient-store/pts.state';

import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { default as _rollupMoment } from 'moment';
import { MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs';
import { Patient } from 'src/app/models/patient';
import { LoadLeave } from '../../patient-store/actions/leave.actions';
import { LeaveReg, LeavePayload } from 'src/app/models/leaveReg';

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
  selectedPatient: Patient;
  selectedPt$: Observable<Patient>;

  chartRange: string;
  // dataSource = new MatTableDataSource();
  public leaveStart: any;
  public leaveEnd: any;

  dataArray$: Observable<LeaveReg[]>;
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

  loading$ = this.store.select(getLeaveLoading);
  loaded$ = this.store.select(getLeaveLoaded);

  constructor(private store: Store<PtsState>, ) { }

  ngOnInit() {
    this.selectedPt$ = this.store.select(getSelectedPt);
    this.selectedPt$.subscribe(pt => {
      this.selectedPatient = pt;
    });
    this.chartRange = 'Day';
    this.leaveStart = moment().subtract('1', 'days');
    this.leaveEnd = moment();
    this.getData();
  }

  public onRangeChange(val: string) {
    this.chartRange = val;
    this.leaveEnd = moment();
    if (val === 'Day') { this.leaveStart = moment().subtract('1', 'days'); }
    if (val === 'Week') { this.leaveStart = moment().subtract('7', 'days'); }
    if (val === 'Month') { this.leaveStart = moment().subtract('1', 'months'); }
    if (val === 'All') { this.leaveStart = moment('2019-01-01'); }
    this.getData();
  }

  datesChanged(type: string, event: MatDatepickerInputEvent<Date>) {
    if (type === 'start') {
      this.leaveStart = event.value;
    } else if (type === 'end') { this.leaveEnd = event.value; }
    this.getData();
  }

  showDialog(leave: LeaveReg) {

  }

  public getData() {
    this.dataSource = new MatTableDataSource();
    if (this.leaveStart > this.leaveEnd) {
      return;
    }

    const leavePayload: LeavePayload = {
      patientId: this.selectedPatient.PatientId,
      leaveStart: this.leaveStart,
      leaveEnd: this.leaveEnd
    };
    this.store.dispatch(new LoadLeave(leavePayload));


    this.dataArray$ = this.store.select(getLeaves);
    this.dataArray$ .subscribe(o => {
        this.dataSource = new MatTableDataSource(o);
   //     this.dataSource.paginator = this.paginator2;
        // this.dataSource.sort = this.sort2;
        // this.table2.dataSource = this.dataSource;
      });
  }

}
