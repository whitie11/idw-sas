import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getPts, selectPtsState, PtsState, getWardName } from '../patient-store/pts.state';
import { Observable } from 'rxjs';
import { LoadPts } from '../patient-store/actions/pts.actions';
// import { getWardName } from 'src/app/store/reducers/auth.reducers';

@Component({
  selector: 'app-patients-list',
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.css']
})
export class PatientsListComponent implements OnInit {

  test: Observable<string>;
  wardName$: Observable<string>;
  selectedWardName: string;


  constructor(private store: Store<PtsState>) { }

  ngOnInit() {
    this.test = this.store.select(getPts);
    this.wardName$ = this.store.select(getWardName);

    this.wardName$.subscribe((ward) => {
      this.selectedWardName = ward;
    });

    this.store.dispatch(new LoadPts(this.selectedWardName));

  }
}
