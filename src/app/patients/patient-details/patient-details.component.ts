import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getTest, selectPtsState, PtsState, getWardName, State, getPtsWard, getSelectedPt } from '../patient-store/pts.state';
import { Observable } from 'rxjs';
import { Patient } from 'src/app/models/patient';


export interface Item {
  label: string;
  route: string;
}




@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css']
})
export class PatientDetailsComponent implements OnInit {
  selectedPt$: Observable<Patient>;

    Menu: Item[] = [
  {
    label: 'Observations',
    route: './obs'
  },
  {
    label: 'Leave Register',
    route: './pt-leave'
  },
  {
    label: 'Visitors',
    route: 'pt-visitors'
  },
   {
    label: 'Patient Property',
    route: 'property'
  },
  {
    label: 'Restricted Items',
    route: 'restricted-items'
  },
  {
    label: 'Ward List',
    route: '/patients'
  }
];


  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.selectedPt$ = this.store.select(getSelectedPt);
  }

  menuClick(menuItem: Item) {
console.log(menuItem.label);
  }
}
