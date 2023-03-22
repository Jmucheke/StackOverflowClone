import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IUserProfile } from '../interfaces/interfaces';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import { isAuthenticated } from 'src/app/auth/state/selectors/auth.selectors';
import { logout } from 'src/app/auth/state/actions/auth.actions';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user?: IUserProfile;
  isOpen = false
  loggedIn = false;
  constructor(private store: Store<AppState>) { }
  isAuthenticated?: Observable<boolean>;



  toggleOpen(): void {
    this.isOpen = !this.isOpen;
  }




  ngOnInit(): void {
    this.isAuthenticated = this.store.select(isAuthenticated);
  }

  onLogout(event: Event) {
    event.preventDefault()
    this.store.dispatch(logout())

  }

}
