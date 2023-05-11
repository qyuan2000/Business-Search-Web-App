import { Injectable} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {BehaviorSubject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ResetformService {

  constructor() { }
  isVisibleSource: BehaviorSubject<boolean> = new BehaviorSubject(true);
  showTableSource: BehaviorSubject<boolean> = new BehaviorSubject(false);
}
