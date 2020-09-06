import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Property } from './property/property';
import { User } from './user/user';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const properties: Property[] = [
      {
        id: 11,
        propertyTitle: '',
        bedrooms: 3,
        location: 'Bole, Addis Ababa',
        listPrice: 2000,
        priceType: 'Fixed',
        postCreator: 'edelala',
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
        postCreator: 'mahletg',
        propertyImages: ['2.jpg', '3.jpg', '4.jpg', '1.jpg'],
        amenities: [],
      },
      {
        id: 13,
        propertyTitle: 'Quick Rental Needed Great Price',
        bedrooms: 3,
        location: 'Yerer, Addis Ababa',
        listPrice: 19000,
        priceType: 'Negotiable',
        postCreator: 'mesimesi',
        propertyImages: ['3.jpg', '4.jpg', '1.jpg', '2.jpg'],
        amenities: ['Backyard', 'Nice View'],
      },
      {
        id: 14,
        propertyTitle: '',
        bedrooms: 3,
        location: 'Addis Ketema, Addis Ababa',
        listPrice: 49000,
        priceType: 'Negotiable',
        postCreator: 'edelala',
        propertyImages: ['4.jpg', '1.jpg', '2.jpg', '3.jpg'],
        amenities: ['Backyard', 'Nice View'],
      },
      {
        id: 15,
        propertyTitle: '',
        bedrooms: 3,
        location: 'Merkato, Addis Ababa',
        listPrice: 12000,
        priceType: 'Fixed',
        postCreator: 'edelala',
        propertyImages: ['1.jpg', '2.jpg', '3.jpg', '4.jpg'],
        amenities: ['Backyard', 'Nice View'],
      },
      {
        id: 16,
        propertyTitle: '',
        bedrooms: 3,
        location: 'Meskel Flower, Addis Ababa',
        listPrice: 25000,
        priceType: 'Negotiable',
        postCreator: 'edelala',
        propertyImages: ['2.jpg', '3.jpg', '4.jpg', '1.jpg'],
        amenities: ['Backyard', 'Nice View'],
      },
      {
        id: 17,
        propertyTitle: '',
        bedrooms: 3,
        location: 'Gotera, Addis Ababa',
        listPrice: 29000,
        priceType: 'Fixed',
        postCreator: 'allhouseset',
        propertyImages: ['3.jpg', '4.jpg', '1.jpg', '2.jpg'],
        amenities: ['Backyard', 'Nice View'],
      },
    ];
    const users: User[] = [
      {
        id: 11,
        username: 'edelala',
        firstname: 'Ethio',
        lastname: 'Delala',
        avatar: '../../assets/guy-avatars/guy-4.jpg',
        posts: properties.reduce((a: number, p) => a + (p.postCreator === 'edelala' ? 1 : 0), 0),
        rating: 4.2,
      },
      {
        id: 12,
        username: 'mahletg',
        firstname: 'Mahlet',
        lastname: 'Getachew',
        avatar: '../../assets/lady-avatars/lady-3.jpg',
        posts: properties.reduce((a: number, p) => a + (p.postCreator === 'mahletg' ? 1 : 0), 0),
        rating: 2.7,
      },
      {
        id: 13,
        username: 'mesimesi',
        firstname: 'Meseret',
        lastname: 'Leykun',
        avatar: '../../assets/lady-avatars/lady-4.jpg',
        posts: properties.reduce((a: number, p) => a + (p.postCreator === 'mesimesi' ? 1 : 0), 0),
        rating: 4.9,
      },
      {
        id: 14,
        username: 'allhouseset',
        firstname: 'AllHouse',
        lastname: 'Ethiopia',
        avatar: '../../assets/guy-avatars/guy-2.jpg',
        posts: properties.reduce((a: number, p) => a + (p.postCreator === 'allhouseset' ? 1 : 0), 0),
        rating: 5,
      },
    ];
    return { users, properties };
  }


  // Overrides the genId method to ensure that a property always has an id.
  // If the properties array is empty,
  // the method below returns the initial number (11).
  // if the properties array is not empty, the method below returns the highest
  // property id + 1.
  genId(properties: Property[]): number {
    return properties.length > 0
      ? Math.max(...properties.map((property) => property.id)) + 1
      : 11;
  }
}
