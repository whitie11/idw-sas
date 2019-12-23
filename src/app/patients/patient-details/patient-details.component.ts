import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getTest, selectPtsState, PtsState, getWardName, State, getPtsWard, getSelectedPt } from '../patient-store/pts.state';
import { Observable } from 'rxjs';
import { Patient } from 'src/app/models/patient';


export interface Item {
  label: string;
  route: string;
  isActive: boolean;

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
      route: './obs',
      isActive: false
    },
    {
      label: 'Leave Register',
      route: './pt-leave',
      isActive: false
    },
    {
      label: 'Visitors',
      route: 'pt-visitors',
      isActive: false
    },
    {
      label: 'Patient Property',
      route: 'property',
      isActive: false
    },
    {
      label: 'Restricted Items',
      route: 'restricted-items',
      isActive: false
    },
    {
      label: 'Ward List',
      route: '/patients',
      isActive: false
    }
  ];


  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.selectedPt$ = this.store.select(getSelectedPt);
  }

  menuClick(menuItem: Item) {
    this.Menu.forEach(i => i.isActive = false);
    console.log(menuItem.label);
    menuItem.isActive = true;
  }

}
