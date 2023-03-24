import { UserEffects } from './user-profile/state/user.effects';
import { UserReducer } from './user-profile/state/user.reducers';
import { QuestionsEffects } from './questions/state/questions/questions.effects';
import { QuestionsReducer } from './questions/state/questions/questions.reducer';

import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { NavbarComponent } from "./shared/navbar/navbar.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { FormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { authReducer } from './auth/state/reducers/auth.reducer';
import { AuthEffects } from './auth/state/effects/auth.effects';
import { sharedReducer } from './shared/store/state/reducers/shared.reducer';
import { FooterComponent } from './shared/footer/footer.component';
import { AuthService } from './auth/service/auth.service';
import { QuestionsService } from './questions/service/questions.service';
import { TokenInterceptorService } from './shared/services/tokenInterceptor.service';
import { AuthGuard } from './shared/services/guards/guard.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true }, AuthService, QuestionsService, AuthGuard],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    StoreModule.forRoot({
      auth: authReducer, shared: sharedReducer, question:QuestionsReducer, user:UserReducer
    }),
    NavbarComponent,
    FooterComponent,
    LoadingSpinnerComponent,
    EffectsModule.forRoot([AuthEffects, QuestionsEffects, UserEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ]
})
export class AppModule { }
