import { loadAllUsers } from './../../user-profile/state/user.actions';
import { IUserProfile } from './../../shared/interfaces/interfaces';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/shared/store/app.state';
import { setLoadingSpinner } from 'src/app/shared/store/state/actions/shared.action';
import { getAllUsers } from 'src/app/user-profile/state/user.selector';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit{
  users$!: Observable<IUserProfile[]>;
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(setLoadingSpinner({ status: true }))
    this.users$ = this.store.select(getAllUsers);

    this.store.dispatch(loadAllUsers());
  }

}
