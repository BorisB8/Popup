import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from "./material/material.module";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from 'angularfire2';  // import za firebase(database)
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { DatePipe } from '@angular/common';

import { AppComponent } from './app.component';
import { PersonsComponent } from './persons/persons.component';
import { PersonComponent } from './persons/person/person.component';
import { PersonService } from './shared/person.service';
import { environment } from '../environments/environment';
import { PersonListComponent } from './persons/person-list/person-list.component'; // import u koji smo kopirali database

@NgModule({
  declarations: [
    AppComponent,
    PersonsComponent,
    PersonComponent,
    PersonListComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebaseConfig), // inicijalizira bazu čije smo specifikacije unijeli u environment.ts
    FormsModule
  ],
  providers: [PersonService, DatePipe],
  bootstrap: [AppComponent],
  entryComponents: [PersonComponent]
})
export class AppModule { }
