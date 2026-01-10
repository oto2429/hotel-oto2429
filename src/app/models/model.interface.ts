export interface roomCard {
  id: number;
  name: string;
  pricePerNight: number;
  bookedDates: {
    id: number;
    date: string;
    roomId: number;
  }[];
  images: {
    id: number;
    source: string;
    roomId: number;
  }[];
}

export interface hotelCard {
  id: number;
  name: string;
  featuredImage: string;
}