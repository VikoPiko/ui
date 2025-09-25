export type CreateListingDto = {
  propertyId: string;
  title: string;
  description: string;
  roomType: RoomType;
  pricePerNight: number;
  bedrooms: number;
  bathrooms: number;
  guests: number;
  images: string[];
  amenities: string[];
  checkIn: Date;
  checkOut: Date;
  houseRules: string[];
  rating: number;
  reviewCount: number;
};

export enum RoomType {
  APARTMENT = "APARTMENT",
  HOUSE = "HOUSE",
  ENTIRE_PLACE = "ENTIRE_PLACE",
  SHARED_ROOM = "SHARED_ROOM",
  PRIVATE_ROOM = "PRIVATE_ROOM",
}
