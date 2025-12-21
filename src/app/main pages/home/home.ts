import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from '../../services/service';
import { catchError, finalize, of, takeUntil, tap , Subject } from 'rxjs';
import { roomCard } from '../../models/model.interface';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit , OnDestroy {
  public cardId = inject(Service)
    public toDoData: roomCard[] | undefined;
    public hasError: boolean = false;
    public destroy$ = new Subject();
  



  ngOnInit() {
    this.cardId
    .roomsById()
    .pipe(
      takeUntil(this.destroy$),
      tap((data)=>{
        this.toDoData = data as unknown as roomCard[];
      } ),
      catchError(()=>{
        this.hasError = true;
        return of ('error');
      }),
      finalize(()=>{
        console.log('final')
      })
    )
    .subscribe();
    
  }

  ngOnDestroy(): void {
    this.destroy$.next;
    this.destroy$.complete();
  }















  constructor(private router: Router) { }

  goToHotels() {
    this.router.navigate(['/hotels']);
  }


}




