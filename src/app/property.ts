export interface Property {
    id: number;
    bedrooms: number;
    listPrice: number;
    priceType: 'Fixed' | 'Negotiable';
    postCreator: string;
  }
