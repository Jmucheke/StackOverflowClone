import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { UserService } from '../services/user.service';
import { IUserProfile } from '../interface/interfaces';
import {isLoggedIn, selectUser } from 'src/app/state/selectors/auth.selectors';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  user?: IUserProfile;
  isOpen = false
  isLoggedIn$!: Observable<boolean>;
  user$!: Observable<string | null>;
  loggedIn = false;



  toggleOpen(): void {
    this.isOpen = !this.isOpen;
  }

  isAuthenticated$?: Observable<boolean>;

  constructor(public authService: AuthService, private store: Store<AppState>){

  }
  ngOnInit(): void {
    // this.isAuthenticated$ = this.store.select(selectIsAuthenticated);
    // if (this.authService.isLoggedIn) {
    //   this.userService.getUserProfile().subscribe((userProfile) => {
    //     this.user = userProfile;
    //   });
    // }

    this.isLoggedIn$ = this.store.select(isLoggedIn);
    // this.user$ = this.store.select(selectUser);

    this.isLoggedIn$.subscribe((isLoggedIn) => {
      this.loggedIn = isLoggedIn;
    });
  }

}
