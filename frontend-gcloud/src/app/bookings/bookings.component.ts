import { Component, OnInit } from '@angular/core';
import { data } from 'jquery';
import {Reservation, ReservationList} from '../reservation'
import { ShareresultService } from '../shareresult.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {

  isVisible = false;
  reservelist: Reservation[] = [];
  noResult = false;
  stJson: ReservationList;

  constructor(
    private shareService: ShareresultService
  ) { 
  }

  ngOnInit(): void {
    this.showTable();
  }

  showTable(){
    var storage = localStorage.getItem("reservationList");
    if(storage!=null) {
      this.stJson = JSON.parse(storage);
      console.log(this.stJson);
      if(this.stJson.list != null && this.stJson.list.length!=0) {
        this.reservelist = this.stJson.list;
        this.isVisible = true;
      }
      else{
        this.isVisible = false;
        this.noResult = true;
      }
    }
    else{
      this.noResult = true;
    }
  }

  deleteRow(index:number){
    this.reservelist.splice(index,1);
    if(this.reservelist.length==0){
      this.isVisible = false;
      this.noResult = true;
    }
    this.stJson.list = this.reservelist;
    localStorage.setItem("reservationList", JSON.stringify(this.stJson));
    alert("reservation cancelled!");
  }

}
