import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from '../../services/service';
import { catchError, finalize, of, takeUntil, tap, Subject } from 'rxjs';
import { roomCard } from '../../models/model.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  standalone: true,
  styleUrl: './home.scss',
})
export class Home implements OnInit, OnDestroy {
  public cardId = inject(Service);
  public toDoData: roomCard[] | undefined;
  public hasError: boolean = false;
  public destroy$ = new Subject();




  ngOnInit() {
    this.cardId
      .roomsAll()
      .pipe(
        takeUntil(this.destroy$),
        tap((data) => {
          this.toDoData = data as unknown as roomCard[];
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

  constructor(private router: Router) {
    // this.visiblePhotos = this.photos.slice(0, 5); 
  }

  goToHotels() {
    this.router.navigate(['/hotels']);
  }





  photos: string[] = [
    'https://media.radissonhotels.net/image/radisson-blu-iveria-hotel-tbilisi-city-centre/guest-room/16256-114261-f80151512_3XL.jpg?impolicy=Card&width=2880&height=1920',
    'https://images.trvl-media.com/lodging/3000000/2620000/2614700/2614694/11531aad.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fill',
    'https://s.inyourpocket.com/gallery/141981.jpg',
        'https://www.thebiltmorehotels.com/mhb-media/biltmore/biltmore-tbilisi/property-landing-page/heritage-meets-modernity.auto?rev=55a3e9a500514c0f81f5cddebe7a6c6c&hash=0DA3A912D41BB7CC7132ABAE38E31D35',
    'https://media.radissonhotels.net/image/radisson-blu-iveria-hotel-tbilisi-city-centre/meeting-room/16256-114261-f80050515_3XL.jpg?impolicy=Card',
    'https://www.e-architect.com/wp-content/uploads/2010/02/radisson-sas-iveria-hotel-tbilisi-building-1.jpg',
    'https://pix10.agoda.net/hotelImages/9456938/0/dfd8f18572d8c85b1451f426c6a07bd7.jpeg?ce=0&s=414x232',
    'https://wander-lush.org/wp-content/uploads/2022/02/Emily-Lush-Radisson-Blu-Iveria-hotel-Tbilisi-room-wide.jpg',
    'https://images.trvl-media.com/lodging/3000000/2620000/2614700/2614694/58003977.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fill',
    'https://media-cdn.tripadvisor.com/media/photo-s/09/fd/68/18/radisson-blu-iveria-hotel.jpg',
    'https://media.radissonhotels.net/image/radisson-blu-iveria-hotel-tbilisi-city-centre/meeting-room/16256-114261-f80050515_3XL.jpg?impolicy=Card',
    'https://www.e-architect.com/wp-content/uploads/2010/02/radisson-sas-iveria-hotel-tbilisi-building-1.jpg',
    'https://s.inyourpocket.com/gallery/141981.jpg',
    'https://lh3.googleusercontent.com/proxy/men7U7KA3AkegVP-HN9NeYsLZrwbm8aQLoQIHlaZp8cOJ0IhmGBB84etPcQH6SmtJSfmiOzq5U3C3IiNW1n73mLD2iNSeRjX6dRtlTJQWussYs-HjpQ7BB3W9hrRyOEzio9_4u3MPF4TSZOiFMYpeg',
    'https://ik.imgkit.net/3vlqs5axxjf/external/https://media.iceportal.com/114261/photos/80041084_XL.jpg?tr=w-922%2Ch-519%2Cfo-auto',
    'https://pix10.agoda.net/hotelImages/9456938/0/b22b753195fd57d5ffa548556dcac534.jpg?ca=9&ce=1&s=414x232',
    'https://gallery-0103.tbilisi-hotels.com/data/Imgs/700x500w/6316/631647/631647264/img-hotel-gallery-tbilisi-1.JPEG',
    'https://q-xx.bstatic.com/xdata/images/hotel/max500/103298623.jpg?k=a3f430613762b4a3cbce415facb748461cde1e93827b647eb70c7d7249c89a80&o=',
    'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/0a/a1/cb/the-biltmore-hotel-tbilisi.jpg?w=700&h=-1&s=1',
    'https://www.shutterstock.com/image-photo/tbilisi-georgia-22-january-2023-260nw-2286922187.jpg',
    'https://images.trvl-media.com/lodging/16000000/15840000/15835100/15835033/796add27.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fill',
    'https://the-biltmore.tbilisi-hotels.com/data/Pics/OriginalPhoto/17228/1722832/1722832594/the-biltmore-tbilisi-hotel-tbilisi-pic-59.JPEG',
    'https://thebiltmoretbilisi.ge-hotels.com/data/Imgs/OriginalPhoto/17228/1722831/1722831719/img-the-biltmore-tbilisi-hotel-tbilisi-33.JPEG',
    'https://the-biltmore.tbilisi-hotels.com/data/Pics/OriginalPhoto/17228/1722831/1722831626/the-biltmore-tbilisi-hotel-tbilisi-pic-78.JPEG',
    'https://images.trvl-media.com/lodging/16000000/15840000/15835100/15835033/w5472h3196x0y0-e00ae106.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fill',
    'https://www.reinisfischer.com/sites/default/files/inline-images/IMG_5043.jpg',
  ];

  visibleCount = signal(5);
  lightboxOpen = signal(false);
  currentIndex = signal(0);

  get visiblePhotos() {
    return this.photos.slice(0, this.visibleCount());
  }

  openViewMoreLightbox() {
    this.currentIndex.set(0)
    this.lightboxOpen.set(true);  
  }

  openLightbox(index: number) {
    this.currentIndex.set(index);
    this.lightboxOpen.set(true);
  }

  closeLightbox() {
    this.lightboxOpen.set(false);
  }

  prev(event: Event) {
    event.stopPropagation();
    const newIndex = (this.currentIndex() - 1 + this.photos.length) % this.photos.length;
    this.currentIndex.set(newIndex);
  }

  next(event: Event) {
    event.stopPropagation();
    const newIndex = (this.currentIndex() + 1) % this.photos.length;
    this.currentIndex.set(newIndex);
  }
}






