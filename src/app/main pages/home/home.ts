import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from '../../services/service';
import { catchError, finalize, of, takeUntil, tap, Subject, map } from 'rxjs';
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
        map((data: unknown) => {
          const rooms = data as unknown as roomCard[];
          return rooms
            .sort((a, b) => b.bookedDates.length - a.bookedDates.length)
            .slice(0, 6);
        }),
        tap((sortedRooms) => {
          this.toDoData = sortedRooms;
        }),
        catchError(() => {
          this.hasError = true;
          return of('error');
        }),
        finalize(() => {
          console.log('final');
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  constructor(private router: Router) {
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
    'https://wander-lush.org/wp-content/uploads/2022/02/Emily-Lush-Radisson-Blu-Iveria-hotel-Tbilisi-room-wide.jpg',
    'https://images.trvl-media.com/lodging/3000000/2620000/2614700/2614694/58003977.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fill',
    'https://www.e-architect.com/wp-content/uploads/2010/02/radisson-sas-iveria-hotel-tbilisi-building-1.jpg',
    'https://s.inyourpocket.com/gallery/141981.jpg',
    'https://ik.imgkit.net/3vlqs5axxjf/external/https://media.iceportal.com/114261/photos/80041084_XL.jpg?tr=w-922%2Ch-519%2Cfo-auto',
    'https://gallery-0103.tbilisi-hotels.com/data/Imgs/700x500w/6316/631647/631647264/img-hotel-gallery-tbilisi-1.JPEG',
    'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/0a/a1/cb/the-biltmore-hotel-tbilisi.jpg?w=700&h=-1&s=1',
    'https://images.trvl-media.com/lodging/16000000/15840000/15835100/15835033/796add27.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fill',
    'https://the-biltmore.tbilisi-hotels.com/data/Pics/OriginalPhoto/17228/1722832/1722832594/the-biltmore-tbilisi-hotel-tbilisi-pic-59.JPEG',
    'https://thebiltmoretbilisi.ge-hotels.com/data/Imgs/OriginalPhoto/17228/1722831/1722831719/img-the-biltmore-tbilisi-hotel-tbilisi-33.JPEG',
    'https://the-biltmore.tbilisi-hotels.com/data/Pics/OriginalPhoto/17228/1722831/1722831626/the-biltmore-tbilisi-hotel-tbilisi-pic-78.JPEG',
    'https://images.trvl-media.com/lodging/16000000/15840000/15835100/15835033/w5472h3196x0y0-e00ae106.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fill',
    'https://sre.ge/storage/324/_MMS3600.webp',
    'https://wander-lush.org/wp-content/uploads/2022/02/Republic-Restaurant-terrace-Tbilisi-Radisson.jpg',
    'https://images.trvl-media.com/lodging/3000000/2620000/2614700/2614694/411ebc16.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fill',
    'https://media.radissonhotels.net/image/radisson-blu-iveria-hotel-tbilisi-city-centre/food-and-drink/16256-114261-f80052562_3XL.jpg?impolicy=Card',
    'https://foto.hrsstatic.com/fotos/0/2/800/458/80/000000/http%3A%2F%2Ffoto-origin.hrsstatic.com%2Ffoto%2Fdms%2F429648%2FICE%2F82250761_xl.jpg/e9e97e67bb257b460bb8ef73b8d9e1e9/511%2C341/6/Radisson_Blu_Iveria_Hotel_Tbilisi_City_Centre-Tbilisi-Hotel_bar-8-429648.jpg',
    'https://s.inyourpocket.com/gallery/65052.jpg',

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



  // Frequently asked question//////


  faqs = [
    {
      question: 'How do I book a room online?',
      answer: '',
      open: true
    },
    {
      question: 'Can I buy tickets with one ID?',
      answer: 'Yes, you can buy tickets for multiple passengers using one ID.',
      open: false
    },
    {
      question: 'What do I need to get on the train?',
      answer: 'You need a valid ticket and an identification document.',
      open: false
    },
    {
      question: 'How to return a purchased ticket?',
      answer: 'Tickets can be returned from your profile or at the ticket office.',
      open: false
    }
  ];
  toggle(index: number) {
    this.faqs[index].open = !this.faqs[index].open;
  }
}






