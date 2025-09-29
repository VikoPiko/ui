export type CreatePropertyDto = {
  title: string;
  description: string;
  location: string;
  lat: string;
  lng: string;
  images: string[];
  hostId: string;
  firstName: string;
  lastName: string;
  email: string;
};

export type PropertyDto = {
  title: string;
  description: string;
  location: string;
  lat: string;
  lng: string;
  images: string[];
  hostId: string;
};
