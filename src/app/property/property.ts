import { User } from '../user/user';
export interface Property {
  id: number;
  propertyTitle: string;
  bedrooms: number;
  location: string;
  listPrice: number;
  priceType: 'Fixed' | 'Negotiable';
  postCreator: User;
  propertyImages: string[];
  bathrooms?: number;
  areaInM2?: number;
  levels?: string;
  amenities?: string[];
}

export interface PropertyOptions {
  search: string;
  filterBy: string[];
}
