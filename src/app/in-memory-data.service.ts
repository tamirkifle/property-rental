import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Property } from './property/property';
import { User } from './user/user';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {

    const users: User[] = [
      {
        id: 11,
        username: 'edelala',
        contact: {email: 'edelala@gmail.com', phone: '0921232343'},
        // password: '1234',
        firstname: 'Ethio',
        lastname: 'Delala',
        displayname: 'EDDIE HOUSE',
        company: 'Eddie Corp',
        about: 'Hard working house broker in the Addis Ababa, Bole area',
        address: {city: 'Addis Ababa', sub_city: 'Kirkos', area: 'Meskel Flower'},
        avatar: 'assets/guy-avatars/guy-4.jpg',
        posts: [11, 14, 15, 16],
        rating: 4.2,
      },
      {
        id: 12,
        username: 'mahletg',
        contact: {email: 'mahletg@gmail.com', phone: null},
        // password: '1234',
        firstname: 'Mahlet',
        lastname: 'Getachew',
        avatar: 'assets/lady-avatars/lady-3.jpg',
        posts: [12],
        rating: 3.2,
      },
      {
        id: 13,
        username: 'mesimesi',
        contact: {email: 'mesimesi@gmail.com', phone: null},
        // password: '1234',
        firstname: 'Meseret',
        lastname: 'Leykun',
        avatar: 'assets/lady-avatars/lady-4.jpg',
        posts: [13],
        rating: 3.6,
      },
      {
        id: 14,
        username: 'allhouseset',
        contact: {email: 'allhouseset@gmail.com', phone: null},
        // password: '1234',
        firstname: 'AllHouse',
        lastname: 'Ethiopia',
        avatar: 'assets/guy-avatars/guy-2.jpg',
        posts: [17],
        rating: 5,
        isAdmin: true,
      },
    ];
    const properties: Property[] = [
      {
        id: 11,
        propertyTitle: '',
        bedrooms: 3,
        address: {city: 'Addis Ababa', subCity: 'Bole', area: 'Bole'},
        price: {amount: 2000, type: 'Negotiable'},
        postCreator: 'edelala',
        propertyImages: ['assets/1.jpg', 'assets/2.jpg', 'assets/3.jpg'],
        amenities: ['Fixed Kitchen Cabinet', 'Balcony'],
        bathrooms: 2,
        levels: 1,
        areaInM2: 400,
      },
      {
        id: 12,
        propertyTitle: '',
        bedrooms: 8,
        address: {city: 'Addis Ababa', subCity: 'Bole', area: 'Hayahulet'},
        price: {amount: 10000, type: 'Negotiable'},
        postCreator: 'mahletg',
        propertyImages: ['assets/2.jpg', 'assets/4.jpg', 'assets/1.jpg'],
        amenities: [],
      },
      {
        id: 13,
        propertyTitle: 'Quick Rental Needed Great Price',
        bedrooms: 3,
        address: {city: 'Addis Ababa', area: 'Yerer'},
        price: {amount: 19000, type: 'Negotiable'},
        postCreator: 'mesimesi',
        propertyImages: ['assets/3.jpg', 'assets/4.jpg', 'assets/1.jpg'],
        amenities: ['Backyard', 'Nice View'],
      },
      {
        id: 14,
        propertyTitle: '',
        bedrooms: 3,
        address: {city: 'Addis Ababa', area: 'Addis Ketema'},
        price: {amount: 49000, type: 'Negotiable'},
        postCreator: 'edelala',
        propertyImages: ['assets/4.jpg', 'assets/2.jpg', 'assets/3.jpg'],
        amenities: ['Backyard', 'Nice View'],
      },
      {
        id: 15,
        propertyTitle: '',
        bedrooms: 3,
        address: {city: 'Addis Ababa', area: 'Merkato'},
        price: {amount: 1000, type: 'Fixed'},
        postCreator: 'edelala',
        propertyImages: ['assets/1.jpg', 'assets/2.jpg', 'assets/3.jpg', 'assets/4.jpg'],
        amenities: ['Backyard', 'Nice View'],
      },
      {
        id: 16,
        propertyTitle: '',
        bedrooms: 3,
        address: {city: 'Addis Ababa', subCity: 'Kirkos', area: 'Meskel Flower'},
        price: {amount: 25000, type: 'Fixed'},
        postCreator: 'edelala',
        propertyImages: ['assets/2.jpg', 'assets/3.jpg', 'assets/4.jpg', 'assets/1.jpg'],
        amenities: ['Backyard', 'Nice View'],
      },
      {
        id: 17,
        propertyTitle: '',
        bedrooms: 3,
        address: {city: 'Addis Ababa', subCity: 'Kirkos', area: 'Gotera'},
        price: {amount: 29000, type: 'Fixed'},
        postCreator: 'allhouseset',
        propertyImages: ['assets/3.jpg', 'assets/4.jpg', 'assets/1.jpg', 'assets/2.jpg'],
        amenities: ['Backyard', 'Nice View'],
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
