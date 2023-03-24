import { deleteQuestion, loadQuestions } from './../state/questions/questions.actions';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Question } from 'src/app/shared/interfaces/interfaces';
import { AppState } from 'src/app/shared/store/app.state';
import { getQuestions } from '../state/questions/questions.selector';
import { setLoadingSpinner } from 'src/app/shared/store/state/actions/shared.action';

@Component({
  selector: 'app-display-questions',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './display-questions.component.html',
  styleUrls: ['./display-questions.component.css']
})
export class DisplayQuestionsComponent implements OnInit {
  questions$!: Observable<Question[]>;
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(setLoadingSpinner({ status: true }))
    this.questions$ = this.store.select(getQuestions);

    this.store.dispatch(loadQuestions());
  }

  onDeletePost(id: string) {
    if (confirm('Are you sure you want to delete')) {
      this.store.dispatch(deleteQuestion({ id }));
    }
  }

}
