import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getTest, selectPtsState, PtsState, getWardName, State, getPtsWard, getSelectedPt } from '../patient-store/pts.state';
import { Observable } from 'rxjs';
import { Patient } from 'src/app/models/patient';


@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css']
})
export class PatientDetailsComponent implements OnInit {
  selectedPt$: Observable<Patient>;


  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.selectedPt$ = this.store.select(getSelectedPt);
  }

}
