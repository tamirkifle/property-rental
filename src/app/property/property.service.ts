import { Injectable } from '@angular/core';
import { Property, PropertyOptions } from './property';
// import { MOCKPROPERTIES } from './mock-properties';
import { BehaviorSubject, combineLatest, from, Observable, of, Subject } from 'rxjs';
import { catchError, map, take, tap, finalize, switchMap } from 'rxjs/operators';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FilterByPipe } from '../shared/filter-by.pipe';
import { PropertyFilterPipe } from '../shared/property-filter.pipe';
import { AuthService } from '../auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFirestore, CollectionReference, DocumentData, Query } from '@angular/fire/firestore';
import { UserService } from '../user/user.service';
import { StorageService } from '../storage.service';
import { AngularFireStorageReference } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class PropertyService {
  filterItems = {
    'city': ['Addis Ababa', 'Mekele', 'Arba Minch', 'Gondar', 'Bahir Dar'],
    'sub city': ['Kirkos', 'Bole', 'Lideta', 'Yeka'],
    'type': ['Apartment', 'Condominium', 'Full House', 'House Quarter'],
    'number of bedrooms': ['One Bedroom', 'Two Bedrooms', 'Three Bedrooms', '>3 Bedrooms'],
    'price range': ['<=2000', '2000-3000', '3000-5000', '>5000'],
  };
  allFilterOptions = [];
  private propertiesURL = 'api/properties';  // URL to property web api
  private usersURL = 'api/users';  // URL to users web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private fsdb: AngularFirestore,
    private userService: UserService,
    private fstorage: StorageService,
    private router: Router,
    private route: ActivatedRoute
  ) {

    for (const key in this.filterItems) {
      this.filterItems[key].forEach(option => this.allFilterOptions.push(option))
    }
  }

  getProperties(options?: PropertyOptions): Observable<Property[]> {
    if (options && (options.search || options.filterBy?.length > 0)) {
      let propertyRef: CollectionReference;
      this.fsdb.collection('properties', ref => propertyRef = ref);
      // console.dir(options)
      let query:any = propertyRef;
      if (options.search && !(options.filterBy?.length > 0)) {
        return this.fsdb.collection('properties').get().pipe(
          map(snapshot => snapshot.docChanges()),
          map(values => {
            return values.map(value => {
              const data: any = value.doc.data();
              return {
                ...data,
                id: value.doc.id as string,
    
              } as Property;
            });
          }),
          map(properties => {
            return properties.filter(prop => {
              return `${prop.bedrooms} bedroom ${prop.houseType} in ${prop.address.neighborhood}, ${prop.address.city}`
              .toLowerCase()
              .includes(options.search.toLowerCase()) || prop.propertyTitle?.toLowerCase().includes(options.search.toLowerCase());
            })
          }),
          catchError(this.handleError<Property[]>(`getProperties + search`)),
        );
      }
      if (options.filterBy?.length > 0) {
        // console.log(options.filterBy);
        const filterObj = {};
        for (const key in this.filterItems) {
          if (this.filterItems.hasOwnProperty(key)) {
            filterObj[key] = [];
            options.filterBy.forEach(opt => {
              if (this.filterItems[key].includes(opt)) {
                filterObj[key].push(opt);
              }
            });
          }
        }
        console.log(filterObj);


        for (const key in filterObj) {
          if (this.filterItems.hasOwnProperty(key)) {
            switch (key) {
              case 'city':
                filterObj[key].forEach(filterItm => {
                  query = query.where("address.city", "==", filterItm);
                });
                break;
              case 'sub city':
                filterObj[key].forEach(filterItm => {
                  query = query.where("address.subCity", "==", filterItm);
                });
                break;
              case 'type':
                filterObj[key].forEach(filterItm => {
                  query = query.where("houseType", "==", filterItm);
                });
                break;
              case 'number of bedrooms':
                filterObj[key].forEach((filterItm) => {
                  if (filterItm === 'One Bedroom') {
                    query = query.where("bedrooms", "==", 1);
                  }
                  if (filterItm === 'Two Bedrooms') {
                    query = query.where("bedrooms", "==", 2);
                  }
                  if (filterItm === 'Three Bedrooms') {
                    query = query.where("bedrooms", "==", 3);
                  }
                  if (filterItm === '>3 Bedrooms') {
                    query = query.where("fourPlus", "==", true);
                  }
                });
                break;
              case 'price range':
                filterObj[key].forEach((filterItm) => {
                    query = query.where("priceRange", "==", filterItm);
                  });
                break;

              default:
                break;
            }
          }
        }
        return this.fsdb.collection('properties', _ => query).get().pipe(
          map(snapshot => snapshot.docChanges()),
          map(values => {
            return values.map(value => {
              const data: any = value.doc.data();
              return {
                ...data,
                id: value.doc.id as string,

              } as Property;
            });
          }),
          catchError(this.handleError<Property[]>(`QUERIES FAILED`)),
          );

      }

      // let params = new HttpParams();
      // if (options.search) {
      //   params = params.append('s', options.search);
      // }
      // if (options.filterBy && options.filterBy.length !== 0) {
      //   options.filterBy.forEach(filter => params = params.append('by', filter));
      // }


      // const propRef = this.fsdb.collection('properties', ref => {
      //   if(filter)
      //   return ref;

      // });

      // return this.http.get<Property[]>(this.propertiesURL, { params });
    }
    // [{
    //   username: 'mahletg',
    //   contact: {email: 'mahletg@gmail.com', phone: null},
    //   // password: '1234',
    //   firstname: 'Mahlet',
    //   lastname: 'Getachew',
    //   avatar: 'assets/lady-avatars/lady-3.jpg',
    //   posts: [],
    //   rating: 3.2,
    // },
    // {
    //   username: 'mesimesi',
    //   contact: {email: 'mesimesi@gmail.com', phone: null},
    //   // password: '1234',
    //   firstname: 'Meseret',
    //   lastname: 'Leykun',
    //   avatar: 'assets/lady-avatars/lady-4.jpg',
    //   posts: [],
    //   rating: 3.6,
    // },
    // {
    //   username: 'allhouseset',
    //   contact: {email: 'allhouseset@gmail.com', phone: null},
    //   // password: '1234',
    //   firstname: 'AllHouse',
    //   lastname: 'Ethiopia',
    //   avatar: 'assets/guy-avatars/guy-2.jpg',
    //   posts: [],
    //   rating: 5,
    //   isAdmin: true,
    // },{
    //   username: 'edelala',
    //   contact: {email: 'edelala@gmail.com', phone: '0921232343'},
    //   // password: '1234',
    //   firstname: 'Ethio',
    //   lastname: 'Delala',
    //   displayname: 'EDDIE HOUSE',
    //   company: 'Eddie Corp',
    //   about: 'Hard working house broker in the Addis Ababa, Bole area',
    //   address: {city: 'Addis Ababa', subCity: 'Kirkos', neighborhood: 'Meskel Flower'},
    //   avatar: 'assets/guy-avatars/guy-4.jpg',
    //   posts: [],
    //   rating: 4.2,
    // }].forEach(prop => this.fsdb.collection("users").add(prop)
    //   .then(function (docRef) {
    //     console.log("Document written with ID: ", docRef.id);
    //   })
    //   .catch(function (error) {
    //     console.error("Error adding document: ", error);
    //   }));
    // this.fsdb.collection("users").doc("PhAKssNv53cItMFziSghnVh0DmF3").set({
    //       username: 'mesimesi',
    //       contact: {email: 'mesimesi@gmail.com', phone: null},
    //       // password: '1234',
    //       firstname: 'Meseret',
    //       lastname: 'Leykun',
    //       avatar: 'assets/lady-avatars/lady-4.jpg',
    //       posts: [],
    //       rating: 3.6,
    //     }
    //     ).then(function (docRef) {
    //     console.log("Document written with ID: ");
    //   }).catch(function (error) {
    //     console.error("Error adding document: ", error);
    //   });

    return this.fsdb.collection('properties').get().pipe(
      map(snapshot => snapshot.docChanges()),
      map(values => {
        return values.map(value => {
          const data: any = value.doc.data();
          return {
            ...data,
            id: value.doc.id as string,

          } as Property;
        });
      }),
      catchError(this.handleError<Property[]>(`getProperties`)),
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(operation, error); // log to console instead

      // TODO: LOG

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getProperty(id: string): Observable<Property> {
    return this.fsdb.collection('properties').doc(id).get().pipe(
      // tap(snapshot => console.log(snapshot.data())),
      map(snapshot => snapshot.data()),
      map(data => {
        return {
          ...data,
          id,


        } as Property;
      }));

    // const url = `${this.propertiesURL}/${id}`;
    // return this.http.get<Property>(url).pipe(
    //   catchError(this.handleError<Property>(`getProperty id=${id}`))
    // );
  }

  addProperty(sentCreatedProperty: Property, images?): Subject<any> {
    const done = new Subject();
    sentCreatedProperty.postCreator = this.authService.currentUser.id;
    sentCreatedProperty.propertyImages = [];

    sentCreatedProperty.bedrooms > 3 ? sentCreatedProperty.fourPlus = true : sentCreatedProperty.fourPlus = false;
    if (sentCreatedProperty.price.amount >= 5000){
      sentCreatedProperty.priceRange = '>5000';
    }
    else if (sentCreatedProperty.price.amount >= 3000){
      sentCreatedProperty.priceRange = '3000-5000';
    }
    else if (sentCreatedProperty.price.amount >= 2000){
      sentCreatedProperty.priceRange = '2000-3000';
    }
    else{
      sentCreatedProperty.priceRange = '<=2000';
    }

    if (images && images.length !== 0) {
      const createdProperty = Object.assign({}, sentCreatedProperty);// we copy it not to alter the sent object as it affects preview
      this.fstorage.uploadFiles(images, `propertyImages/${createdProperty.id}`).pipe(
        finalize(() => {
          console.log(this.fstorage.refs);
          combineLatest(this.fstorage.refs.map((ref: AngularFireStorageReference) => ref.getDownloadURL())).subscribe(links => {
            console.log('links ', links);
            createdProperty.propertyImages = links;
            console.log('createdPropertyWithImages ', createdProperty);
            from(this.fsdb.collection('properties').add(createdProperty)).subscribe(
              doc => {
                const id = doc.id;
                console.log('id', id);
                sentCreatedProperty.id = id; // so that the canDeactivate guard can pass.pipe(
                this.authService.currentUser.posts.push(id);
                this.userService.updateUser(this.authService.currentUser).subscribe(() => {
                  done.next(done);
                  // console.log('created property: ', this.currentProperty);
                });
              });
          });
        })).subscribe();
    }
    else {// no images
      from(this.fsdb.collection('properties').add(sentCreatedProperty)).subscribe(
        doc => {
          const id = doc.id;
          console.log('id', id);
          sentCreatedProperty.id = id; // so that the canDeactivate guard can pass.pipe(
          this.authService.currentUser.posts.push(id);
          this.userService.updateUser(this.authService.currentUser).subscribe(() => {
            done.next(done);
            // console.log('created property: ', this.currentProperty);
          });
        });
    }
    return done;

  }

  // return this.http
  //   .post(this.propertiesURL, createdProperty)

  updateProperty(editedProperty, images?, linksToRemove?: string[]) {
    const done = new Subject();

    editedProperty.bedrooms > 3 ? editedProperty.fourPlus = true : editedProperty.fourPlus = false;
    if (editedProperty.price.amount >= 5000){
      editedProperty.priceRange = '>5000';
    }
    else if (editedProperty.price.amount >= 3000){
      editedProperty.priceRange = '3000-5000';
    }
    else if (editedProperty.price.amount >= 2000){
      editedProperty.priceRange = '2000-3000';
    }
    else{
      editedProperty.priceRange = '<=2000';
    }

    if (images && images.length !== 0) {
      const editedPropertyCopy = Object.assign({}, editedProperty);
      editedPropertyCopy.propertyImages = [...editedProperty.propertyImages]; // not to alter the sent array as it affects preview
      this.fstorage.uploadFiles(images, `propertyImages/${editedPropertyCopy.id}`).pipe(
        finalize(() => {
          console.log(this.fstorage.refs);
          combineLatest(this.fstorage.refs.map((ref: AngularFireStorageReference) => ref.getDownloadURL())).subscribe(links => {
            console.log('links ', links);
            links.forEach(link => editedPropertyCopy.propertyImages.push(link));
            console.log('editedPropertyWithImages ', editedPropertyCopy);
            if (editedProperty.bedrooms > 3){
              editedProperty.fourPlus = true;
            }
            from(this.fsdb.collection('properties').doc(editedPropertyCopy.id).set(editedPropertyCopy)).subscribe(
              () => {
                linksToRemove.forEach(link => {
                  this.fstorage.refFromURL(link).delete().then(
                    // () => console.log('image deleted successfully')
                  ).catch(error => console.error(error));
                });
                done.next(done);
              }
            );
          });
        })
      ).subscribe();
    }
    else {//no new images
      from(this.fsdb.collection('properties').doc(editedProperty.id).set(editedProperty)).subscribe(
        () => {
          linksToRemove.forEach(link => {
            this.fstorage.refFromURL(link).delete().then(
              // () => console.log('image deleted successfully')
            ).catch(error => console.error(error));
          });
          done.next(done);
        }
      );
    }
    return done;
  }

  likeProperty(propertyId) {
    if (!this.authService.currentUser.favorites) {
      this.authService.currentUser.favorites = [];
    }
    this.authService.currentUser.favorites.push(propertyId);
    return this.userService.updateUser(this.authService.currentUser);
  }
  unlikeProperty(propertyId) {
    this.authService.currentUser.favorites = this.authService.currentUser.favorites.filter(id => id !== propertyId);
    return this.userService.updateUser(this.authService.currentUser);

  }

  deleteProperty(property: Property) {
    // const id = typeof property === 'string' ? property : property.id;
    // const url = `${this.propertiesURL}/${id}`;
    // return this.http.delete<Property>(url, this.httpOptions);
    return from(this.fsdb.collection("properties").doc(property.id).delete()).pipe(
      finalize( () => {
        property.propertyImages.forEach(link => {
          this.fstorage.refFromURL(link).delete().then(
            // () => console.log('image deleted successfully')
          ).catch(error => console.error(error));
        });
      })
    );
  }

  getRelatedProperties(id) {
    // NOT IMPLEMENTED: get all realted properties to property
    return this.getProperties()
      .pipe(
        map(properties => {
          return properties.splice(0, 8);
        }),
      );
  }
}
