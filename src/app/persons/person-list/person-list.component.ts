import { Component, OnInit, ViewChild } from '@angular/core';
import { PersonService } from 'src/app/shared/person.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { PersonComponent } from '../person/person.component';
import { NotificationService } from '../../shared/notification.service';


@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit {

  constructor(private service: PersonService,
    private dialog: MatDialog,
    private notificationService: NotificationService) { }

  listData: MatTableDataSource<any>;  // tablica
  displayedColumns: string[] = ['fullName', 'mobile', 'email', 'actions'];  // stupci u tablici
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  searchKey: string;

  ngOnInit() {
    this.service.getPersons().subscribe(
    list => {
      let array = list.map(item => {
        return {
          $key: item.key,
          ...item.payload.val()
        };
      });
      this.listData = new MatTableDataSource(array);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
      this.listData.filterPredicate = (data, filter) => {   // ograničava pretragu samo na displayedColumns>> 'fullName', 'mobile', 'email'
        return this.displayedColumns.some(ele => {
          return ele != 'actions' && data[ele].toLowerCase().indexOf(filter) != -1;
        }
        )};
    });
  }

  onSearchClear() {  // nakon što se klikne button X u pretraži obriše sav unos.. tj empty string
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {   // pretražuje pomoću searchKey
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  onCreate(){ // otvara dijalog na click
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;  // da se ne moće ugasiti sa klikom van dialoga ili na EXS button
    dialogConfig.autoFocus = true;  // autofokus samo na dijalog
    dialogConfig.width = "60%";  // širina dijaloga
    this.dialog.open(PersonComponent,dialogConfig);  // PersonComponent moramo dodati u app.module.ts, ovaj dijalog otvara komponentu person
  }

  onEdit(row){
    this.service.populateForm(row);  // zove funkciju iz servisa sa več unesenim i spremljenim detaljima
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true; // da se ne moće ugasiti sa klikom van dialoga ili na EXS button
    dialogConfig.autoFocus = true; // autofokus samo na dijalog
    dialogConfig.width = "60%"; // širina dijaloga
    this.dialog.open(PersonComponent,dialogConfig);
  }

  onDelete($key){  // Briše unos funkcija
    if(confirm('Jeste li sigurni da ćelite obristi unos?')){  // pita prije za potvrdu
    this.service.deletePerson($key); // preko $key obriše osobu i sav unos
    this.notificationService.warn('Uspješno obrisan unos!');
    }
  }
}
