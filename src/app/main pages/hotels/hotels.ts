import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Service } from '../../services/service';
import { hotelCard, } from '../../models/model.interface';
import { catchError, finalize, of, Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-hotels',
  imports: [],
  templateUrl: './hotels.html',
  styleUrl: './hotels.scss',
})
export class Hotels implements OnInit, OnDestroy {
  public hotelALL = inject(Service);
  public hoteldata: hotelCard[] | undefined;
  public hasError: boolean = false;
  public destroy$ = new Subject();


  ngOnInit() {
    this.hotelALL
      .hotelsAll()
      .pipe(
        takeUntil(this.destroy$),
        tap((data) => {
          this.hoteldata = data as unknown as hotelCard[];
        }),
        catchError(() => {
          this.hasError = true;
          return of('error');
        }),
        finalize(() => {
          console.log('final')
        })
      )
      .subscribe();

  }

  ngOnDestroy(): void {
    this.destroy$.next;
    this.destroy$.complete();
  }


}
