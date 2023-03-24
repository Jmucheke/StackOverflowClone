import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { AppState } from 'src/app/shared/store/app.state';
import { addQuestion } from '../state/questions/questions.actions';

@Component({
  selector: 'app-ask-question',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ask-question.component.html',
  styleUrls: ['./ask-question.component.css']
})
export class AskQuestionComponent implements OnInit{
  form!: FormGroup;
  constructor(private fb: FormBuilder, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      code: ['', Validators.required],
      tagName: ['', Validators.required]
    });
  }


  postQuestion() {
    if (!this.form.valid) {
      return;
    }

    this.store.dispatch(addQuestion({ question: this.form.value }));
    this.form.reset();


  }

}
