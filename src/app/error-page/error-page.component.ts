import { Component, OnInit } from '@angular/core';
import { Store} from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import { AppState , getErrorMessage} from '../store/app.state';
import { SetErrorMessage, ClearErrorMessage } from '../store/actions/auth.actions';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {

  constructor(private store: Store<AppState>, private router: Router, private route: ActivatedRoute) { }

  errorMessage$: Observable<string>;

  ngOnInit() {
    this.errorMessage$ = this.store.select(getErrorMessage);
  }


  onClick() {
    this.store.dispatch(new ClearErrorMessage());
    this.router.navigateByUrl('/home');
  }

}
