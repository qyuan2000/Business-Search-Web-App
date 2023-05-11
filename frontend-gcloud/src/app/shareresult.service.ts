import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareresultService {

  constructor() { }

  private subject = new Subject<any>();
  private subject_two = new Subject<any>();
  private subject_three = new Subject<any>();

  sendResult(data: any){
    this.subject.next(data);
  }

  getResult(): Observable<any>{
    return this.subject.asObservable();
  }

  sendDetailId(data:any){
    this.subject_two.next(data);
  }

  getDetailId(): Observable<any>{
    return this.subject_two.asObservable();
  }

  sendReservation(data:any){
    this.subject_three.next(data);
  }

  getReservation(): Observable<any>{
    return this.subject_three.asObservable();
  }
}
