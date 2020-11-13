import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable, combineLatest } from 'rxjs';
import { finalize, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  refs = [];
  constructor(private storage: AngularFireStorage ) { }

  uploadFiles(files: File[], basepath): Observable<any> {
    this.refs = [];
    const changeSnapshots = files.map((file: File) => {
      const filePath =  `${basepath}/${Date.now()}_${file.name}`;
      console.log(filePath);
      const ref = this.storage.ref(filePath);
      this.refs.push(ref);
      return this.storage.upload(filePath, file).snapshotChanges();
    });
    
    return combineLatest(changeSnapshots);

  }
}
