import { AuthEffects } from './state/effects/auth.effects';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './state/reducers';
import { NavbarComponent } from "./shared/navbar/navbar.component";
import { HttpClientModule } from '@angular/common/http';
// import { TinymceModule } from '@tinymce/tinymce-angular';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { FormsModule } from '@angular/forms';
import { AuthService } from './shared/services/auth/auth.service';
import { GuardService } from './shared/services/guards/guard.service';
import { EffectsModule } from '@ngrx/effects';
import { authReducer } from './state/reducers/auth.reducer';

@NgModule({
    declarations: [
        AppComponent
    ],
  providers: [{ provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' }, AuthService, GuardService],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        FormsModule,
        StoreModule.forRoot({auth: authReducer} ),
        NavbarComponent,
      EffectsModule.forRoot([AuthEffects]),
    ]
})
export class AppModule { }
