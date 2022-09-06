import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class helperService {
  constructor(public snackBar: MatSnackBar) {}

  private openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 4000,
    });
  }

  public dispalyError(error: any) {
    if (typeof error == 'string') {
      this.openSnackBar(error, 'dismiss');
    }

    if (error.errorLevel == 'validation') {
      error.error.forEach((element: { value: string }) => {
        console.log(element);
        this.openSnackBar(element.value, 'dismiss');
      });
    }
  }
}
