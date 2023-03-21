import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../shared/footer/footer.component';
import { RouterModule } from '@angular/router';
// import { selectLoggedIn } from '../state/selectors/loginState';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [CommonModule, FooterComponent, RouterModule],
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent {
  // loggedIn$ = this.store.select(selectLoggedIn);

  // constructor(private store: Store<AppState>) { }

}
