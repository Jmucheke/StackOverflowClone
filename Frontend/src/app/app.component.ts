import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './shared/store/app.state';
import { getErrorMessage, getLoading } from './shared/store/state/selector/shared.selector';
import { autoLogin } from './auth/state/actions/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Stackoverflow-clone';
  errorMessage?:Observable<string>;
  showLoading?: Observable<boolean>

  constructor(private store: Store<AppState>) { }


  ngOnInit(): void {
    this.showLoading = this.store.select(getLoading)
    this.errorMessage = this.store.select(getErrorMessage)
    this.store.dispatch(autoLogin())
  }
}
