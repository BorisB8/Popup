import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

import { PersonService } from '../../shared/person.service'; // import stvoreni servis za upravljanje FormGroup osoba
import { NotificationService } from '../../shared/notification.service';  // import stvoreni servis za notifikacije


@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {

  constructor(private service: PersonService,  // Constructor - Creates a new FormGroup instance. = from service
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<PersonComponent>) { }

   

  eyeColours = [                            // parametri za dropdown meni
    { id: 3, value:'Plava' },
    { id: 2, value:'Zelena' },
    { id: 3, value:'Smeđa' }];

  ngOnInit() {
    this.service.getPersons(); // onInit poziva se frva funkcija iz servisa!!
  }

  onClear() {                             // Metoda onClear - poziva se na Obriši button
    this.service.form.reset();            // resetira - već definiran  u ts-u
    this.service.initializeFormGroup();   // iz servisa -> vraća na početne postavke

  }

  onSubmit() {                        // dodaje osobu u bazu ukoliko(IF) su validatori iz formgroup propertija ispunjeni (this.service.form.valid)
    if (this.service.form.valid) {
      if (!this.service.form.get('$key').value)
        this.service.insertPerson(this.service.form.value);  // ukoliko su uvjeti ispunjeni poziva funkciju insertPerson() iz servisa >> imamo value property iz form grup objekta (this.service.form.value)
      else
      this.service.updatePerson(this.service.form.value);
      this.service.form.reset();               // nakon čega vraća na početne postavke
      this.service.initializeFormGroup();   // iz servisa event -> vraća na početne postavke
      this.notificationService.success('Uspješan unos!!');
      this.onClose();    // vuče funkciju onClose()
    }
  }

  onClose() {
    this.service.form.reset(); // on close resetira 
    this.service.initializeFormGroup(); // vraća na početne postavke
    this.dialogRef.close();  // i zatvara
  }
}
