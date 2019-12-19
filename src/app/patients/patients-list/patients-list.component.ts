import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getTest, selectPtsState, PtsState, getWardName, State} from '../patient-store/pts.state';
import { Observable } from 'rxjs';
import { LoadPts } from '../patient-store/actions/pts.actions';
// import { getTest } from '../patient-store/reducers/pts.reducer';
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


  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.test = this.store.select(getTest);
    this.wardName$ = this.store.select(getWardName);
    console.log('Ward name = ' + this.wardName$);
    this.wardName$.subscribe((ward) => {
      this.selectedWardName = ward;
    });

    this.store.dispatch(new LoadPts(this.selectedWardName));

  }
}
