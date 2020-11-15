export interface Property {
  id: string;
  propertyTitle: string;
  bedrooms: number;
  address: {city: string, subCity?: string, neighborhood: string, coordinates?: string};
  price: {amount: number, type: 'Fixed' | 'Negotiable'};
  notes?: string;
  postCreator: string;
  propertyImages: string[];
  bathrooms?: number;
  areaInM2?: number;
  levels?: number;
  amenities?: string[];
  houseType?: 'Apartment' | 'Condominium' | 'House Quarter' | 'Full House';
  fourPlus?: boolean;// for filtering
  priceRange?: '<=2000' | '2000-3000' | '3000-5000' | '>5000';
}

// export interface Property {
//   id: number;
//   propertyTitle: string;
//   bedrooms: number;
//   location: string;
//   listPrice: number;
//   priceType: 'Fixed' | 'Negotiable';
//   postCreator: string;
//   propertyImages: string[];
//   bathrooms?: number;
//   areaInM2?: number;
//   levels?: string;
//   amenities?: string[];
// }

export interface PropertyOptions {
  search: string;
  filterBy: string[];
}
