import { Component, OnInit, ViewChild } from '@angular/core';

import { Store } from '@ngrx/store';
import { State, getSelectedPt } from '../../patient-store/pts.state';
import { Observable } from 'rxjs';
import { Patient } from 'src/app/models/patient';

import { MatDatepicker, MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';

import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { default as _rollupMoment } from 'moment';
import { Obs } from 'src/app/models/obs';
import { ObservationService } from 'src/app/services/observation.service';

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
  selector: 'app-obs',
  templateUrl: './obs.component.html',
  styleUrls: ['./obs.component.css'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class ObsComponent implements OnInit {
  selectedPatient: Patient;
  selectedPt$: Observable<Patient>;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort2: MatSort;
  @ViewChild(MatTable, { static: true }) table2: MatTable<Obs>;

  obsTableColumns: string[] = [
    // 'ObsId',
    'ObsTime',
    'ObsLocation',
    'Status',
    'SeenBy',
    'Notes',
  ];

  chartType: string;
  chartRange: string;
  public obs1: Obs[];
  dataSource = new MatTableDataSource(this.obs1);
  public obsStart: any;
  public obsEnd: any;

  constructor(private obsService: ObservationService, private store: Store<State>) {
  }

  ngOnInit() {
    this.selectedPt$ = this.store.select(getSelectedPt);
    this.selectedPt$.subscribe(pt => {
      this.selectedPatient = pt;
    });
    this.chartType = 'Table';
    this.chartRange = 'All';
    this.obsStart = moment('2019-01-01');
    this.obsEnd = moment();
    this.getData();
  }

  public getData() {
    this.obsService.getObsRange2(this.selectedPatient.PatientId, this.obsStart, this.obsEnd).subscribe(o => {
      this.obs1 = [];
      this.obs1 = o;
      this.dataSource = new MatTableDataSource(o);
      // this.dataSource.sort = this.sort2;
      // this.table2.dataSource = this.dataSource;
      // this.setChartData(o);
      // const test = this.createChart();
      // this.setLocChartData(o);
      // const test2 = this.createLocChart();
    });
  }

  public onTypeChange(val: string) {
    this.chartType = val;
    if (this.obsStart > this.obsEnd) {
      return;
    }
    this.getData();
    console.log(val);
  }

  public onRangeChange(val: string) {
 this.chartRange = val;
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    if (type == 'start') {
      this.obsStart = event.value;
    }
    else if (type == 'end')
      this.obsEnd = event.value;
  }

}
