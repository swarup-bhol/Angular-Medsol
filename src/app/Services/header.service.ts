import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  constructor() { }
  header = new BehaviorSubject<boolean>(true);
  loader = new BehaviorSubject<boolean>(false);
}
