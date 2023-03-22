import { AppState } from 'src/app/shared/store/app.state';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { signup } from '../state/actions/auth.actions';
import { setLoadingSpinner } from 'src/app/shared/store/state/actions/shared.action';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  form!: FormGroup;
  constructor(private fb: FormBuilder, private router: Router, private store:Store<AppState>){}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }


  register(){
    if(!this.form.valid){
      return;
    }

    const name= this.form.get('name')!.value
    const email = this.form.get('email')!.value
    const password = this.form.get('password')!.value

    this.store.dispatch(setLoadingSpinner({ status: true }))
    this.store.dispatch(signup({name,email,password}))


  }


}
