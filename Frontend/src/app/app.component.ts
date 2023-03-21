
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './shared/store/app.state';
import { getLoading } from './shared/store/state/selector/shared.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Stackoverflow-clone';

  constructor(private store: Store<AppState>) { }

  showLoading?: Observable<boolean>

  ngOnInit(): void {
    this.showLoading = this.store.select(getLoading)
  }
}
