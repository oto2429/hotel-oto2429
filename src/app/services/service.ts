import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rooms } from '../main pages/rooms/rooms';
import { Hotels } from '../main pages/hotels/hotels';
import { hotelCard } from '../models/model.interface';

@Injectable({
  providedIn: 'root',
})
export class Service {
  public http = inject(HttpClient)

  public roomsAll(): Observable<Rooms[]> {
    return this.http.get<Rooms[]>(
      "https://hotelbooking.stepprojects.ge/api/Rooms/GetAll"
    )
  }

  public roomsById(id: number): Observable<Rooms> {
    return this.http.get<Rooms>(
      `https://hotelbooking.stepprojects.ge/api/Rooms/GetRoom/${id}`
    )
  }


  public hotelsAll(): Observable<hotelCard[]> {
    return this.http.get<hotelCard[]>(
      `https://hotelbooking.stepprojects.ge/api/Hotels/GetAll`
    )
  }


  public getCities(): Observable<string[]> {
    return this.http.get<string[]>(
      'https://hotelbooking.stepprojects.ge/api/Hotels/GetCities'
    );
  }



}
