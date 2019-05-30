import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database'; // importam kreiranu bazu u servis
import * as _ from 'lodash';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private firebase: AngularFireDatabase, private datePipe: DatePipe) { }  // Creates a new FormGroup instance from database

  personList: AngularFireList<any>; // property personList > angularfirelist

  form: FormGroup = new FormGroup({  // class FormGroup-Tracks the value and validity state of a group of FormControl instances.
    $key: new FormControl(null),
    fullName: new FormControl('', Validators.required),
    mobile: new FormControl('', [Validators.required, Validators.minLength(8)]),
    email: new FormControl('', Validators.email),
    gender: new FormControl('1'),
    eyeColour: new FormControl(0),
    birthDate: new FormControl(''),
    isAlive: new FormControl(false)
  });

   initializeFormGroup() {  // metoda koja vraća varijable na početno stanje prazne (deafault-no) - poziva se na onClear() definiran u person.component.ts
    this.form.setValue({
      $key: null,
      fullName: '', 
      mobile: '', 
      email: '', 
      gender: '1',
      eyeColour: 0,
      birthDate: '',
      isAlive: false
    });
  }

  getPersons() {   // Iz liste databaze vrijednosti !! MORA SE DEFINIRATI KAO PRVA FUNKCIJA!! da bi smo mogli pozivati ostale
    this.personList = this.firebase.list('persons');
    return this.personList.snapshotChanges();  // oservable koji promatra promjene >> fire lista
  }

  insertPerson(person) {  // insert funkcija koja koristi jedan parametar person - koji sadrži detalje o osobi >> dodaje osobu u bazu
    this.personList.push({  // puša osobu sa navedenim detaljima u kreiranu bazu
      fullName: person.fullName,
      mobile: person.mobile, 
      email: person.email, 
      gender: person.gender,
      eyeColour: person.eyeColour,
      birthDate: person.birthDate == "" ? "" : this.datePipe.transform(person.birthDate, 'yyyy-MM-dd'), // pipe da spremi unos datuma rođenja
      isAlive: person.isAlive
    });
  }

  updatePerson(person) { // update-a osobu preko parametra $key koji se generira automatski i po tome prepoznaje ostale unose vezane za $key parametar
    this.personList.update(person.$key,
      { 
        fullName: person.fullName,
        mobile: person.mobile, 
        email: person.email, 
        gender: person.gender,
        eyeColour: person.eyeColour,
        birthDate: person.birthDate == "" ? "" : this.datePipe.transform(person.birthDate, 'yyyy-MM-dd'),
        isAlive: person.isAlive
      });
  }

  deletePerson($key: string) {  // metoda remove() koja briše osobu iz baze prepoznavajući $key
    this.personList.remove($key);
  }

  populateForm(person) { // poziva se na Uredi dijalog te povlači postojeće vrijednosti
    this.form.setValue(_.omit(person,'birthDate'));
  }
}
