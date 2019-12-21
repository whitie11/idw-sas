import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
// import { PatientsWardistDataSource, PatientsWardistItem } from './patients-wardist-datasource';

import { Store } from '@ngrx/store';
import { getTest, selectPtsState, PtsState, getWardName, State, getPtsWard } from '../patient-store/pts.state';
import { Observable } from 'rxjs';
import { LoadPts } from '../patient-store/actions/pts.actions';
import { Patient } from 'src/app/models/patient';

import * as moment from 'moment';

export interface PatientsWardistItem {
  FirstName: string;
  PatientId: number;
}



@Component({
  selector: 'app-patients-wardist',
  templateUrl: './patients-wardist.component.html',
  styleUrls: ['./patients-wardist.component.css']
})
export class PatientsWardistComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatTable, { static: false }) table: MatTable<PatientsWardistItem>;

  dataSource: Observable<PatientsWardistItem[]>;
  wardName$: Observable<string>;
  selectedWardName: string;
  wardList$: Observable<Patient[]>;

  constructor(private store: Store<State>) { }

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = [
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

  ngOnInit() {


    //  this.table.dataSource = this.wardList$;
    //  this.wardList$.subscribe((list) => {
    //      console.log('Wardlist = ' + list);
    //      this.dataSource = list;
    //      this.table.dataSource = list;

    //  });
    this.wardName$ = this.store.select(getWardName);
    console.log('Ward name = ' + this.wardName$);
    this.wardName$.subscribe((ward) => {
      this.selectedWardName = ward;
    });



    this.store.dispatch(new LoadPts(this.selectedWardName));

  }

  ngAfterViewInit() {
    // this.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator;
    // this.table.dataSource = this.dataSource;
    this.wardName$ = this.store.select(getWardName);
    this.table.dataSource = this.store.select(getPtsWard);
  }

  leaveStatus(pt: Patient) {
    if (pt.Leave &&  pt.Leave.IsCurrent) {
      return true;
    } else { return false; }
  }

  retDate(pt: Patient) {
    if (pt.Leave && pt.Leave.IsCurrent) {
      if (typeof pt.Leave.TimeRetDue === undefined) {
        return 'No Date Set';
      }
      return moment(pt.Leave.TimeRetDue + 'Z').format('HH:mm DD/MM/YYYY');
    }
    return null;
  }

  changeColour(pt: Patient) {
    if (pt.Leave &&  pt.Leave.IsCurrent) {
      return 'LightBlue';
    }
    const obsTime1 = new Date(pt.LastSeen);
    const now = new Date();
    const due = new Date(now.setMinutes(now.getMinutes() - 30));
    if (obsTime1 < due) {
      return 'LightPink';
    } else { return 'White'; }
  }

  retDateColour(pt: Patient) {

    if (pt.Leave && pt.Leave.IsCurrent ) {
        if (new Date(pt.Leave.TimeRetDue) < new Date() ) {
            return 'LightPink';
            }

  } else { return 'White' ; }
}
}
