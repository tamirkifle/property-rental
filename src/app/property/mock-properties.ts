import { Property } from './property';

export const MOCKPROPERTIES: Property[] = [
    {
    id: 1,
    propertyTitle: '',
    bedrooms: 3,
    location: 'Bole, Addis Ababa',
    listPrice: 2000,
    priceType: 'Fixed',
    postCreator: 'Ethio Delala',
    propertyImages: ['1.jpg'],
    amenities: ['Fixed Kitchen Cabinet', 'Balcony'],
    bathrooms: 2,
    levels: 'Ground',
    areaInM2: 400,
  },
  {
    id: 2,
    propertyTitle: '',
    bedrooms: 8,
    location: 'Bole, Addis Ababa',
    listPrice: 50000,
    priceType: 'Negotiable',
    postCreator: 'Ethio Delala',
    propertyImages: ['1.jpg'],
    amenities: [],
  },
  {
    id: 3,
    propertyTitle: 'Quick Rental Needed Great Price',
    bedrooms: 3,
    location: 'Bole, Addis Ababa',
    listPrice: 9000,
    priceType: 'Negotiable',
    postCreator: 'Ethio Delala',
    propertyImages: ['1.jpg'],
    amenities: ['Backyard', 'Nice View'],
  }];
