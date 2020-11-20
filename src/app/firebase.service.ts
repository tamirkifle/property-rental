import { Injectable } from '@angular/core';
import { combineLatest, from, Observable, of, Subject } from 'rxjs';
import { User } from './user/user';
import { Property, PropertyOptions } from './property/property';
import { catchError, finalize, map, switchMap, tap } from 'rxjs/operators';
import { AngularFirestore, CollectionReference } from '@angular/fire/firestore';
import { AngularFireStorageReference } from '@angular/fire/storage';
import { StorageService } from './storage.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  currentUser$: Observable<any>;

  constructor(
    private fsdb: AngularFirestore,
    private fstorage: StorageService,
    private fAuth: AngularFireAuth,
  ) {
    this.currentUser$ = this.fAuth.authState.pipe(
      switchMap((user) => {
        if (user){
          return this.getUser(user.uid);
        }
        else{
          return of(null);
        }
      }),
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


  getProperties(options?: PropertyOptions, filterItems?) {
    if (filterItems && options && (options.search || options.filterBy?.length > 0)) {
      let propertyRef: CollectionReference;
      this.fsdb.collection('properties', ref => propertyRef = ref);
      // console.dir(options)
      let query: any = propertyRef;
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
            });
          }),
          catchError(this.handleError<Property[]>(`getProperties + search`)),
        );
      }
      if (options.filterBy?.length > 0) {
        // console.log(options.filterBy);
        const filterObj = {};
        for (const key in filterItems) {
          if (filterItems.hasOwnProperty(key)) {
            filterObj[key] = [];
            options.filterBy.forEach(opt => {
              if (filterItems[key].includes(opt)) {
                filterObj[key].push(opt);
              }
            });
          }
        }
        // console.log(filterObj);


        for (const key in filterObj) {
          if (filterItems.hasOwnProperty(key)) {
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
    }

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

  getProperty(id): Observable<Property> {
    return this.fsdb.collection('properties').doc(id).get().pipe(
      // tap(snapshot => console.log(snapshot.data())),
      map(snapshot => snapshot.data()),
      map(data => {
        return {
          ...data,
          id,
        } as Property;
      }));
  }

  addProperty(sentCreatedProperty: Property, currentUser: User, images?): Subject<any> {
    const done = new Subject();
    sentCreatedProperty.postCreator = currentUser.id;
    sentCreatedProperty.propertyImages = [];

    sentCreatedProperty.bedrooms > 3 ? sentCreatedProperty.fourPlus = true : sentCreatedProperty.fourPlus = false;
    if (sentCreatedProperty.price.amount >= 5000) {
      sentCreatedProperty.priceRange = '>5000';
    }
    else if (sentCreatedProperty.price.amount >= 3000) {
      sentCreatedProperty.priceRange = '3000-5000';
    }
    else if (sentCreatedProperty.price.amount >= 2000) {
      sentCreatedProperty.priceRange = '2000-3000';
    }
    else {
      sentCreatedProperty.priceRange = '<=2000';
    }

    if (images && images.length !== 0) {
      const createdProperty = Object.assign({}, sentCreatedProperty);// we copy it not to alter the sent object as it affects preview
      this.fstorage.uploadFiles(images, `propertyImages/${createdProperty.id}`).pipe(
        finalize(() => {
          combineLatest(this.fstorage.refs.map((ref: AngularFireStorageReference) => ref.getDownloadURL())).subscribe(links => {
            createdProperty.propertyImages = links;
            from(this.fsdb.collection('properties').add(createdProperty)).subscribe(
              doc => {
                const id = doc.id;
                sentCreatedProperty.id = id; // so that the canDeactivate guard can pass.pipe(
                currentUser.posts.push(id);
                this.updateUser(currentUser).subscribe(() => {
                  done.next(done);
                });
              });
          });
        })).subscribe();
    }
    else {// no images
      from(this.fsdb.collection('properties').add(sentCreatedProperty)).subscribe(
        doc => {
          const id = doc.id;
          sentCreatedProperty.id = id; // so that the canDeactivate guard can pass.pipe(
          currentUser.posts.push(id);
          this.updateUser(currentUser).subscribe(() => {
            done.next(done);
          });
        });
    }
    return done;

  }

  updateProperty(editedProperty, images?, linksToRemove?: string[]) {
    const done = new Subject();

    editedProperty.bedrooms > 3 ? editedProperty.fourPlus = true : editedProperty.fourPlus = false;
    if (editedProperty.price.amount >= 5000) {
      editedProperty.priceRange = '>5000';
    }
    else if (editedProperty.price.amount >= 3000) {
      editedProperty.priceRange = '3000-5000';
    }
    else if (editedProperty.price.amount >= 2000) {
      editedProperty.priceRange = '2000-3000';
    }
    else {
      editedProperty.priceRange = '<=2000';
    }

    if (images && images.length !== 0) {
      const editedPropertyCopy = Object.assign({}, editedProperty);
      editedPropertyCopy.propertyImages = [...editedProperty.propertyImages]; // not to alter the sent array as it affects preview
      this.fstorage.uploadFiles(images, `propertyImages/${editedPropertyCopy.id}`).pipe(
        finalize(() => {
          combineLatest(this.fstorage.refs.map((ref: AngularFireStorageReference) => ref.getDownloadURL())).subscribe(links => {
            links.forEach(link => editedPropertyCopy.propertyImages.push(link));
            if (editedProperty.bedrooms > 3) {
              editedProperty.fourPlus = true;
            }
            from(this.fsdb.collection('properties').doc(editedPropertyCopy.id).set(editedPropertyCopy)).subscribe(
              () => {
                linksToRemove.forEach(link => {
                  this.fstorage.refFromURL(link).delete().then(
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
            ).catch(error => console.error(error));
          });
          done.next(done);
        }
      );
    }
    return done;
  }

  getPostsForUser(userid: string): Observable<Property[]> {
    return this.fsdb.collection('properties', ref => ref.where("postCreator", "==", userid)).get().pipe(
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

  deleteProperty(property: Property): Observable<void> {

    return from(this.fsdb.collection("properties").doc(property.id).delete()).pipe(
      finalize(() => {
        property.propertyImages.forEach(link => {
          this.fstorage.refFromURL(link).delete().then(
            // () => console.log('image deleted successfully')
          ).catch(error => console.error(error));
        });
      })
    );
  }

  // USERS
  getUsers(): Observable<User[]> {

    return this.fsdb.collection('users').get().pipe(
      map(snapshot => snapshot.docChanges()),
      map(values => {
        return values.map(value => {
          const data: any = value.doc.data();
          return {
            id: value.doc.id as string,
            ...data,


          } as User;
        });
      }),
      catchError(this.handleError<User[]>(`getUsers`)),
    );
  }

  getUser(id: string): Observable<User> {
    return this.fsdb.collection('users').doc(id).get().pipe(
      map(snapshot => snapshot.data()),
      map(data => {
        return {
          id,
          ...data,

        } as User;
      })
    );
  }

  updateUser(user, avatarFile?) {
    return from(this.fsdb.collection('users').doc(user.id).set(user));
  }

  // AUTHENTICATION
  createUser(createdUser, password): Observable<User | void> {
    return from(this.fAuth.createUserWithEmailAndPassword(createdUser.contact.email, password)).pipe(
      switchMap(user => {
        if (user) {
          createdUser.id = user.user.uid;
          return this.updateUser(createdUser).pipe(
            switchMap(() => this.getUser(createdUser.id))
          );
        }
        else {
          of(null);
        }
      }),
    );
  }

  login({ email, password }): Observable<User | void> {
    return from(this.fAuth.signInWithEmailAndPassword(email, password)).pipe(
      switchMap(cred => {
        if (cred) {
          return this.getUser(cred.user.uid);
        }
        else {
          return of(null);
        }
      })
    );
  }

  logout(): Observable<void> {
    return from(this.fAuth.signOut());
  }


}
