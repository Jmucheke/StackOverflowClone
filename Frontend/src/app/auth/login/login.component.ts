import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { login } from 'src/app/state/actions/auth.actions';
import { AppState } from 'src/app/state/app.state';
import { Login } from 'src/app/shared/interface/interfaces';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  form!: FormGroup;

  constructor(private fb: FormBuilder, private store: Store<AppState>, private router: Router ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login() {
      const email= this.form.get('email')!.value
      const password =  this.form.get('password')!.value

    this.store.dispatch(login({email,password}));
    // console.log(user);

    // this.router.navigate(['questions'])
    this.router.navigate(['/']);
  }

}
