export interface Property {
    id: number;
    propertyTitle: string;
    bedrooms: number;
    location: string;
    listPrice: number;
    priceType: 'Fixed' | 'Negotiable';
    postCreator: string;
    propertyImages: string[];
  }
