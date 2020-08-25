export interface Property {
    id: number;
    propertyTitle: string;
    bedrooms: number;
    location: string;
    listPrice: number;
    priceType: 'Fixed' | 'Negotiable';
    postCreator: string;
    propertyImages: string[];
    bathrooms?: number;
    areaInM2?: number;
    levels?: string;
    amenities?: string[];
  }
