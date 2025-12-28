export interface roomCard{
  id: number;
  name: string;
  pricePerNight: number;
  images: {
    id: number;
    source: string;
  }[];
}

export interface hotelCard{
  id:number;
  name:string;
  featuredImage:string;
}