import { getUser } from './../../user-profile/state/user.actions';
import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IUserProfile } from '../interfaces/interfaces';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import { isAuthenticated } from 'src/app/auth/state/selectors/auth.selectors';
import { logout } from 'src/app/auth/state/actions/auth.actions';
import { loadUser } from 'src/app/user-profile/state/user.selector';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user$!: Observable<IUserProfile>;
  user!:IUserProfile
  isOpen = false
  constructor(private store: Store<AppState>) { }
  isAuthenticated?: Observable<boolean>;



  toggleOpen(): void {
    this.isOpen = !this.isOpen;
  }




  ngOnInit(): void {
    this.isAuthenticated = this.store.select(isAuthenticated);

    if(this.isAuthenticated){

      this.store.dispatch(getUser());
      this.user$=this.store.select(loadUser);
      console.log(this.user$);
      
      // this.store.select(loadUser).subscribe((user)=>{
      //   this.user = user
      // })

      // console.log("Users include", this.user$);

      

      

      // this.store.select(loadUser).subscribe(userProfile=>{
      //   // console.log("my user include",userProfile);
        
      //   // const user=userProfile
        
        
        
      // })
      

      
    }
  }

  onLogout(event: Event) {
    event.preventDefault()
    this.store.dispatch(logout())

  }

}
