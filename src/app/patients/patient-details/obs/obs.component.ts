import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { Store } from '@ngrx/store';
import { PtsState, getSelectedPt, getObsLoading, getObsLoaded, getObs } from '../../patient-store/pts.state';
import { LoadObs } from '../../patient-store/actions/obs.actions';
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

import { Obs, ObsPayload } from 'src/app/models/obs';
import { dataItem } from '../../../models/data-item';
import { Chart } from 'chart.js';
// import { ObservationService } from 'src/app/services/observation.service';
import { MatDialog } from '@angular/material';
import { DialogComponent } from './dialog/dialog.component';

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

  @ViewChild(MatPaginator, { static: true }) paginator2: MatPaginator;
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
  // obsData: Obs[];
  dataSource = new MatTableDataSource();
  public obsStart: any;
  public obsEnd: any;

  dataArray$: Observable<Obs[]>;
  showTable = true;
  showStatusChart: boolean;
  showLocChart: boolean;
  statusDataItem: dataItem[];
  statusScatterChart: Chart | null;
  chartLoaded = false;
  locDataItem: dataItem[];
  locScatterChart: Chart | null;
  private locChartLoaded = false;
  @ViewChild('placeholder2', { static: true }) elLoc: ElementRef;
  modalDisplay: boolean;
  @ViewChild('placeholder1', { static: false }) elStatus: ElementRef;
  mStatus: string;
  mLocation: string;
  mNotes: string;
  mObsBy: string;
  mDateTime: Date;

