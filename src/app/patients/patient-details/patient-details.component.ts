import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectPtsState, PtsState, getWardName, State, getPtsWard, getSelectedPt } from '../patient-store/pts.state';
import { Observable } from 'rxjs';
import { Patient } from 'src/app/models/patient';
import { Router, ActivatedRoute } from '@angular/router';


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
  selectedPatient: Patient;
  pageHeader = 'Select Option from menu on left';
  Menu: Item[] = [
    {
      label: 'Observations',
      route: 'obs',
      isActive: false
    },
    {
      label: 'Leave Register',
      route: 'leave',
      isActive: false
    },
    {
      label: 'Visitors',
      route: 'visitors',
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


  constructor(private store: Store<State>, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.selectedPt$ = this.store.select(getSelectedPt);
    this.selectedPt$.subscribe(pt => {
      this.selectedPatient = pt;
    });
  }

  menuClick(menuItem: Item) {
    this.Menu.forEach(i => i.isActive = false);
    console.log(menuItem.label);
    menuItem.isActive = true;
    // this.pageHeader = menuItem.label;
    this.router.navigate([menuItem.route], {relativeTo: this.route});
  }

  leaveStatus() {
    if (typeof this.selectedPatient === 'undefined' || this.selectedPatient === null ) {
      return false;
    }
    if (typeof this.selectedPatient.Leave === 'undefined' || this.selectedPatient.Leave === null) {
      return false;
    }
    if (typeof this.selectedPatient.Leave.IsCurrent === 'undefined' || this.selectedPatient.Leave.IsCurrent === null) {
      return false;
    }

    const x = this.selectedPatient.Leave.IsCurrent;
    return true;
  }

}
