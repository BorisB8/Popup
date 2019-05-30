import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';  // angular material snackbar - za notifikacije

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(public snackBar: MatSnackBar) { }      // Constructor - Creates a new FormGroup instance. = from service

  config: MatSnackBarConfig = {   // definiramo properties za objekt notifikacija
    duration: 3000,   // u milisekundama
    horizontalPosition: 'right',
    verticalPosition: 'top'
  }

  success(msg) {
    this.config['panelClass'] = ['notification', 'success'];  // definiramo stilove u styles.cc
    this.snackBar.open(msg, '', this.config);  // daje poruku(msg) / action >> prazan('') nije nam potrban ali moće se dodati u notification poruku kao button npr
  }                                               // dodajemo treći parametar this.config >> definiran prije

  warn(msg) {
    this.config['panelClass'] = ['notification', 'warn'];
    this.snackBar.open(msg, '', this.config);
  }
}
