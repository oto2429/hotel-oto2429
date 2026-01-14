import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { hotelCard, roomCard, RoomFilter } from '../models/model.interface';

@Injectable({
  providedIn: 'root',
})
export class Service {
  public getAvailableRooms(fromDate: string, toDate: string): Observable<roomCard[]> {
    const filter: RoomFilter = {
      roomTypeId: 0,
      priceFrom: 0,
      priceTo: 10000,
      maximumGuests: 0,
      checkIn: fromDate,
      checkOut: toDate
    };
    return this.getFilteredRooms(filter);
  }
  public http = inject(HttpClient)

  public roomsAll(): Observable<roomCard[]> {
    return this.http.get<roomCard[]>(
      "https://hotelbooking.stepprojects.ge/api/Rooms/GetAll"
    )
  }

  public roomsById(id: number): Observable<roomCard> {
    return this.http.get<roomCard>(
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



    public getFilteredRooms(filter: RoomFilter): Observable<roomCard[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<roomCard[]>(
      "https://hotelbooking.stepprojects.ge/api/Rooms/GetFiltered",
      filter,
      { headers }
    )
  }


}
