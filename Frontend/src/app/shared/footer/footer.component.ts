import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import { isAuthenticated } from 'src/app/auth/state/selectors/auth.selectors';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit{
  isAuthenticated?:Observable<boolean>
  constructor(private store:Store<AppState>){}

  ngOnInit(): void {
    this.isAuthenticated = this.store.select(isAuthenticated);
  }





}
