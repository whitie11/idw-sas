import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
// import { PatientsWardistDataSource, PatientsWardistItem } from './patients-wardist-datasource';

import { Store } from '@ngrx/store';
import { getTest, selectPtsState, PtsState, getWardName, State, getPtsWard} from '../patient-store/pts.state';
import { Observable } from 'rxjs';
import { LoadPts } from '../patient-store/actions/pts.actions';
import { Patient } from 'src/app/models/patient';

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
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatTable, {static: false}) table: MatTable<PatientsWardistItem>;

  dataSource: Observable<PatientsWardistItem[]>;
  wardName$: Observable<string>;
  selectedWardName: string;
  wardList$: Observable<Patient[]>;

  constructor(private store: Store<State>) { }

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['PatientId', 'FirstName'];

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
}
