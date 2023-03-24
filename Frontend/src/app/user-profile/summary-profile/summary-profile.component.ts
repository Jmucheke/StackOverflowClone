import { Shorten } from './../shorten.pipe';
import { Observable } from 'rxjs';
import { IUserProfile, Question } from './../../shared/interfaces/interfaces';
import { Store } from '@ngrx/store';
import { Component, OnInit, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppState } from 'src/app/shared/store/app.state';
import { getUser, loadQuestions } from '../state/user.actions';
import { getUserQuestions, loadUser } from '../state/user.selector';

@Component({
  selector: 'app-summary-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './summary-profile.component.html',
  styleUrls: ['./summary-profile.component.css']
})
export class SummaryProfileComponent implements OnInit{
  user$!: Observable<IUserProfile>
  questions$!: Observable<Question[]>;

  constructor(private store:Store<AppState>){}

  ngOnInit(): void {
    this.store.dispatch(getUser());
    this.user$ = this.store.select(loadUser);
    this.questions$ = this.store.select(getUserQuestions);
    this.store.dispatch(loadQuestions());
  }


}
