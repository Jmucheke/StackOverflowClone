import { getQuestionDetails } from './../state/questions/questions.selector';
import { Observable } from 'rxjs';
import { Question } from './../../shared/interfaces/interfaces';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as tinymce from 'tinymce';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Params, RouterModule } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/shared/store/app.state';

@Component({
  selector: 'app-one-question',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './one-question.component.html',
  styleUrls: ['./one-question.component.css']
})
export class OneQuestionComponent implements OnInit{
  id!:string;
  question$!:Observable<Question>;

  constructor(private route:ActivatedRoute, private store:Store<AppState>){}

  ngOnInit(): void {

      this.route.params.subscribe((param:Params)=>{
        this.id=param['id']
        this.question$=this.store.pipe(select(getQuestionDetails(this.id)))

      })
  }




}
