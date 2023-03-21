
import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { NavbarComponent } from "./shared/navbar/navbar.component";
import { HttpClientModule } from '@angular/common/http';
// import { TinymceModule } from '@tinymce/tinymce-angular';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { FormsModule } from '@angular/forms';
import { AuthService } from './shared/services/auth/auth.service';
// import { GuardService } from './shared/services/guards/guard.service';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { appReducer } from './shared/store/app.state';
import { authReducer } from './auth/state/reducers/auth.reducer';
import { AUTH_STATE_NAME } from './auth/state/selectors/auth.selectors';
import { AuthEffects } from './auth/state/effects/auth.effects';
import { sharedReducer } from './shared/store/state/reducers/shared.reducer';

@NgModule({
    declarations: [
        AppComponent
    ],
  providers: [{ provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' }, AuthService],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        FormsModule,
      StoreModule.forRoot({
        auth: authReducer, shared:sharedReducer}),
        NavbarComponent,
        LoadingSpinnerComponent,
      EffectsModule.forRoot([AuthEffects]),
      StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    ]
})
export class AppModule { }