loading$: Observable<boolean>;
loaded$: Observable<boolean>;



  constructor(private store: Store<PtsState>, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.selectedPt$ = this.store.select(getSelectedPt);
    this.selectedPt$.subscribe(pt => {
      this.selectedPatient = pt;
    });
    this.chartType = 'Table';
    this.chartRange = 'Day';
    this.obsStart = moment().subtract('1', 'days');
    this.obsEnd = moment();
    this.getData();
    this.dataSource.paginator = this.paginator2;
    this.loading$ = this.store.select(getObsLoading);
    this.loaded$ = this.store.select(getObsLoaded);
  }

  public getData() {
    this.dataSource = new MatTableDataSource();
    if (this.obsStart > this.obsEnd) {
      return;
    }

    const obsPayload: ObsPayload = {
      patientId: this.selectedPatient.PatientId,
      obsStart: this.obsStart,
      obsEnd: this.obsEnd
    };
    this.store.dispatch(new LoadObs(obsPayload));


    this.dataArray$ = this.store.select(getObs);
    this.dataArray$ .subscribe(o => {
        // this.obs1 = o;
        this.dataSource = new MatTableDataSource(o);
        this.dataSource.paginator = this.paginator2;
        // this.dataSource.sort = this.sort2;
        // this.table2.dataSource = this.dataSource;
        this.setChartData(o);
        const test = this.createChart();
        this.setLocChartData(o);
        const test2 = this.createLocChart();
      });
  }

  public onTypeChange(val: string) {
    this.chartType = val;
    this.getData();
    console.log(val);

    if (val === 'obsChart') {
      this.showTable = false;
      this.showLocChart = false;
      this.showStatusChart = true;
    } else if (val === 'Table') {
      this.showTable = true;
      this.showLocChart = false;
      this.showStatusChart = false;
    } else if (val === 'obsLocation') {
      this.showTable = false;
      this.showLocChart = true;
      this.showStatusChart = false;
    }

  }

  public onRangeChange(val: string) {
    this.chartRange = val;
    this.obsEnd = moment();
    if (val === 'Day') { this.obsStart = moment().subtract('1', 'days'); }
    if (val === 'Week') { this.obsStart = moment().subtract('7', 'days'); }
    if (val === 'Month') { this.obsStart = moment().subtract('1', 'months'); }
    if (val === 'All') { this.obsStart = moment('2019-01-01'); }
    this.getData();
  }

  datesChanged(type: string, event: MatDatepickerInputEvent<Date>) {
    if (type === 'start') {
      this.obsStart = event.value;
    } else if (type === 'end') { this.obsEnd = event.value; }

    this.getData();
  }

  // -----------------------------------
  setChartData(data: Obs[]) {
    this.statusDataItem = [];
    if (data === null || data === undefined) {
      this.chartLoaded = false;
      return;
    }

    let yValue = 0;
    data.forEach(element => {
      switch (element.Status) {
        case 'On Leave':
          yValue = 1;
          break;
        case 'Sleeping':
          yValue = 2;
          break;
        case 'Euthymic':
          yValue = 3;
          break;
        case 'Anxious':
          yValue = 4;
          break;
        case 'Agitated':
          yValue = 5;
          break;
        case 'Aggressive':
          yValue = 6;
          break;
        case 'Secluded':
          yValue = 7;
          break;
        default:
          yValue = 0;

      }

      this.statusDataItem.push({
        x: new Date(element.ObsTime + 'Z'),
        y: yValue, notes: element.Notes,
        loc: element.ObsLocation, obsBy: element.SeenBy, status: element.Status
      });
    });
    // ........
  }


  // create chart
  async createChart() {

    if (this.statusScatterChart !== undefined) {
      this.statusScatterChart.destroy();
    }

    let ctx = document.getElementById('canvas');


    if (ctx !== null) {
      await ctx.remove();
    }
    this.chartLoaded = true;
    this.elStatus.nativeElement.innerHTML =
      ' <div [hidden]="!chartLoaded" style="height:300px;width:900px;"><canvas id="canvas">{{scatterChart}}</canvas></div>';
    // '<div [hidden]="chartLoaded" >No Data Loaded!</div>';

    ctx = await document.getElementById('canvas');


    if (ctx) { // ensure canvas is ready
      const self = this;
      this.chartLoaded = false;
      this.statusScatterChart = new Chart(ctx, {
        type: 'scatter',
        data: {
          datasets: [{
            label: 'Observation',
            pointBackgroundColor: 'red',
            pointRadius: 5,
            data: this.statusDataItem
          }]
        }
        ,
        options: {
          tooltips: {
            callbacks: {
              label(tooltipItem, data) {
                const label = data.datasets[0].data[tooltipItem.index].loc;
                return label;
              },
              afterLabel(tooltipItem, data) {
                let footer = '';
                footer = data.datasets[0].data[tooltipItem.index].notes;
                if (footer == null) {
                  footer = 'No notes available';
                }
                if (footer.length > 40) {
                  footer = footer.substring(0, 40) + '...';
                }
                return [footer];
              }

            }
          },
          legend: {
            display: false,
          },
          scales: {
            yAxes: [{
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Status'
              },
              ticks: {
                min: 0,
                max: 7,
                stepSize: 1,
                suggestedMin: 0,
                suggestedMax: 6.1,
                callback(label, index, labels) {
                  switch (label) {
                    case 0:
                      return '';
                    case 1:
                      return 'On Leave';
                    case 2:
                      return 'Sleeping';
                    case 3:
                      return 'Euthymic';
                    case 4:
                      return 'Anxious';
                    case 5:
                      return 'Agitated';
                    case 6:
                      return 'Aggressive';
                    case 7:
                      return 'Secluded';
                  }
                }
              },
              gridLines: {
                display: true
              }
            }],
            xAxes: [{
              ticks: {
                minRotation: 45,
                suggestedMax: new Date(Date.now()),
              },
              type: 'time',
              time: {
                displayFormats: {
                  millisecond: 'MMM DD HH:mm',
                  second: 'MMM DD HH:mm',
                  minute: 'MMM DD HH:mm',
                  hour: 'MMM DD HH:mm',
                  day: 'MMM DD HH:mm',
                  week: 'MMM DD HH:mm',
                  month: 'MMM DD HH:mm',
                  quarter: 'MMM DD HH:mm',
                  year: 'MMM DD HH:mm',
                }
              }
            }]

          },
          onClick(e) {
            const element = this.getElementAtEvent(e);
            if (element.length) {
              self.showDialog(element[0]._chart.tooltip._data.datasets[0].data[element[0]._index]);
            }
          },
        }

      });

    }

    this.chartLoaded = true;
    return true;

  }

  // ------ location chart setup -------------------------

  setLocChartData(data: Obs[]) {
    this.locDataItem = [];
    if (data === null || data === undefined) {
      this.locChartLoaded = false;
      return;
    }

    let yValue = 0;
    data.forEach(element => {
      switch (element.ObsLocation) {
        case 'Bedroom':
          yValue = 0;
          break;
        case 'Bathroom':
          yValue = 1;
          break;
        case 'Communinal Area':
          yValue = 2;
          break;
        case 'Activity Room':
          yValue = 3;
          break;
        case 'Garden':
          yValue = 4;
          break;
        case 'Off Ward':
          yValue = 5;
          break;
        case 'On Leave':
          yValue = 6;
      }

      this.locDataItem.push({
        x: new Date(element.ObsTime + 'Z'),
        y: yValue, notes: element.Notes, status: element.Status, obsBy: element.SeenBy, loc: element.ObsLocation
      });
    });

  }
  // create chart
  async createLocChart() {

    if (this.locScatterChart !== undefined) {
      this.locScatterChart.destroy();
    }

    let ctx = document.getElementById('loc-canvas');

    if (ctx !== null) {
      await ctx.remove();
    }

    this.elLoc.nativeElement.innerHTML =
      '<div [hidden]="!chartLoaded" style="height:300px;width:900px"><canvas id="loc-canvas">{{locScatterChart}}</canvas></div>';
    // '<div [hidden]="chartLoaded" >No Data Loaded!</div>';

    ctx = await document.getElementById('loc-canvas');


    if (ctx) { // ensure canvas is ready
      const self = this;

      this.locChartLoaded = false;
      const locScatterChart = new Chart(ctx, {
        type: 'scatter',
        data: {
          datasets: [{
            label: 'Observation',
            pointBackgroundColor: 'red',
            pointRadius: 5,
            data: this.locDataItem
          }]
        },
        options: {
          tooltips: {
            callbacks: {
              label(tooltipItem, data) {
                const label = data.datasets[0].data[tooltipItem.index].status;
                return label;
              },
              afterLabel(tooltipItem, data) {
                let footer = '';
                footer = data.datasets[0].data[tooltipItem.index].notes;
                if (footer == null) {
                  footer = 'No notes available';
                }
                if (footer.length > 40) {
                  footer = footer.substring(0, 40) + '...';
                }
                return [footer];
              }
            }
          },
          legend: {
            display: false,
          },
          scales: {
            yAxes: [{
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Location'
              },
              ticks: {
                min: 0,
                max: 7,
                stepSize: 1,
                suggestedMin: 0,
                suggestedMax: 6.1,
                callback(label, index, labels) {
                  switch (label) {
                    case 0:
                      return 'Bedroom';
                    case 1:
                      return 'Bathroom';
                    case 2:
                      return 'Communinal Area';
                    case 3:
                      return 'Activity Room';
                    case 4:
                      return 'Garden';
                    case 5:
                      return 'Off Ward';
                    case 6:
                      return 'On Leave';
                  }
                }
              },
              gridLines: {
                display: true
              }
            }],
            xAxes: [{
              ticks: {
                minRotation: 45,
                suggestedMax: new Date(Date.now()),
              },
              type: 'time',
              time: {
                displayFormats: {
                  millisecond: 'MMM DD HH:mm',
                  second: 'MMM DD HH:mm',
                  minute: 'MMM DD HH:mm',
                  hour: 'MMM DD HH:mm',
                  day: 'MMM DD HH:mm',
                  week: 'MMM DD HH:mm',
                  month: 'MMM DD HH:mm',
                  quarter: 'MMM DD HH:mm',
                  year: 'MMM DD HH:mm',
                }
              }
            }]

          },
          onClick(e) {
            const element = this.getElementAtEvent(e);
            if (element.length) {
              self.showDialog(element[0]._chart.tooltip._data.datasets[0].data[element[0]._index]);
            }
          },
        }
      });
    }
    this.locChartLoaded = true;
    return true;
  }

  showDialog(data: dataItem) {
    this.dialog.open(DialogComponent, { data });
  }

  showDialog1(obs: Obs) {
    const data: dataItem = {
      status: obs.Status,
      loc: obs.ObsLocation,
      obsBy: obs.SeenBy,
      x: obs.ObsTime,
      notes: obs.Notes,
      y: null
    };
    this.dialog.open(DialogComponent, { data });
  }

}
