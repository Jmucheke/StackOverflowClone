import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { login } from '../state/actions/auth.actions';
import { setLoadingSpinner } from 'src/app/shared/store/state/actions/shared.action';
import { AppState } from 'src/app/shared/store/app.state';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  constructor(private fb: FormBuilder, private store: Store<AppState>, private router: Router) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login() {
    const email = this.form.get('email')!.value
    const password = this.form.get('password')!.value

    this.store.dispatch(setLoadingSpinner({ status: true }))
    this.store.dispatch(login({ email, password }));
    this.router.navigate(['/'])
    // if(localStorage.getItem('token')!==null){
      
    // }
    // console.log(user);

    // this.router.navigate(['questions'])
    // this.router.navigate(['/']);
  }

}
