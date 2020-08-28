import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Property } from './property';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const properties = [
      {
        id: 11,
        propertyTitle: '',
        bedrooms: 3,
        location: 'Bole, Addis Ababa',
        listPrice: 2000,
        priceType: 'Fixed',
        postCreator: 'Ethio Delala',
        propertyImages: ['1.jpg', '2.jpg', '3.jpg', '4.jpg'],
        amenities: ['Fixed Kitchen Cabinet', 'Balcony'],
        bathrooms: 2,
        levels: 'Ground',
        areaInM2: 400,
      },
      {
        id: 12,
        propertyTitle: '',
        bedrooms: 8,
        location: 'Hayahulet, Addis Ababa',
        listPrice: 10000,
        priceType: 'Negotiable',
        postCreator: 'Mihret Alemu',
        propertyImages: ['1.jpg', '2.jpg', '3.jpg', '4.jpg'],
        amenities: [],
      },
      {
        id: 13,
        propertyTitle: 'Quick Rental Needed Great Price',
        bedrooms: 3,
        location: 'Yerer, Addis Ababa',
        listPrice: 19000,
        priceType: 'Negotiable',
        postCreator: 'Yared Ketema',
        propertyImages: [`${Math.floor(Math.random()*4)+1}.jpg`,`${Math.floor(Math.random()*4)+1}.jpg`,`${Math.floor(Math.random()*4)+1}.jpg`,`${Math.floor(Math.random()*4)+1}.jpg`],
        amenities: ['Backyard', 'Nice View'],
      },
      {
        id: 14,
        propertyTitle: '',
        bedrooms: 3,
        location: 'Addis Ketema, Addis Ababa',
        listPrice: 49000,
        priceType: 'Negotiable',
        postCreator: 'Ethio Delala',
        propertyImages: [`${Math.floor(Math.random()*4)+1}.jpg`,`${Math.floor(Math.random()*4)+1}.jpg`,`${Math.floor(Math.random()*4)+1}.jpg`,`${Math.floor(Math.random()*4)+1}.jpg`],
        amenities: ['Backyard', 'Nice View'],
      },
      {
        id: 15,
        propertyTitle: '',
        bedrooms: 3,
        location: 'Merkato, Addis Ababa',
        listPrice: 12000,
        priceType: 'Fixed',
        postCreator: 'Ethio Delala',
        propertyImages: [`${Math.floor(Math.random()*4)+1}.jpg`],
        amenities: ['Backyard', 'Nice View'],
      },
      {
        id: 16,
        propertyTitle: '',
        bedrooms: 3,
        location: 'Meskel Flower, Addis Ababa',
        listPrice: 25000,
        priceType: 'Negotiable',
        postCreator: 'Ethio Delala',
        propertyImages: [`${Math.floor(Math.random()*4)+1}.jpg`],
        amenities: ['Backyard', 'Nice View'],
      },
      {
        id: 17,
        propertyTitle: '',
        bedrooms: 3,
        location: 'Gotera, Addis Ababa',
        listPrice: 29000,
        priceType: 'Fixed',
        postCreator: 'Henok T.',
        propertyImages: [`${Math.floor(Math.random()*4)+1}.jpg`],
        amenities: ['Backyard', 'Nice View'],
      },
    ];
    return {properties};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(properties: Property[]): number {
    return properties.length > 0 ? Math.max(...properties.map(property => property.id)) + 1 : 11;
  }
}