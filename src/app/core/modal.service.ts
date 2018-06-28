import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  constructor(public dialog: MatDialog) {}

  public openModal<T>(component: ComponentType<T>): Observable<any> {
    const dialogRef = this.dialog.open(component, { width: '250px' });

    return dialogRef.afterClosed();
  }
}
